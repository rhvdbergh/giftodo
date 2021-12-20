import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  // on page load:
  useEffect(() => {
    fetch('http://localhost:5000/api/task')
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log('Error in fetch: ', err));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
