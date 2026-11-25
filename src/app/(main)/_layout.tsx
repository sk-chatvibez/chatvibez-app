import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F12D91',
        tabBarInactiveTintColor: '#92929B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 72,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={typeof color === 'string' ? color : '#92929B'} />
          ),
        }}
      />

      <Tabs.Screen
        name="moment"
        options={{
          title: 'Moment',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="globe-outline" size={size} color={typeof color === 'string' ? color : '#92929B'} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarLabel: '',
          tabBarIcon: () => (
            <View style={styles.createButton}>
              <Ionicons name="add" size={32} color="#FFFFFF" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notification',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={typeof color === 'string' ? color : '#92929B'} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={typeof color === 'string' ? color : '#92929B'} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  createButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F12D91',
    alignItems: 'center',
    justifyContent: 'center',
  },
});