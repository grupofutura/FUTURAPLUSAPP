/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import {Text as Texto, Button, IconButton} from 'react-native-paper';
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
       <View style={styles.row}>
          <View style={styles.leftbtn}>
            <Texto style={{width:'100%',marginBottom:10}}>
                <Button
                style={{width:'100%'}}
                mode="contained"
                key={'data' + data.id.toString()}
                onPress={() => navigation.navigate('DetallesPgo',{data})}
                >Detalle del Pago</Button>
              </Texto>
        </View>
        <View style={styles.rightbtn}>
        <Texto style={{width:'100%',marginTop:-3}}>
                                   <IconButton
                                    icon="document"
                                    mode="contained"
                                    size={30}
                                    //onPress={_onValueChange}
                                    //style={styles.customRadius}
                                />
              </Texto>
          </View>
       </View>
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
      customRadius: {
        color:'#FFFFFF',
        height: 50,
        marginTop:5,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
      },
      leftbtn: {
        width: '80%',
      },
     rightbtn: {
        width: '15%',
      },
  });
export default ListarPagos;
