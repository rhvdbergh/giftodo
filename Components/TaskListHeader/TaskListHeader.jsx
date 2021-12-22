import { Text, StyleSheet, View } from 'react-native';
import { colors } from 'react-native-elements';

function TaskListHeader({ view }) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>
        {view === 'task'
          ? 'My Tasks'
          : view === 'gif'
          ? 'Task Gifs'
          : view === 'edit'
          ? 'Edit'
          : view === 'add'
          ? 'Add'
          : 'Overdue'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    padding: 30,
    marginTop: 0,
    marginVertical: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default TaskListHeader;
