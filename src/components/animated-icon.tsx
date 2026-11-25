import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);

  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.back(1.5)),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(1200),
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 650,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1.08,
            duration: 650,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        setVisible(false);
      });
    }, 100);

    SplashScreen.hideAsync();

    return () => clearTimeout(timer);
  }, [opacity, scale]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.splashOverlay,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
     <Image
  source={require('@/assets/images/chatvibez-logo.png.jpeg')}
  style={styles.logoImage}
  resizeMode="contain"
/>

      <Text style={styles.appName}>ChatVibez</Text>

      <Text style={styles.tagline}>
        CONNECT  •  CHAT  •  ENJOY
      </Text>

      <View style={styles.goldLine} />
    </Animated.View>
  );
}

export function AnimatedIcon() {
  return (
   <Image
  source={require('@/assets/images/chatvibez-logo.png.jpeg')}
  style={styles.logoImage}
  resizeMode="contain"
/>
  );
}

const styles = StyleSheet.create({
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#100B24',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },

  logoBox: {
    width: 112,
    height: 112,
    borderRadius: 32,
    backgroundColor: '#30205A',
    borderWidth: 2,
    borderColor: '#C69B50',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 15,
  },
logoImage: {
  width: 160,
  height: 160,
  alignSelf: 'center',
},
  logoText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#F5D58A',
    letterSpacing: 2,
  },

  appName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 24,
    letterSpacing: 1.5,
  },

  tagline: {
    color: '#C9A8FF',
    fontSize: 11,
    letterSpacing: 2,
    marginTop: 10,
  },

  goldLine: {
    width: 55,
    height: 3,
    backgroundColor: '#D6AD62',
    borderRadius: 5,
    marginTop: 22,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#30205A',
    borderWidth: 1,
    borderColor: '#C69B50',
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallLogo: {
    color: '#F5D58A',
    fontWeight: '900',
    fontSize: 19,
  },
});