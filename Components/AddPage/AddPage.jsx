import { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { colors, Slider, Text, Image, CheckBox } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

// set up an empty task object to start with
const emptyTask = {
  name: null,
  description: null,
  priority: 5,
  due_date: null,
  gif_url: 'https://source.unsplash.com/random',
};

function AddPage() {
  // local state to control input
  const [task, setTask] = useState(emptyTask);
  const [hasDueDate, setHasDueDate] = useState(false);

  console.log(`task`, task);

  return (
    <ScrollView style={styles.container}>
      <Text>Task Name</Text>
      <TextInput
        placeholder="Enter Task Name"
        autoFocus
        onChangeText={(value) => setTask({ ...task, name: value })}
      />
      <Text>Task Description</Text>
      <TextInput
        style={{ height: 200 }}
        placeholder="Enter Task Description"
        multiline
        onChangeText={(value) => setTask({ ...task, description: value })}
      />
      <Text>Select Priority: {task.priority}</Text>
      <Slider
        value={task.priority}
        onValueChange={(val) => setTask({ ...task, priority: val })}
        minimumValue={0}
        maximumValue={10}
        step={1}
        allowTouchTrack
        trackStyle={{ backgroundColor: 'transparent' }}
        thumbTintColor={colors.primary}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.grey4}
      />
      <CheckBox
        title="Due date"
        checked={hasDueDate}
        onPress={() => setHasDueDate(!hasDueDate)}
      />
      <DateTimePicker
        value={task.due_date ?? new Date()}
        disabled={!hasDueDate}
        mode={'datetime'}
        display="default"
        onChange={(evt, date) => console.log(`event fired with: `, date)}
      />
      <Image
        source={{ uri: task.gif_url }}
        containerStyle={styles.gif}
        PlaceholderContent={<ActivityIndicator />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gif: {
    width: '70%',
    height: 200,
  },
});

export default AddPage;
