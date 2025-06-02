
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView,StyleSheet, Text, View, Image } from 'react-native';
import { getCuotaDetalles } from '../hooks';
import { currencyFormat, formatFecha } from './components/helper';
import { Divider, ActivityIndicator,MD2Colors } from 'react-native-paper';
//import ProfileSkelton from './components/PreloadSkpl';
import globalStyles from '../styles/global';

const DetallePagos = ({route}) => {
  const { data } = route.params;
  const [datosCli, setDatosCli] = useState([0]);
  const [datoPagos, setDatoPagos] = useState({});
  const [cargando, setCargando] = useState(false);


  useEffect(() => {
    const _retrieveDataClie = async () => {
      const cliente = JSON.parse(await AsyncStorage.getItem('dataCliente'));
      setDatosCli(cliente);
    };
    _retrieveDataClie();

  }, []);

  useEffect(() => {
    setCargando(true);
    getCuotaDetalles(data.id)
              .then(pagosdetalle => {
                console.log(pagosdetalle);
                setDatoPagos(pagosdetalle);
                setCargando(false);
              });
  }, [data]);

  //const Dabono = JSON.parse(datoPagos.abono);
  //console.log(datoPagos?.abono?.data);
    return (<>
     <View style={globalStyles.contenedor}>
        <ScrollView>
            <View style={globalStyles.card}>
                    <Text style={globalStyles.logoCabecera}>
                        <Image size={100} source={require('../assets/Imgticket.webp')}/>
                    </Text>
               </View>
            <View>
              <View style={styles.header}>
                    <Text style={globalStyles.titulocard}>
                    <Text style={styles.subtitulo_s} variant="labelMedium">{'R$'}</Text>
                    <Text style={styles.titulo_s} variant="titleLarge">{datoPagos?.abono?.valor ?? 0}</Text>
                    <Text style={styles.titulo_h} variant="labelMedium">
                      {datoPagos?.vlrcuota_format} </Text>
                    </Text>
                    <Text variant="titleSmall" style={[globalStyles.subtitulo,styles.subtitulo]} />
                  </View>
                  {cargando === true
                  ?
                  // <ProfileSkelton />
                   <View>
                     <Image  style={globalStyles.filestak} source={require('../assets/layout_change.gif')} />
                     {/* <ActivityIndicator animating={true} color={MD2Colors.blue500} size={80} /> */}
                  </View>
                  : <>
                    <View style={[styles.body, styles.row]}>
                      <Text style={[styles.detail,styles.left]}>Cliente: </Text>
                      <Text style={[styles.detail, styles.right]}>{datosCli[0].nombre_cliente}</Text>
                       <Divider style={{borderColor: 'blue',borderWidth:0.5}}/>
                    </View>
                    <View style={[styles.body, styles.row]}>
                      <Text style={[styles.detail,styles.left]}>Telefono: </Text>
                      <Text style={[styles.detail, styles.right]}>{datosCli[0].tele1 ?? 0}</Text>
                    </View>
                    <Divider  style={{borderColor: 'blue',borderWidth:0.5}}/>
                    <View style={[styles.body, styles.row]}>
                      <Text style={[styles.detail,styles.left]}>Data/Fecha pagamento: </Text>
                      <Text style={[styles.detail, styles.right]}>{formatFecha(data?.data)}</Text>
                    </View>
                    <Divider  style={{borderColor: 'blue',borderWidth:0.5}}/>
                    <View style={[styles.body, styles.row]}>
                      <Text style={[styles.detail,styles.left]}>Parcelas Pagadas: </Text>
                      <Text style={[styles.detail, styles.right]}>{datoPagos?.prestamo?.parcelas  ?? 0}</Text>
                    </View>
                    <Divider  style={{borderColor: 'blue',borderWidth:0.5}}/>
                    <View style={[styles.body, styles.row]}>
                      <Text style={[styles.detail,styles.left]}>Parcelas Faltantes: </Text>
                      <Text style={[styles.detail, styles.right]}>{datoPagos?.prestamo?.parcelas ?? 0}</Text>
                    </View>
                    <Divider  style={{borderColor: 'blue',borderWidth:0.5}}/>
                    <View style={[styles.body, styles.row]}>
                      <Text style={[styles.detail,styles.left]}>Parcelas Pactadas: </Text>
                      <Text style={[styles.detail, styles.right]}>{datoPagos?.prestamo?.cuotas ?? 0}</Text>
                    </View>
                    <Divider  style={{borderColor: 'blue',borderWidth:0.5}}/>
                    <View style={[styles.body, styles.row]}>
                      <Text style={[styles.detail,styles.left]}>Gestor de Cobro: </Text>
                      <Text style={[styles.detail, styles.right]}>{datoPagos?.prestamo?.nome_funcionario}</Text>
                    </View>
                    <Divider  style={{borderColor: 'blue',borderWidth:1}}/>
                    <View style={styles.row}>
                      <Text style={[styles.price, styles.left]}>Saldo pendiente:</Text>
                      <Text style={[styles.price, styles.right]}>
                      <Text style={styles.subtitulo_s} variant="labelMedium">{'R'}</Text>
                      <Text style={styles.titulo_s} variant="titleLarge">{currencyFormat(datoPagos?.abono?.saldo) ?? 0}</Text>
                        </Text>
                      </View>
                    </>}
            </View>
         </ScrollView>
       </View>
     </>);
};
const styles = StyleSheet.create({
    row: {
      margin: 2,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    left: {
      width: '60%',
    },
    right: {
      textAlign: 'right',
      width: '40%',
    },
    buttonseg: {
      backgroundColor: '#0c1b5a',
    },
    header: {
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    body: {
      marginBottom: 10,
    },
    detail: {
      fontSize: 16,
    },
    footer: {
      alignItems: 'flex-end',
    },
    price: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    titulo: {
      textAlign: 'center',
      fontSize: 25,
      color: 'red',
    },
    titulo_h: {
      textAlign: 'center',
      fontSize: 40,
    },
    subtitulo: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: -5,
    },
    titulo_s: {
      textAlign: 'center',
      fontSize: 25,
      color: 'red',
    },
    subtitulo_h: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    subtitulo_s: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'red',
    },
  });
  export default DetallePagos;
