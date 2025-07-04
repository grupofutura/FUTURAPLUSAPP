/* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { TextInput, Button, Text,Card,Title,Paragraph } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';
import { posLogin } from '../hooks';
//import {Iconos} from './components/helper';

import globalStyles from '../styles/global';

export const CardContent = () => (
    <>
    <View style={[globalStyles.card,styles.tarjeta]}>
        <Text>
            <Card.Content>
                <Title>Como funciona la App Futura</Title>
                <Paragraph>En FuturaPlus App puedes Consultar tus Abonos pagados atraves de pix
                    simplemente con el documento o CPF
                    </Paragraph>
            </Card.Content>
        </Text>
    </View>
    </>
  );

const Login = () => {
    const [documento, setDocumento] = useState('');
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
        if (documento === '') {
            toast.show('El Documento obligatorio/CPF obrigatório', {
                type: 'custom',
                placement: 'top',
                duration: 2000,
                offset: 30,
                animationType: 'zoom-in',
              });
            return;
          }
         if ((netInfo.Connected === false && netInfo.WifiEnabled === false))
            {
             toast.show('Ha ocurrido un Error de conexion intentelo nuevamente', {
                 type: 'danger',
                 duration: 2000,
             });
             return;
           }

        setValinicio(true);


        if ((netInfo.Connected === true || netInfo.WifiEnabled === true))
        {
           // navigation.navigate('LoginCod');
            //setValinicio(false);
                posLogin({documento})
                     .then(async Result => {
                        //console.log(Result);
                        if (Result.status !== 'ok'){
                           // console.log(Result.code);
                            setValinicio(false);
                              //const response = Result.response.split('-');
                              toast.show('Este documento/CPF no registra informacion en Futura', {
                                     type:  'danger',
                                     duration: 2000,
                                 });
                                 return;
                             }

                        if (Result.len === 0) {
                            setValinicio(false);
                           toast.show('Este documento/CPF no registra ningun credito activo', {
                                 type: 'warning',
                                 duration: 2000,
                             });
                            return;
                        }
                        if (Result.status === 'ok'){
                            const {cliente,prestamos} = Result;
                            //const token = await messaging().getToken();
                             await AsyncStorage.setItem('dataCliente', JSON.stringify(cliente));
                             await AsyncStorage.setItem('dataPrestamos', JSON.stringify(prestamos));
                             //await AsyncStorage.setItem('dataTokens', token);
                             navigation.navigate('Inicio');
                             setDocumento('');
                             setValinicio(false);
                         }
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
                  //keyboardType="numeric"
                  label="Documento/CPF"
                  placeholder="Escriba/Escrever"
                  onChangeText={texto => setDocumento(texto)}
                  value={documento}
                  style={styles.input}
              />
              <Text>
                {inicio === false ?
                (<Button
                  style={globalStyles.boton}
                  mode="contained"
                  icon={'send'}
                  contentStyle={styles.flexReverse}
                  onPress={() => handleSubmit()}
                 >
                 <Text style={globalStyles.botonTexto}>Ingresar/Entre </Text>
                </Button>
                ) : (
                <Button
                style={{width:'100%'}}
                mode="outlined"
                loading
                >
                   Entrando
                </Button>
                )}
                </Text>
         </View>
       <CardContent />
     </View>
   </>);
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
    tarjeta: {
            flex: 0,
            justifyContent: 'center',
            alignItems: 'left',
            backgroundColor: '#FFF',
            marginTop: 25,
            width: '100%',
            height: 100,
   },
   flexReverse: {
    flexDirection: 'row-reverse',
  },
});

export default Login;
