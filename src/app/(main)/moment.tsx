import { StyleSheet, Text, View } from 'react-native';

export default function MomentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moment</Text>
      <Text style={styles.subtitle}>Daily posts and updates</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100A25',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#B8B1CE',
    marginTop: 8,
  },
});