import { useRouter } from 'expo-router';
import {
  reload,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../firebase';
export default function HomeScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('ChatVibez', 'Please enter email and password.');
      return;
    }

    try {
      

      const result = await signInWithEmailAndPassword(
  auth,
  email.trim(),
  password
);

await reload(result.user);

if (!result.user.emailVerified) {
  await signOut(auth);
  Alert.alert(
    'Email Not Verified',
    'Please verify your email using the link sent to your inbox, then login again.'
  );
  return;
}

Alert.alert(
  'ChatVibez',
  'Login successful!',
  [
    {
      text: 'Continue',
      onPress: () => router.replace('/profile'),
    },
  ]
);
    } catch (error: any) {
      console.log('LOGIN ERROR:', error.code, error.message);
      let message = 'Login failed. Please try again.';

      if (error.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        message = 'Incorrect email or password.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many attempts. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        message = 'Please check your internet connection.';
      }

      Alert.alert('Login Error', message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert(
        'Forgot Password',
        'Please enter your email address first.'
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());

      Alert.alert(
        'ChatVibez',
        'Password reset link sent to your email.'
      );
    } catch (error: any) {
      Alert.alert(
        'Error',
        'Could not send reset email. Please check your email address.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.glow} />

          <View style={styles.logo}>
            <Text style={styles.logoText}>CV</Text>
          </View>

          <Text style={styles.brand}>ChatVibez</Text>
          <Text style={styles.tagline}>
            Connect • Chat • Enjoy
          </Text>

          <View style={styles.card}>
            <Text style={styles.heading}>Welcome Back!</Text>
            <Text style={styles.subheading}>
              Login to your ChatVibez account
            </Text>

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#88839D"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordBox}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#88839D"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.showText}>
                  {showPassword ? 'HIDE' : 'SHOW'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.forgot}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.or}>OR</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() =>
                Alert.alert('Google Login', 'Google authentication will be connected next.')
              }
            >
              <Text style={styles.socialText}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            <View style={styles.signupRow}>
              <Text style={styles.normalText}>
                Don't have an account? 
              </Text>
              <TouchableOpacity
              onPress={() => router.push('/(auth)/register')}  
              >
                <Text style={styles.signupText}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.footer}>
            © 2026 ChatVibez. All rights reserved.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#100A25',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 35,
  },
  glow: {
    position: 'absolute',
    top: 30,
    width: 250,
    height: 250,
    borderRadius: 150,
    backgroundColor: '#252078',
    opacity: 0.35,
  },
  logo: {
    width: 82,
    height: 82,
    borderRadius: 25,
    backgroundColor: '#702DDB',
    borderWidth: 2,
    borderColor: '#00D9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 1,
  },
  tagline: {
    color: '#00D9FF',
    fontSize: 14,
    marginTop: 7,
    marginBottom: 30,
    letterSpacing: 1,
  },
  card: {
    width: '100%',
    backgroundColor: '#1C1535',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: '#513A83',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    textAlign: 'center',
  },
  subheading: {
    color: '#B8B1CE',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 28,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 9,
    marginTop: 13,
  },
  input: {
    height: 53,
    backgroundColor: '#100A25',
    borderWidth: 1,
    borderColor: '#49376F',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    fontSize: 15,
  },
  passwordBox: {
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#100A25',
    borderWidth: 1,
    borderColor: '#49376F',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  showText: {
    color: '#00D9FF',
    fontSize: 12,
    fontWeight: '800',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: 14,
  },
  forgotText: {
    color: '#00D9FF',
    fontSize: 13,
  },
  loginButton: {
    height: 54,
    backgroundColor: '#7136E8',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#00D9FF',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 2,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 23,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#49376F',
  },
  or: {
    color: '#B8B1CE',
    marginHorizontal: 14,
    fontSize: 12,
  },
  socialButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#71628D',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    flexWrap: 'wrap',
  },
  normalText: {
    color: '#B8B1CE',
    fontSize: 13,
  },
  signupText: {
    color: '#00D9FF',
    fontWeight: '800',
    fontSize: 13,
  },
  footer: {
    color: '#77718C',
    fontSize: 11,
    marginTop: 28,
  },
});