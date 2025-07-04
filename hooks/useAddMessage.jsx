

import { useEffect } from 'react';
import { PermissionsAndroid,Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

 const requestUserPermission = async () => {

    if(Platform.OS === 'ios'){
        const authStatus = await messaging().requestPermission();
        const autorizado = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if(autorizado){
        console.log('autorizacion estatus', authStatus);
    }

    }else if(Platform.OS === 'android'){
       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
       if(granted === PermissionsAndroid.RESULTS.GRANTED){
             console.log('permiso habilitado granted');
       }else{
         console.log('permiso no habilitado granted');
       }
    }



  };
 const getToken = async () => {
      try {
          const token = await messaging().getToken();
          return token;
      } catch (error) {
          console.error(error);
        return error;
      }
  };

export const useAddMessage = async () => {
 useEffect(() => {
      getToken();
      requestUserPermission();
       }, []);
  };
