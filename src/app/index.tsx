import { Redirect } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { auth } from '../firebase';

export default function Index() {
  const [destination, setDestination] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setDestination(user ? '/profile-setup' : '/(auth)');
    });

    return unsubscribe;
  }, []);

  if (!destination) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#100B24',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator color="#F12D91" size="large" />
      </View>
    );
  }

  return <Redirect href={destination as any} />;
}