/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {View,Text, StyleSheet} from 'react-native';
import {Text as Texto, Button, IconButton} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import VistaComprobante from '../components/VerComprobante';
//import { getCuotaDetalles } from '../../hooks';
import { currencyFormat, formatFecha } from '../components/helper';
import globalStyles from '../../styles/global';

const ListarPagos = ({ data }) => {
const [visibleC, setVisibleC] = useState(false);
const [imageUrl, setImageUrl] = useState('');
const navigation = useNavigation();
  const _onValueChangeComp = (url) => {
      setImageUrl(url);
      setVisibleC(true);
  };
   return(<>
        <View style={{ width: '100%', marginTop: 15, marginBottom: 5 }}>
       <Text
         key={'pgo' + data.id.toString()}
         variant="headlineMedium"
         style={globalStyles.enlace}>{`Parcela/Abono: R${currencyFormat(data.valor)}`}
       </Text>
       <View style={styles.row}>
         <View style={styles.left}>
           <Text variant="titleSmall">Saldo pendiente:</Text>
           <Texto
             variant="titleSmall"
             key={'saldo' + data.id.toString()}>
            R{currencyFormat(data.saldo)}
           </Texto>
         </View>
         <View style={styles.right}>
           <Text variant="titleSmall">Fecha del pago</Text>
           <Texto
             variant="titleSmall"
             key={'fecha' + data.id.toString()}>
             {formatFecha(data.data)}
           </Texto>
         </View>
       </View>
       <View style={styles.row}>
         <View style={styles.leftbtn}>
           <Texto style={{ width: '100%', marginBottom: 10 }}>
             <Button
               style={{ width: '100%' }}
               mode="contained"
               key={'data' + data.id.toString()}
               onPress={() => navigation.navigate('DetallesPgo', { data })}
             >Detalle del Pago</Button>
           </Texto>
         </View>
         <View style={styles.rightbtn}>
           <Texto style={{ width: '100%', marginTop: -3 }}>
             <IconButton
               icon="document"
               mode="contained"
               onPress={() => _onValueChangeComp(data.imageUrl)}
               size={30} />
           </Texto>
         </View>
       </View>
       <VistaComprobante
         visibleC={visibleC}
         setVisibleC={setVisibleC}
         comprobante={imageUrl}
         />
     </View>
    </>);
};
const styles = StyleSheet.create({
    row: {
        margin: 8,
        justifyContent: 'space-between',
        flexDirection: 'row',
      },
      left: {
        width: '50%',
      },
      right: {
        textAlign: 'right',
        width: '50%',
      },
      leftbtn: {
        width: '80%',
      },
     rightbtn: {
        width: '15%',
      },
  });
export default ListarPagos;
