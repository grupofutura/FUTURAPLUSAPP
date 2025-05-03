/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, FlatList, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Text as Texto,
  Divider,
  Button,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';
import ListarPagos from './components/ListarPagos';
import ListarCredito from './components/ListarCredito';
import { getMisCuotas } from '../hooks';
import globalStyles from '../styles/global';

const Inicio = () => {
 // const [IdCli, setIdCli] = useState(0);
 // const [IdPres, setIdPres] = useState(0);
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubTitulo] = useState('');
  const [creditos, setCredito] = useState([]);
  const [pagoscliall, setPagoscliall] = useState([]);
  const [cargando, setCargando] = useState(false);
  //const [netInfo, setNetInfo] = useState({});

 const navigation = useNavigation();

  useEffect(() => {
    const _retrieveDataClie = async () => {
      const cliente = JSON.parse(await AsyncStorage.getItem('dataCliente'));
      //console.log(cliente);
      const nombres = cliente[0].nombre_cliente;
      //setIdCli(cliente[0].id);
      setTitulo(nombres.toUpperCase());
      setSubTitulo(cliente[0].cpf);
    };
    _retrieveDataClie();

  }, []);

  useEffect(() => {
    const _retrieveDataCreditos = async () => {
      const Prestamos = JSON.parse(await AsyncStorage.getItem('dataPrestamos'));
      //console.log(Prestamos);
      //setIdPres(Prestamos[0].id);
      setCredito(Prestamos);
      _onValueChange(Prestamos[0].id);
    };
    _retrieveDataCreditos();
  }, []);

  const _onValueChange = (IdP) => {
    setCargando(true);
    getMisCuotas(IdP)
          .then(pagosAll => {
            setPagoscliall(pagosAll);
            setCargando(false);
          });
  };

  return (<>
   <View style={globalStyles.contenedor}>
         <View style={globalStyles.card}>
            <Text style={globalStyles.logoCabecera}>
                        <Image size={50} source={require('../assets/avatarClipago.webp')}/>
                    </Text>
              <Text style={globalStyles.titulocard}>
                  {titulo}
              </Text>
              <Texto variant="titleSmall" style={globalStyles.subtitulo}>
                CPF: {subtitulo}
                </Texto>
         </View>
        <View style={styles.chits}>
              <Texto>{
                  creditos.length > 0 && <ListarCredito data={creditos} onValueChange={_onValueChange}/>
                  };
              </Texto>
         </View>
         <Divider />
         <View style={{flex: 3}}>
         <View style={styles.cardlist}>
                <ScrollView style={{width:'100%'}}>
                 <View style={{ paddingBottom:0 }}>
                  {cargando === true
                    ? <View style={styles.loading}>
                      <ActivityIndicator animating={true} color={MD2Colors.blue500} size={80} />
                      </View>
                    : <FlatList
                      style={{ width: '100%'}}
                      nestedScrollEnabled={true}
                      scrollEnabled={false}
                      data={pagoscliall.abonos}
                      renderItem={({ item }) => <ListarPagos data={item} />}
                      ItemSeparatorComponent={Divider}
                      keyExtractor={item => item.id}
                  />}
                  </View>
                  </ScrollView>
              </View>
         </View>
         <View style={{flex: 0}}>
              <View style={styles.containerbtn}>
                      <Button
                      key={20000}
                        style={globalStyles.boton}
                        mode="contained"
                        onPress={() => navigation.navigate('Comprobantes', { creditos })}
                      >
                        {'Reportar Pix Equilíbrio/Saldo: R$'}{creditos[0]?.valorempre}
                      </Button>
                </View>
          </View>
         <Divider />
         {/* termina contenedor */}
    </View>
    </>);
};
const styles = StyleSheet.create({
  chits: {
    flex: 0,
    marginBottom: 5,
    height:50,
    flexDirection: 'row',
    width: '100%',
  },
  cardlist: {
    flex: 1,
    width: '100%',
    height:300,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
    marginBottom: 5,
},
  loading: {
    width: '100%',
    height: '100%',
    marginHorizontal: 10,
    marginVertical: 50,
  },
  containerbtn: {
    flex: 0,
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },
});
export default Inicio;
