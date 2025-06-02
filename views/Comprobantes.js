/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Text as Texto, Divider, Button, IconButton} from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import { useToast } from 'react-native-toast-notifications';
import { uploadComprobante } from '../hooks';
import { DialogoEnv,DialogoOk } from './components/Dialogos';
import { currencyFormat } from './components/helper';
import NetInfo from '@react-native-community/netinfo';
import globalStyles from '../styles/global';

const Comprobantes = ({ route }) => {
    const [tempUri, setTempUri] = useState('');
    const [file, setFile] = useState('');
   // const [sharedImage, setSharedImage] = useState(null);
    const [datoscredito, setDatoscredito] = useState([]);
    const [inicioD, setValinicioD] = useState(false);
    const [valorpgo, setValorpgo] = useState(0);
    const [visible, setVisible] = useState(false);
    const [visibleOk, setVisibleOk] = useState(false);
     const [netInfo, setNetInfo] = useState({});
     const [tipoup, setTipoup] = useState(0);
    const { creditos } = route.params;

    const navigation = useNavigation();
    // React mensajes toast
    const toast = useToast();

     useEffect(() => {
        setDatoscredito(creditos);
        //console.log(creditos);
     }, []);

     useEffect(() => {
        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener((state) => {
            setNetInfo({
                Connectiontype: state.type,
                IsInternetReachable: state.isInternetReachable,
                Isconnected: state.isConnected,
                IsWifiEnabled: state.isWifiEnabled,
            }
            );
        });
        return () => {
            unsubscribe();
        };

    }, []);

    const _onValueChange = () => {
            handleimagengaleria();
    };

    useEffect(() => {
        ReceiveSharingIntent.getReceivedFiles(
            (files) => {
              if (files && files.length > 0) {
                const [firstFile] = files;
                const { filePath } = firstFile;
                //console.log('Archivos recibidos:', files);
                setTempUri('file://' + filePath);
                setFile(files);
                setTipoup(1);
              } else {
                console.log('No se recibieron archivos.');
              }
              // Limpia los archivos compartidos después de procesarlos
              //ReceiveSharingIntent.clearReceivedFiles();
            },
            (error) => {
              console.error('Error al recibir archivos:', error);
              // Asegúrate de limpiar aunque ocurra un error
              //ReceiveSharingIntent.clearReceivedFiles();
            },
            'ShareMedia'
          );
    },[]);

const handleimagengaleria = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
        }, (resp) => {
            if (resp.didCancel) { return; }
            const { uri } = resp.assets[0];
            setTempUri(uri);
            setFile(resp);
            setTipoup(0);
        }).catch((e) => {
            console.log(e);
        });
    };

    const handleSubmit = () => {
        if (file === '') {
            toast.show('Selecione el comprobante del pix enviado/Selecione o recibo enviado', {
                duration: 3000,
            });
            return;
        }

        if (valorpgo === 0) {
            toast.show('Escriba el valor del abono/Insira o valor da assinatura', {
                duration: 3000,
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

        setVisible(true);
        uploadComprobante(file, valorpgo, tipoup)
             .then(resp => {
                 console.log(resp);
                 const response = JSON.parse(resp);
               if (response.success === true) {
                    setValorpgo(0);
                    setValinicioD(false);
                    setVisible(false);
                    setVisibleOk(true);
                    setTipoup(0);
                    navigation.navigate('Inicio');
               }
         }).catch((e) => {
                console.log(e);
                setValinicioD(false);
                setVisible(false);
               Alert.alert('catch' + e);
             });
    };

    return (<>
        <View style={globalStyles.contenedor}>
            <View style={globalStyles.card}>
                    <Text style={globalStyles.logoCabecera}>
                        <Image size={100} source={require('../assets/avtarcliticket.webp')}/>
                    </Text>
                   <Text style={globalStyles.titulocard}>
                        {'Saldo R$'}{datoscredito[0]?.valorempre}
                    </Text>
                    <Texto variant="titleSmall" style={globalStyles.subtitulo}>
                        Cuota: {'R$'}{datoscredito[0]?.valorparcela}
                    </Texto>
            </View>
             <View style={{flex: 0}}>
                <View style={styles.row}>
                    <View style={styles.left}>
                        <TextInput
                        keyboardType="numerit"
                        mode="outlined"
                        label="Valor Abono"
                        onChangeText={valor => setValorpgo(valor)}
                        value={valorpgo}
                        left={<TextInput.Affix text="$" />}
                        right={<TextInput.Affix
                            text={currencyFormat(valorpgo)}
                            onChangeText={text => text}/>
                            }
                        />
                    </View>
                    <View style={styles.right}>
                            <IconButton
                                    icon="image"
                                    mode="contained"
                                    size={40}
                                    onPress={_onValueChange}
                                    style={styles.customRadius}
                                />
                    </View>
               </View>
             </View>
             <Divider />
              <View style={{flex: 3}}>
                    <View style={styles.cardfoto}>
                      <ScrollView>
                            <View  onPress={() => _onValueChange()}
                            style={tempUri ? styles.fotodoc : styles.foto}>
                            {tempUri ? (
                                    <Image
                                        source={{ uri: tempUri }}
                                        style={globalStyles.fileCprob}
                                        onValueChange={_onValueChange}
                                    />
                                ) : (
                                    <View>
                                    <Image  style={globalStyles.fileImg} source={require('../assets/Imagen_ticket.jpg')} />
                                    </View>
                                )
                                }
                            </View>
                        </ScrollView>
                    </View>
              </View>
               <View style={{flex: 0}}>
                 <Text style={styles.containerbtn}>
                    <Button
                        style={globalStyles.boton}
                        contentStyle={styles.flexReverse}
                        icon="send"
                        mode="contained"
                        onPress={() => handleSubmit()}
                        > {inicioD === false ? 'ENVIAR COMPROBANTE PIX' : 'ENVIANDO...'}
                    </Button>
                </Text>
               </View>
            {/* container o contenido */}
         </View>
          <DialogoEnv
          visible={visible}
          setVisible={setVisible}
          />
           <DialogoOk
            visibleOk={visibleOk}
            setVisibleOk={setVisibleOk}
          />
    </>);
};

const styles = StyleSheet.create({
    segmento: {
        flex: 0,
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 5,
        width: '95%',
        backgroundColor: '#FFFFFF',
    },
    formularioinput: {
        flex: 0,
        marginTop: 5,
        width: '100%',
        marginHorizontal: '5%',
        backgroundColor: '#FFFFFF',
        marginBottom: 5,
    },
    cardfoto: {
        marginHorizontal: 1,
        marginVertical: 1,
    },
    foto: {
        width: '100%',
        height: '100%',
        marginHorizontal: 15,
        marginVertical: 15,
    },
    fotodoc: {
        width: '100%',
        height: '100%',
        marginHorizontal: 1,
        marginVertical: 1,
    },
    containerbtn: {
        flex: 0,
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    flexReverse: {
        flexDirection: 'row-reverse',
      },
    img: {
        //flex: 1,
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        backgroundColor: '#0c1b5a',
    },
    textInputOutlineStyle: {
        colors: {
            placeholder: 'black',
            primary: 'black',
            borderColor: 'black',
        },
    },
    customRadius: {
        color:'#FFFFFF',
        height: 50,
        marginTop:5,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
      },
    row: {
        margin: 8,
        justifyContent: 'space-between',
        flexDirection: 'row',
      },
    left: {
        width: '84%',
      },
    right: {
        marginTop:1,
        marginLeft:5,
        width: '15%',
      },
});

export default Comprobantes;
