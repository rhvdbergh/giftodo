import { useState } from 'react';
import { StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';
import { colors, Input, Slider, Text, Image } from 'react-native-elements';

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

  console.log(`task`, task);

  return (
    <View style={styles.container}>
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
      <Image
        source={{ uri: task.gif_url }}
        containerStyle={styles.gif}
        PlaceholderContent={<ActivityIndicator />}
      />
    </View>
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
