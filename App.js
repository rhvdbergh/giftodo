import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import {
  ThemeProvider,
  TabView,
  Tab,
  View,
  Text,
  colors,
  SpeedDial,
} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TaskListView from './Components/TaskListView/TaskListView';
import GifsView from './Components/GifsView/GifsView';
import AccountView from './Components/AccountView/AccountView';
import AddPage from './Components/AddPage/AddPage';

export default function App() {
  // local state for tab index
  const [tabIndex, setTabIndex] = useState(2);

  // keeps track of items to edit
  const [editTask, setEditTask] = useState({});

  // keeps track of whether the speed dial is open
  const [openSpeedDial, setOpenSpeedDial] = useState(false);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {tabIndex === 0 && (
          <TaskListView
            setEditTask={setEditTask}
            setTabIndex={setTabIndex}
            view={'overdue'}
          />
        )}
        {tabIndex === 1 && (
          <TaskListView
            setEditTask={setEditTask}
            setTabIndex={setTabIndex}
            view={'gif'}
          />
        )}
        {tabIndex === 2 && (
          <TaskListView
            setEditTask={setEditTask}
            setTabIndex={setTabIndex}
            view={'task'}
          />
        )}
        {tabIndex === 3 && (
          <AddPage
            setTabIndex={setTabIndex}
            setEditTask={setEditTask}
            editTask={editTask}
          />
        )}
        <Tab
          value={tabIndex}
          onChange={(event) => {
            // clear the editTask
            setEditTask({});
            setTabIndex(event);
          }}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 3,
          }}
          variant="primary"
        >
          <Tab.Item
            title="Due"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'clock', type: 'font-awesome-5', color: 'white' }}
            onChange={() => console.log('hi')}
          />
          <Tab.Item
            title="Gifs"
            titleStyle={{ fontSize: 12 }}
            icon={{
              name: 'grin-squint',
              type: 'font-awesome-5',
              color: 'white',
            }}
          />
          <Tab.Item
            title="Tasks"
            titleStyle={{ fontSize: 12 }}
            icon={{
              name: 'tasks',
              type: 'font-awesome-5',
              color: 'white',
            }}
          />
          <Tab.Item
            title="Add"
            titleStyle={{ fontSize: 12 }}
            icon={{
              name: 'plus',
              type: 'font-awesome-5',
              color: 'white',
            }}
          />
        </Tab>
        {tabIndex !== 3 && (
          <SpeedDial
            isOpen={openSpeedDial}
            style={{ marginBottom: 58 }}
            icon={{
              name: 'sort-amount-down-alt',
              type: 'font-awesome-5',
              color: '#fff',
            }}
            openIcon={{ name: 'close', color: '#fff' }}
            title={openSpeedDial && 'Sort by'}
            transitionDuration={100}
            onOpen={() => setOpenSpeedDial(!openSpeedDial)}
            onClose={() => setOpenSpeedDial(!openSpeedDial)}
          >
            <SpeedDial.Action
              icon={{ name: 'add', color: '#fff' }}
              title="Priority"
              onPress={() => console.log('Add Something')}
            />
            <SpeedDial.Action
              icon={{ name: 'add', color: '#fff' }}
              title="Date Added"
              onPress={() => console.log('Add Something')}
            />
            <SpeedDial.Action
              icon={{ name: 'add', color: '#fff' }}
              title="Due Date"
              onPress={() => console.log('Add Something')}
            />
            <SpeedDial.Action
              icon={{ name: 'add', color: '#fff' }}
              title="Name"
              onPress={() => console.log('Add Something')}
            />
          </SpeedDial>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
