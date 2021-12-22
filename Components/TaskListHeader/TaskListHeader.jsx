import { Text, StyleSheet, View } from 'react-native';
import { colors, ThemeProvider } from 'react-native-elements';

// set theme colors
const theme = {
  colors: {
    primary: '#e64a19',
  },
};

function TaskListHeader({ view }) {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e64a19',
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
