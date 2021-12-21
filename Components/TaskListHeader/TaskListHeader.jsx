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
    marginTop: 0,
    marginVertical: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default TaskListHeader;
