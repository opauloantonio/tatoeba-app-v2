import { StacksProvider } from '@mobily/stacks';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

import ThemeProvider from '@context/Theme/ThemeProvider';
import NavigationProvider from '@context/Navigation/NavigationProvider';

import StatusBar from '@components/StatusBar';
import { store, persistor } from './store';
import RealmContext from './database';
import BottomTabs from './routes';

const { RealmProvider } = RealmContext;

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RealmProvider>
          <ThemeProvider>
            <StacksProvider spacing={1}>
              <SafeAreaProvider>
                <NavigationProvider>
                  <StatusBar />
                  <BottomTabs />
                </NavigationProvider>
              </SafeAreaProvider>
            </StacksProvider>
          </ThemeProvider>
        </RealmProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
