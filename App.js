import { StyleSheet, SafeAreaView } from 'react-native';
import TaskListView from './Components/TaskListView/TaskListView';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TaskListView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#967d69',
  },
});
