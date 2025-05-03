/* eslint-disable react/no-unstable-nested-components */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './Router/StackNavigator';
import SplashScreen from 'react-native-splash-screen';
import Ionicons from '@react-native-vector-icons/ionicons';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <>
      <PaperProvider
      settings={{
        icon: props => <Ionicons {...props} />,
      }}
      >
        <ToastProvider>
          <NavigationContainer>
           <StackNavigator />
          </NavigationContainer>
        </ToastProvider>
      </PaperProvider>
    </>
  );
};

//const styles = StyleSheet.create({});

export default App;
