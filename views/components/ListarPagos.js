/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import {Text as Texto, Divider, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../../styles/global';
const ListarPagos = ({ data }) => {
  // Hook para redireccionar
 // console.log(data.id);
    const navigation = useNavigation();
   return(
        <View style={{  width: '100%', marginTop: 15, marginBottom:5}}>
        <Text
        key={'pgo' + data.id.toString()}
          variant="headlineMedium"
          style={globalStyles.enlace}>{`Parcela/Abono: $${data.valor}`}
        </Text>
       <View style={styles.row}>
      <View style={styles.left}>
             <Text variant="titleSmall">Saldo pendiente:</Text>
             <Texto
               variant="titleSmall"
               key={'saldo' + data.id.toString()}>
               ${100}
               </Texto>
           </View>
           <View style={styles.right}>
             <Text variant="titleSmall">Fecha del pago</Text>
             <Texto
               variant="titleSmall"
               key={'fecha' + data.id.toString()}>
               {data.data.toString()}
               </Texto>
           </View>
       </View>
    <View>
      <Texto style={{width:'100%',marginBottom:10}}>
       <Button
        style={{width:'100%'}}
          mode="contained"
         key={'data' + data.id.toString()}
         onPress={() => navigation.navigate('DetallesPgo',{data})}
        >Detalle del Pago</Button>
      </Texto>
    </View>
    <Divider />
</View>);
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
  });
export default ListarPagos;
