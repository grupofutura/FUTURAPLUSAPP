
import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { TextInput, Button, Avatar, Text } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { getCodigo } from '../hooks';

import globalStyles from '../styles/global';

const Login = () => {
    const [codigo, setCodigo] = useState('');
    const [inicio, setValinicio] = useState(false);
    const [netInfo, setNetInfo] = useState({});

    // React mensajes toast
    const toast = useToast();
    // React navigation
    const navigation = useNavigation();

    useEffect(() => {
        // Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener((state) => {
            setNetInfo({
                Connectiontype: state.type,
                IsInternetReachable: state.isInternetReachable,
                Connected: state.isConnected,
                WifiEnabled: state.isWifiEnabled,
               }
            );
        });
        return () => {
            // Unsubscribe to network state updates
            unsubscribe();
        };

    }, []);

    const getNetInfo = () => {
        // To get the network state once
        NetInfo.fetch().then((state) => {
            setNetInfo({
                Connectiontype: state.type,
                InternetReachable: state.isInternetReachable,
                Connected: state.isConnected,
                WifiEnabled: state.isWifiEnabled,
            });
        });
    };


    const handleSubmit = async () => {
          getNetInfo();

        if (codigo === '') {
            toast.show('El Codigo es obligatorio/Codigo obrigatório ',{
                duration: 3000,
            });
            return;
          }

        //const CandidatoVal = JSON.parse(await AsyncStorage.getItem('DATOSCANDIDATO'));

         if ((netInfo.Connected === false && netInfo.WifiEnabled === false)
             ) {
             toast.show('Ha ocurrido un Error de conexion intentelo nuevamente', {
                 type: 'danger',
                 duration: 2000,
             });
             return;
           }

        setValinicio(true);


        if ((netInfo.Connected === true || netInfo.WifiEnabled === true))
        {
            //navigation.navigate('Inicio');
            //setValinicio(false);
                   //setValinicio(false);
                getCodigo({codigo})
                   .then(async Result => {
                      console.log(Result.code);
                    //   if (Result.code === 101){
                    //       console.log(Result.code);
                    //       setValinicio(false);
                    //         //const response = Result.response.split('-');
                    //         toast.show('Este documento/CPF no registra informacion en Futura', {
                    //                type:  'danger',
                    //                duration: 2000,
                    //            });
                    //            return;
                    //        }

                    //   if (Result.data === 0) {
                    //       setValinicio(false);
                    //      toast.show('Este documento/CPF no registra ningun credito activo', {
                    //            type: 'warning',
                    //            duration: 2000,
                    //        });
                    //       return;
                    //   }
                     //if (Result.code === 100) {
                           //await AsyncStorage.setItem('token', Result.data.access_token);
                           //console.log(Result.data);
                           //await AsyncStorage.setItem('dataCliente', JSON.stringify(Result.data));
                           navigation.navigate('Inicio');
                           setValinicio(false);
                       //}
          });
         }
    };



  return (
     <>
     <View style={globalStyles.contenedor}>
        <View style={styles.formlogin}>
              <Text style={globalStyles.logo}>
                  <Image style={styles.img} source={require('../assets/logo.png')}/>
                 {/* <Avatar.Image size={96} source={require('../assets/logo.png')}/> */}
             </Text>
              <Text style={globalStyles.titulo}>
                  FuturaPlus App
              </Text>
              <TextInput
                  keyboardType="numeric"
                  label="Codigo Acceso"
                  placeholder="Codigo"
                  onChangeText={texto => setCodigo(texto)}
                  value={codigo}
                  style={styles.input}
              />

              <Button
                  style={globalStyles.boton}
                  //icon="location-enter"
                  mode="contained"
                  onPress={() => handleSubmit()}
                 >
                  {inicio === false ? ' Validar Codigo' : 'Validando...'}
              </Button>
         </View>
     </View>
     </>
    );
};

const styles = StyleSheet.create({
    formlogin: {
        marginTop: 20,
        marginHorizontal: '2.5%',
    },
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    img: {
        flex: 0,
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    },
});

export default Login;
