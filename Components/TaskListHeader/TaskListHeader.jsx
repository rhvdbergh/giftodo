import { Text, StyleSheet, View } from 'react-native';

function TaskListHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>My Tasks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#a8d4ad',
    padding: 30,
    marginBottom: 40,
    marginTop: 0,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default TaskListHeader;
