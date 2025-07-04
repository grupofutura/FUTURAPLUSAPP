/* eslint-disable react/no-unstable-nested-components */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { Alert } from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './Router/StackNavigator';
import SplashScreen from 'react-native-splash-screen';
import Ionicons from '@react-native-vector-icons/ionicons';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
//import { useAddMessage } from './hooks';

const App = () => {
  const getToken = async () => {
      try {
          const token = await messaging().getToken();
          console.log(token);
      } catch (error) {
          console.error(error);
      }
  };
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

   useEffect(() => {
    getToken();
  }, []);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Mensaje recibido en segundo plano:', remoteMessage);

  // Usamos notifee para mostrar una notificación
await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher', // asegúrate de tener este icono en android/app/src/main/res
      importance: AndroidImportance.HIGH,
    },
  });
});

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
