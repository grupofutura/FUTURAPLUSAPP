/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, FlatList, ScrollView,SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Text as Texto,
  SegmentedButtons,
  Divider,
  Button,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';
import ListarPagos from './components/ListarPagos';
import PagosPendientes from './components/PagosPendientes';
import ListarCredito from './components/ListarCredito';
import { getMisCuotas, getMisPagos } from '../hooks';
import { currencyFormat } from './components/helper';
import globalStyles from '../styles/global';

const themeMock = {
  colors: {
    onSurface: '#3700B3',
    secondaryContainer: '#3700B3',
    onSecondaryContainer: '#FFFFFF',
  },
};

const Inicio = () => {
  const [value, setValue] = useState(1);
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubTitulo] = useState('');
  const [creditos, setCreditos] = useState([]);
  const [credito, setCredito] = useState([]);
  const [pagoscliall, setPagoscliall] = useState([]);
  const [pagosComp, setPagosComp] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [idCliente, setIdCliente] = useState(1);
  const [idPre, setIdPre] = useState({});
  const [stado, setStado] = useState('Cargado');

 const navigation = useNavigation();

  useEffect(() => {
    const _retrieveDataClie = async () => {
      const cliente = JSON.parse(await AsyncStorage.getItem('dataCliente'));
       setIdCliente(cliente[0].id);
      const nombres = cliente[0].nombre_cliente;
      setTitulo(nombres.toUpperCase());
      setSubTitulo(cliente[0].cpf);
    };
    _retrieveDataClie();
  }, []);

  useEffect(() => {
    const _retrieveDataCreditos = async () => {
      const Prestamos = JSON.parse(await AsyncStorage.getItem('dataPrestamos'));
     // console.log(Prestamos)
       setCreditos(Prestamos);
       setIdPre(Prestamos[0].id);
      _onValueChange(Prestamos[0].id);
    };
    _retrieveDataCreditos();
  }, []);

  const handleMipagos = () => {
      getMisPagos(idCliente,stado)
          .then(pagos => {
            setPagosComp(pagos);
          });
    };

  useEffect(() => {
    handleMipagos(idCliente,stado);
  }, [idCliente,stado]);


  useEffect(() => {
         setCredito(creditos.filter(x => x.id === idPre));
  }, [creditos,idPre]);

  const _onValueChange = (IdP) => {
    setCredito(creditos.filter(x => x.id === IdP));
    setCargando(true);
    getMisCuotas(IdP)
          .then(pagosAll => {
            setPagoscliall(pagosAll);
            setCargando(false);
          });
  };

  useEffect(() => {
     const _retrieveDataCredito = async () => {
         await AsyncStorage.setItem('dataCredito', JSON.stringify(pagoscliall.prestamo));
     };
   _retrieveDataCredito();
  }, [pagoscliall]);

  const _onValueChangeTab = (val) => {
    if(val === 2){
      setStado('Cargado');
       setValue(val);
    }else if(val === 3){
       setStado('Rechazado');
       setValue(val);
    }else{
       setStado('Cargado');
       setValue(val);
    }
  };

  //console.log(value)

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
         { creditos.length > 1 &&
        <View style={styles.chits}>
              <Texto>{
                  creditos.length > 1 && <ListarCredito data={creditos} onValueChange={_onValueChange}/>
                  };
              </Texto>
         </View>}
         <Divider />
         <View style={{flex: 3}}>
            <SafeAreaView style={styles.segmento}>
            <SegmentedButtons
              value={value}
              onValueChange={_onValueChangeTab}
              theme={themeMock}
              buttons={[
                {
                  value: 1,
                  label: 'MIS ABONOS',
                   icon: 'cash-outline',
                   style: styles.button,
                },
                {
                  value: 2,
                  label: 'PENDIENTES',
                  icon: 'alarm-outline',
                  style: styles.button,
                },
                {
                  value: 3,
                  label: 'RECHAZADOS',
                  icon: 'backspace-outline',
                  style: styles.button,
                },
              ]} />
          </SafeAreaView>
          <Divider />
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
                      data={value === 1 ? pagoscliall.abonos : pagosComp.abonos}
                      renderItem={value === 1
                      ? ({ item }) => <ListarPagos data={item} />
                      : ({ item }) => <PagosPendientes data={item} handleMipagos={handleMipagos} />
                      }
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
                        onPress={() => navigation.navigate('Comprobantes', { credito })}
                      >
                        {'Reportar Pix Equilíbrio/Saldo: R'}{currencyFormat(
                          credito[0]?.valorempre ? credito[0]?.valorempre : 0
                          )}
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
  button: {
    flex: 1,
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
  segmento: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
});
export default Inicio;
