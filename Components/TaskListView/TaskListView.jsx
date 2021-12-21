import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { LOCALHOST_IP } from '../../config';
import TaskListHeader from '../TaskListHeader/TaskListHeader';

function TaskListView({ setEditTask, setTabIndex }) {
  // local state for the tasklist
  const [taskList, setTaskList] = useState([]);
  const [loaded, setLoaded] = useState(0); // forces the Flatlist to update

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

  const Task = ({ name }) => (
    <View style={styles.task}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );

  const renderTask = ({ item }) => {
    return (
      <ListItem.Swipeable
        leftContent={
          <Button
            title="Edit"
            icon={{ name: 'edit', type: 'font-awesome-5', color: 'white' }}
            onPress={() => {
              // set the edit task
              setEditTask(item);
              setTabIndex(3);
            }}
            buttonStyle={{ minHeight: '100%' }}
          />
        }
        rightContent={
          <Button
            title="Delete"
            icon={{ name: 'trash-alt', type: 'font-awesome-5', color: 'white' }}
            onPress={() => handleDelete(item.id)}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
          />
        }
      >
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.due_date}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
    );
  };

  const handleDelete = (id) => {
    // delete this specific id
    fetch(`http://${LOCALHOST_IP}:5000/api/task/${id}`, {
      method: 'DELETE',
    }).catch((err) => console.log('error deleting:', err));

    // refresh the list
    fetch(`http://${LOCALHOST_IP}:5000/api/task`)
      .then((response) => response.json())
      .then((data) => {
        setTaskList(data);
        setLoaded(loaded + 1);
      })
      .catch((err) => console.log('Error in fetch: ', err));
  };

  return (
    <FlatList
      data={taskList}
      renderItem={renderTask}
      keyExtractor={(task) => task.id}
      extraData={loaded}
      ListHeaderComponent={TaskListHeader}
      stickyHeaderIndices={[0]}
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
    marginVertical: 1,
  },
  text: {
    fontSize: 24,
  },
  button: {
    flex: 1,
  },
});

export default TaskListView;
