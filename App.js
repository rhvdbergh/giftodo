import { StyleSheet, SafeAreaView } from 'react-native';
import TaskListView from './Components/TaskListView/TaskListView';

export default function App() {
  return (
    <SafeAreaView>
      <TaskListView />
    </SafeAreaView>
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
