import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import {
  Button,
  ListItem,
  Image,
  Overlay,
  colors,
  Divider,
} from 'react-native-elements';
import { LOCALHOST_IP } from '../../config';
import TaskListHeader from '../TaskListHeader/TaskListHeader';

function TaskListView({
  setEditTask,
  setTabIndex,
  taskList,
  setTaskList,
  view,
}) {
  const today = new Date();

  // local state to keep track of modal
  const [showMore, setShowMore] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const renderTask = ({ item }) => {
    return (
      ((item.gif_url !== null && view === 'gif') ||
        view === 'task' ||
        (item.due_date !== null &&
          today > new Date(item.due_date) &&
          view === 'overdue')) && (
        <TouchableWithoutFeedback
          onPress={() => {
            setCurrentTask(item);
            setShowMore(true);
          }}
        >
          <View
            style={{
              width: '100%',
            }}
          >
            <ListItem style={{ width: '100%' }}>
              <ListItem.Content
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {/* In task view, show text, else gifs */}
                {view === 'task' || view === 'overdue' ? (
                  <>
                    <ListItem.Title
                      style={{
                        ...styles.centeredTitle,
                        color: item.complete
                          ? colors.grey4
                          : item.due_date !== null &&
                            (today > new Date(item.due_date)
                              ? colors.error
                              : 'black'),
                      }}
                    >
                      {item.name}
                    </ListItem.Title>

                    <ListItem.Subtitle
                      style={{
                        marginBottom: 10,
                        color: item.complete ? colors.grey4 : 'black',
                      }}
                    >
                      Priority: {item.priority}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle
                      style={{
                        color: item.complete
                          ? colors.grey4
                          : item.due_date !== null &&
                            (today > new Date(item.due_date)
                              ? colors.error
                              : 'black'),
                      }}
                    >
                      {item.due_date !== null &&
                        !item.complete &&
                        `Due: ${new Date(item.due_date).toLocaleDateString()}`}
                      {item.complete &&
                        `Completed on: ${new Date(
                          item.completed_on
                        ).toLocaleDateString()}`}
                    </ListItem.Subtitle>
                  </>
                ) : (
                  <>
                    <ListItem.Title style={styles.centeredTitle}>
                      {item.name}
                    </ListItem.Title>
                    <Image
                      source={{ uri: item.gif_url }}
                      containerStyle={styles.gif}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                  </>
                )}
              </ListItem.Content>
            </ListItem>
            <Divider />
          </View>
        </TouchableWithoutFeedback>
      )
    );
  };

  const handleDelete = (id) => {
    // delete this specific id
    fetch(`http://${LOCALHOST_IP}:5000/api/task/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // refresh the list
        fetch(`http://${LOCALHOST_IP}:5000/api/task`)
          .then((response) => response.json())
          .then((data) => {
            setTaskList(data);
            // close the modal
            setShowMore(false);
          })
          .catch((err) => console.log('Error in fetch: ', err));
      })
      .catch((err) => console.log('error deleting:', err));
  };

  const handleComplete = (id) => {
    // delete this specific id
    fetch(`http://${LOCALHOST_IP}:5000/api/task/complete/${id}`, {
      method: 'PUT',
    })
      .then(() => {
        // refresh the list
        fetch(`http://${LOCALHOST_IP}:5000/api/task`)
          .then((response) => response.json())
          .then((data) => {
            setTaskList(data);
            setShowMore(false);
          })
          .catch((err) => console.log('Error in fetch: ', err));
      })
      .catch((err) => console.log('error deleting:', err));
  };

  return (
    <>
      <FlatList
        data={taskList}
        renderItem={renderTask}
        keyExtractor={(task) => task.id}
        extraData={taskList}
        ListHeaderComponent={<TaskListHeader view={view} />}
        stickyHeaderIndices={[0]}
      />
      <Overlay
        isVisible={showMore}
        onBackdropPress={() => setShowMore(!showMore)}
        fullScreen
      >
        <ScrollView>
          {currentTask.complete && (
            <ListItem.Title style={{ ...styles.centeredTitle, fontSize: 32 }}>
              TASK COMPLETE!
            </ListItem.Title>
          )}
          <ListItem.Title style={styles.centeredTitle}>
            {currentTask.name}
          </ListItem.Title>
          <ListItem.Subtitle style={{ marginBottom: 15 }}>
            {currentTask.complete
              ? `Completed on: ${new Date(
                  currentTask.completed_on
                ).toLocaleDateString()}`
              : `Due: ${new Date(currentTask.due_date).toLocaleDateString()}`}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{ marginBottom: 15 }}>
            Priority: {currentTask.priority}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{ marginBottom: 15 }}>
            Added on: {new Date(currentTask.created).toLocaleDateString()}
          </ListItem.Subtitle>
          {currentTask.gif_url !== null && (
            <Image
              style={{ marginBottom: 15 }}
              source={{ uri: currentTask.gif_url }}
              containerStyle={styles.gif}
              PlaceholderContent={<ActivityIndicator />}
            />
          )}
          <ListItem.Subtitle style={{ marginBottom: 15 }}>
            Description: {currentTask.description}
          </ListItem.Subtitle>
        </ScrollView>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ width: '50%' }}>
            <Button
              title="Delete"
              icon={{
                name: 'trash-alt',
                type: 'font-awesome-5',
                color: 'white',
              }}
              buttonStyle={{
                ...styles.modalButton,
                backgroundColor: colors.error,
              }}
              onPress={() => handleDelete(currentTask.id)}
            />
            <Button
              title="Edit"
              icon={{
                name: 'edit',
                type: 'font-awesome-5',
                color: 'white',
              }}
              onPress={() => {
                // set the edit task
                setEditTask(currentTask);
                setTabIndex(3);
              }}
              buttonStyle={{
                ...styles.modalButton,
                backgroundColor: colors.warning,
              }}
            />
          </View>
          <View style={{ width: '50%' }}>
            <Button
              title="Complete"
              disabled={currentTask.complete}
              icon={{
                name: 'check-circle',
                type: 'font-awesome-5',
                color: 'white',
              }}
              onPress={() => handleComplete(currentTask.id)}
              buttonStyle={styles.modalButton}
            />

            <Button
              title="Back to List"
              icon={{
                name: 'undo',
                type: 'font-awesome-5',
                color: 'white',
              }}
              onPress={() => setShowMore(false)}
              buttonStyle={styles.modalButton}
            />
          </View>
        </View>
      </Overlay>
    </>
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
  completedTask: {
    backgroundColor: colors.grey5,
    padding: 25,
    marginVertical: 1,
  },
  text: {
    fontSize: 24,
  },
  button: {
    flex: 1,
  },
  gif: {
    display: 'flex',
    justifyContent: 'center',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    aspectRatio: 3 / 2,
  },
  gifContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  centeredTitle: {
    textAlign: 'center',
    width: '100%',
    fontSize: 24,
    marginBottom: 15,
    marginTop: 30,
  },
  modalButton: {
    backgroundColor: colors.primary,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
});

export default TaskListView;
