import { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  View,
} from 'react-native';
import {
  colors,
  Slider,
  Text,
  Image,
  CheckBox,
  Button,
} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LOCALHOST_IP, GIPHY_API } from '../../config';
import axios from 'axios';
import TaskListHeader from '../TaskListHeader/TaskListHeader';

// set up an empty task object to start with
const emptyTask = {
  name: null,
  description: null,
  priority: 5,
  due_date: null,
  gif_url: null,
};

function AddPage({
  setTabIndex,
  setEditTask,
  refreshWithSort,
  refreshWithoutSort,
  latestSortType,
  sortDesc,
  editTask,
}) {
  // local state to control input
  const [task, setTask] = useState(editTask.id ? editTask : emptyTask);
  // the slider doesn't update correctly,
  // so the priority needs to be handled separately
  const [priority, setPriority] = useState(editTask.id ? editTask.priority : 5);
  const [hasDueDate, setHasDueDate] = useState(
    editTask.id && editTask.due_date !== null ? true : false
  );

  // checks to see if this task can be submitted
  const validTask = () => {
    return task.name !== null && task.name !== '';
  };

  const handleAdd = () => {
    if (validTask) {
      // the method below serves for both PUT and POST
      // depending on whether an editTask exists
      // build the url
      let url;
      editTask.id
        ? (url = `http://${LOCALHOST_IP}:5000/api/task/${editTask.id}`)
        : (url = `http://${LOCALHOST_IP}:5000/api/task`);
      axios({
        method: editTask.id ? 'PUT' : 'POST',
        url: url,
        data: {
          ...task,
          priority: priority,
          due_date: hasDueDate ? task.due_date : null,
        },
      })
        .then(() => {
          // clear out the local state
          setTask(emptyTask);
          setPriority(5);
          setEditTask({});
          // move the user back to the tasks screen
          setTabIndex(2);
          // refresh the task list
          refreshWithSort(latestSortType, sortDesc ? 'DESC' : 'ASC');
        })
        .catch((err) => console.log('Error in adding post: ', err));
    }
  };

  const handleGenerateGif = () => {
    task.name !== null &&
      axios
        .get(
          `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API}&tag=${task.name}&rating=g`
        )
        .then((response) => {
          const giphy_url = response.data.data.images.fixed_height.url;
          setTask({ ...task, gif_url: giphy_url });
          console.log(`giphy object`, giphy_url);
        });
  };

  return (
    <ScrollView style={styles.container}>
      <TaskListHeader view={editTask.id ? 'edit' : 'add'} />
      <Text style={styles.text}>Task Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Task Name"
        value={task.name}
        onChangeText={(value) => setTask({ ...task, name: value })}
      />
      <Text style={styles.text}>Task Description</Text>
      <TextInput
        style={{ ...styles.input, height: 100 }}
        value={task.description}
        placeholder="Enter Task Description"
        multiline
        onChangeText={(value) => setTask({ ...task, description: value })}
      />
      <Text style={styles.text}>Select Priority: {priority}</Text>
      <Slider
        value={priority}
        onSlidingComplete={(val) => setPriority(val)}
        minimumValue={0}
        maximumValue={10}
        step={1}
        allowTouchTrack
        trackStyle={{ backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 20 }}
        thumbTintColor={colors.primary}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.grey4}
      />
      <View style={styles.dateContainer}>
        <CheckBox
          textStyle={styles.text}
          title="Due date"
          checked={hasDueDate}
          onPress={() => setHasDueDate(!hasDueDate)}
        />
      </View>
      <DateTimePicker
        value={task.due_date ? new Date(task.due_date) : new Date()}
        minimumDate={new Date()}
        disabled={!hasDueDate}
        mode={'datetime'}
        display="default"
        onChange={(evt, date) => setTask({ ...task, due_date: date })}
      />
      <View style={styles.gifContainer}>
        <Button
          style={{ marginBottom: 20 }}
          title="Generate Gif"
          buttonStyle={{
            backgroundColor: colors.primary,
            borderRadius: 3,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={handleGenerateGif}
        />
        {task.gif_url && (
          <Image
            source={{ uri: task.gif_url }}
            containerStyle={styles.gif}
            PlaceholderContent={<ActivityIndicator />}
          />
        )}
      </View>
      <View style={styles.buttonbox}>
        <Button
          title="Cancel"
          buttonStyle={{
            backgroundColor: colors.error,
            borderRadius: 3,
          }}
          containerStyle={{
            width: '40%',
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          onPress={() => setTabIndex(2)}
        />
        <Button
          title={editTask.id ? 'Save' : 'Add'}
          buttonStyle={{
            backgroundColor: colors.primary,
            borderRadius: 3,
          }}
          containerStyle={{
            width: '40%',
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          onPress={handleAdd}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 40,
    marginBottom: 10,
  },
  gifContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
  gif: {
    width: '70%',
    height: 200,
  },
  text: {
    fontSize: 18,
    marginTop: 15,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  input: {
    margin: 15,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
    backgroundColor: colors.grey5,
  },
  buttonbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default AddPage;
