import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {
  ThemeProvider,
  TabView,
  Tab,
  View,
  Text,
  colors,
} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TaskListView from './Components/TaskListView/TaskListView';
import GifsView from './Components/GifsView/GifsView';
import AccountView from './Components/AccountView/AccountView';
import AddPage from './Components/AddPage/AddPage';

export default function App() {
  // local state for tab index
  const [tabIndex, setTabIndex] = useState(2);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {tabIndex === 0 && <AccountView />}
        {tabIndex === 1 && <GifsView />}
        {tabIndex === 2 && <TaskListView />}
        {tabIndex === 3 && <AddPage setTabIndex={setTabIndex} />}
        <Tab
          value={tabIndex}
          onChange={(event) => setTabIndex(event)}
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
