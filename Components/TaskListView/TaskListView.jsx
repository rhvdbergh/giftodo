import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import LOCALHOST_IP from '../../config';

function TaskListView() {
  // local state for the tasklist
  const [taskList, setTaskList] = useState([]);
  const [loaded, setLoaded] = useState(0);

  // on page load, retrieve the taskList
  useEffect(() => {
    fetch(`http://${LOCALHOST_IP}:5000/api/task`)
      .then((response) => response.json())
      .then((data) => {
        setTaskList(data);
        setLoaded(loaded + 1);
      })
      .catch((err) => console.log('Error in fetch: ', err));
  }, []);

  console.log(`taskList`, taskList);

  const Task = ({ name }) => (
    <View style={styles.task}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );

  const renderTask = ({ item }) => {
    return <Task name={item.name} />;
  };

  return (
    <FlatList
      data={taskList}
      renderItem={renderTask}
      keyExtractor={(task) => task.id}
      extraData={loaded}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  task: {
    backgroundColor: '#e8ec67',
    padding: 25,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 24,
  },
});

export default TaskListView;
