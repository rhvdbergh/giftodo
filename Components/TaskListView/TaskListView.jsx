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
            console.log('you pressed it. item:', item);
            setCurrentTask(item);
            setShowMore(true);
          }}
        >
          <View style={{ width: '100%' }}>
            <ListItem style={{ width: '100%' }}>
              <ListItem.Content
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                {/* In task view, show text, else gifs */}
                {view === 'task' || view === 'overdue' ? (
                  <>
                    <ListItem.Title
                      style={{
                        ...styles.centeredTitle,
                        color:
                          today > new Date(item.due_date)
                            ? colors.error
                            : 'black',
                      }}
                    >
                      {item.name}
                    </ListItem.Title>

                    <ListItem.Subtitle>
                      Priority: {item.priority}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle
                      style={{
                        color:
                          today > new Date(item.due_date)
                            ? colors.error
                            : 'black',
                      }}
                    >
                      {item.due_date !== null &&
                        `Due: ${new Date(item.due_date).toLocaleDateString()}`}
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
          <ListItem.Title style={styles.centeredTitle}>
            {currentTask.name}
          </ListItem.Title>
          <ListItem.Subtitle>due: {currentTask.due_date}</ListItem.Subtitle>
          <ListItem.Subtitle>
            priority: {currentTask.priority}
          </ListItem.Subtitle>
          <ListItem.Subtitle>createad: {currentTask.created}</ListItem.Subtitle>
          {currentTask.gif_url !== null && (
            <Image
              source={{ uri: currentTask.gif_url }}
              containerStyle={styles.gif}
              PlaceholderContent={<ActivityIndicator />}
            />
          )}
          <ListItem.Subtitle>
            description: {currentTask.description}
          </ListItem.Subtitle>
          <Button
            title="OK"
            icon={{
              name: 'check-circle',
              type: 'font-awesome-5',
              color: 'white',
            }}
            onPress={() => setShowMore(false)}
            buttonStyle={{ margin: 30, backgroundColor: colors.primary }}
          />
        </ScrollView>
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
});

//  leftContent={
//                 <Button
//                   title="Edit"
//                   icon={{
//                     name: 'edit',
//                     type: 'font-awesome-5',
//                     color: 'white',
//                   }}
//                   onPress={() => {
//                     // set the edit task
//                     setEditTask(item);
//                     setTabIndex(3);
//                   }}
//                   buttonStyle={{ minHeight: '100%' }}
//                 />
//               }
//               rightContent={
//                 <Button
//                   title="Delete"
//                   icon={{
//                     name: 'trash-alt',
//                     type: 'font-awesome-5',
//                     color: 'white',
//                   }}
//                   onPress={() => handleDelete(item.id)}
//                   buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
//                 />
//               }

export default TaskListView;
