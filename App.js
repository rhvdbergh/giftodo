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
import { LOCALHOST_IP } from './config';
import TaskListView from './Components/TaskListView/TaskListView';
import AddPage from './Components/AddPage/AddPage';

export default function App() {
  // local state for the tasklist
  const [taskList, setTaskList] = useState([]);

  // local state for tab index
  const [tabIndex, setTabIndex] = useState(2);

  // keeps track of items to edit
  const [editTask, setEditTask] = useState({});

  // keeps track of whether the speed dial is open
  const [openSpeedDial, setOpenSpeedDial] = useState(false);

  // keeps track of sort position
  // default is descending sort
  const [sortDesc, setSortDesc] = useState(true);
  const [latestSortType, setLatestSortType] = useState('name');

  // on app load, retrieve the taskList
  useEffect(() => {
    refreshWithoutSort();
  }, []);

  // fetches the taskList without sort
  const refreshWithoutSort = () => {
    fetch(`http://${LOCALHOST_IP}:5000/api/task`)
      .then((response) => response.json())
      .then((data) => {
        setTaskList(data);
      })
      .catch((err) => console.log('Error in fetch: ', err));
  };

  // fetches the taskList with sort
  const refreshWithSort = (type, sortDirection) => {
    fetch(
      `http://${LOCALHOST_IP}:5000/api/task?type=${type}&direction=${sortDirection}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('you ran a sort and your data is', data);
        setTaskList(data);
        // update the latestSortType
        setLatestSortType(type);
      })
      .catch((err) => console.log('Error in fetch for sort: ', err));
  };

  // handles the sort
  const handleSort = (type) => {
    // variable to determine sort direction
    let sortDirection;
    if (latestSortType === type) {
      // change the sort direction and toggle
      sortDirection = sortDesc ? 'asc' : 'desc';
      setSortDesc(!sortDesc);
    } else {
      // use the normal sortDirection
      sortDirection = 'desc';
      // and return sortDesc to true
      setSortDesc(true);
    }

    // now use queries to refresh the taskList
    refreshWithSort(type, sortDirection);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {tabIndex === 0 && (
          <TaskListView
            setEditTask={setEditTask}
            setTabIndex={setTabIndex}
            taskList={taskList}
            setTaskList={setTaskList}
            view={'overdue'}
          />
        )}
        {tabIndex === 1 && (
          <TaskListView
            setEditTask={setEditTask}
            setTabIndex={setTabIndex}
            taskList={taskList}
            setTaskList={setTaskList}
            view={'gif'}
          />
        )}
        {tabIndex === 2 && (
          <TaskListView
            setEditTask={setEditTask}
            setTabIndex={setTabIndex}
            taskList={taskList}
            setTaskList={setTaskList}
            view={'task'}
          />
        )}
        {tabIndex === 3 && (
          <AddPage
            setTabIndex={setTabIndex}
            setEditTask={setEditTask}
            refreshWithSort={refreshWithSort}
            refreshWithoutSort={refreshWithoutSort}
            latestSortType={latestSortType}
            sortDesc={sortDesc}
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
              icon={{
                name: 'exclamation',
                type: 'font-awesome-5',
                color: '#fff',
              }}
              title="Priority"
              onPress={() => handleSort('priority')}
            />
            <SpeedDial.Action
              icon={{
                name: 'calendar-alt',
                type: 'font-awesome-5',
                color: '#fff',
              }}
              title="Date Added"
              onPress={() => handleSort('created')}
            />
            <SpeedDial.Action
              icon={{ name: 'clock', type: 'font-awesome-5', color: '#fff' }}
              title="Due Date"
              onPress={() => handleSort('due_date')}
            />
            <SpeedDial.Action
              icon={{
                name:
                  latestSortType === 'name' && sortDesc
                    ? 'sort-alpha-down'
                    : 'sort-alpha-up',
                type: 'font-awesome-5',
                color: '#fff',
              }}
              title="Name"
              onPress={() => handleSort('name')}
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
