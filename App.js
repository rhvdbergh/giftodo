import { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ThemeProvider, TabView, Tab, View, Text } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TaskListView from './Components/TaskListView/TaskListView';

export default function App() {
  // local state for tab index
  const [tabIndex, setTabIndex] = useState(2);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TabView value={tabIndex} onChange={setTabIndex}>
          <TabView.Item style={{ width: '100%' }}>
            <TaskListView />
          </TabView.Item>
          <TabView.Item style={{ width: '100%' }}>
            <TaskListView />
          </TabView.Item>
          <TabView.Item style={{ width: '100%' }}>
            <TaskListView />
          </TabView.Item>
        </TabView>
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
            title="Account"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'user', type: 'font-awesome-5', color: 'white' }}
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
        </Tab>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#967d69',
  },
});
