import { useRouter } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, database } from '../../firebase';

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const enteredValue = identifier.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredValue);

    if (
      !name.trim() ||
      !username.trim() ||
      !enteredValue ||
      !dob.trim() ||
      !gender ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('ChatVibez', 'Please fill all fields.');
      return;
    }

    if (!isEmail) {
      Alert.alert(
        'Phone OTP Setup Required',
        'Mobile number registration will be available after Firebase Phone Authentication setup. Please use your email for now.'
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert('ChatVibez', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('ChatVibez', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const normalizedEmail = enteredValue.toLowerCase();

      const result = await createUserWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );

      await updateProfile(result.user, {
        displayName: name.trim(),
      });

      await set(ref(database, 'users/' + result.user.uid), {
        uid: result.user.uid,
        name: name.trim(),
        username: username.trim(),
        email: normalizedEmail,
        phone: '',
        dob: dob.trim(),
        gender: gender,
        createdAt: Date.now(),
        profilePhoto: '',
        coverPhoto: '',
        bio: '',
      });

      await sendEmailVerification(result.user);

      Alert.alert(
        'Registration Successful',
        'Your account has been created. Please verify your email, then login.',
        [
          {
            text: 'Continue to Login',
            onPress: () => router.replace('/(auth)'),
          },
        ]
      );
    } catch (error: any) {
      let message = 'Registration failed. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already registered.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Please choose a stronger password.';
      } else if (error.code === 'auth/network-request-failed') {
        message = 'Please check your internet connection.';
      } else if (error.code === 'PERMISSION_DENIED') {
        message = 'Database permission denied. Please check Firebase Rules.';
      }

      Alert.alert('Registration Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.glow} />

        <Text style={styles.brand}>ChatVibez</Text>
        <Text style={styles.tagline}>Create Your Account</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Join ChatVibez</Text>
          <Text style={styles.subtitle}>
            Create your account to get started
          </Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#88839D"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Choose a username"
            placeholderTextColor="#88839D"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Email or Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email or mobile number"
            placeholderTextColor="#88839D"
            value={identifier}
            onChangeText={setIdentifier}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#88839D"
            value={dob}
            onChangeText={setDob}
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            {['Male', 'Female', 'Other'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.genderButton,
                  gender === item && styles.genderSelected,
                ]}
                onPress={() => setGender(item)}
              >
                <Text style={styles.genderText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create password"
            placeholderTextColor="#88839D"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#88839D"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.registerButton, loading && { opacity: 0.6 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.registerText}>
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.normalText}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => router.replace('/(auth)')}
            >
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#100A25',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 22,
    paddingVertical: 35,
  },
  glow: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    width: 250,
    height: 250,
    borderRadius: 150,
    backgroundColor: '#252078',
    opacity: 0.35,
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  tagline: {
    color: '#00D9FF',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
    fontSize: 15,
  },
  card: {
    backgroundColor: '#1C1535',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#513A83',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#B8B1CE',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 8,
  },
  input: {
    height: 52,
    backgroundColor: '#100A25',
    borderWidth: 1,
    borderColor: '#49376F',
    borderRadius: 12,
    paddingHorizontal: 14,
    color: '#FFFFFF',
    fontSize: 15,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    padding: 13,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#49376F',
    backgroundColor: '#100A25',
  },
  genderSelected: {
    backgroundColor: '#7136E8',
    borderColor: '#00D9FF',
  },
  genderText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  registerButton: {
    height: 54,
    backgroundColor: '#7136E8',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    borderWidth: 1,
    borderColor: '#00D9FF',
  },
  registerText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    flexWrap: 'wrap',
  },
  normalText: {
    color: '#B8B1CE',
    fontSize: 13,
  },
  loginLink: {
    color: '#00D9FF',
    fontWeight: '800',
    fontSize: 13,
  },
});