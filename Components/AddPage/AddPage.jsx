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
      <Text style={styles.text}>Task Name</Text>
      <TextInput
        placeholder="Enter Task Name"
        autoFocus
        onChangeText={(value) => setTask({ ...task, name: value })}
      />
      <Text style={styles.text}>Task Description</Text>
      <TextInput
        style={{ height: 100 }}
        placeholder="Enter Task Description"
        multiline
        onChangeText={(value) => setTask({ ...task, description: value })}
      />
      <Text style={styles.text}>Select Priority: {task.priority}</Text>
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
      <View style={styles.dateContainer}>
        <CheckBox
          textStyle={styles.text}
          title="Due date"
          checked={hasDueDate}
          onPress={() => setHasDueDate(!hasDueDate)}
        />
        <DateTimePicker
          value={task.due_date ?? new Date()}
          disabled={!hasDueDate}
          mode={'datetime'}
          display="default"
          onChange={(evt, date) => setTask({ ...task, due_date: date })}
        />
      </View>
      <View style={styles.gifContainer}>
        <Button
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
        />
        <Image
          source={{ uri: task.gif_url }}
          containerStyle={styles.gif}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.buttonbox}>
        <Button
          title="Cancel"
          buttonStyle={{
            backgroundColor: colors.error,
            borderRadius: 3,
          }}
          containerStyle={{
            width: '30%',
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        />
        <Button
          title="Add"
          buttonStyle={{
            backgroundColor: colors.primary,
            borderRadius: 3,
          }}
          containerStyle={{
            width: '30%',
            marginHorizontal: 10,
            marginVertical: 10,
          }}
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
    alignItems: 'center',
  },
  gifContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  gif: {
    width: '70%',
    height: 200,
  },
  text: {
    fontSize: 18,
  },
  buttonbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddPage;
