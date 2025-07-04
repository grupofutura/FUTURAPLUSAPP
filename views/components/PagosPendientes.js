/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {View,Text, StyleSheet} from 'react-native';
import {Text as Texto, Button, IconButton} from 'react-native-paper';
import VistaComprobante from '../components/VerComprobante';
import { getEliComprobante } from '../../hooks';
import {DialogoEli, DialogoEliOk, DialogoEnv} from '../components/Dialogos';
import { currencyFormat, formatFecha,formateadaFecha } from '../components/helper';
import globalStyles from '../../styles/global';

const PagosPendientes = ({ data, handleMipagos }) => {
const [visible, setVisible] = useState(false);
const [visibleC, setVisibleC] = useState(false);
const [visibleE, setVisibleE] = useState(false);
 const [visibleliOk, setVisibleliOk] = useState(false);
const [imageUrl, setImageUrl] = useState('');
const [idFirebase, setIdFirebase] = useState('');

  const _onValueChangeComp = (url) => {
      setImageUrl(url);
      setVisibleC(true);
  };

  const _onValueEliComp = (idF) => {
      setIdFirebase(idF);
      setVisibleE(true);
  };

const handleEliChange = () => {
        setVisible(true);
         getEliComprobante(idFirebase)
                 .then(elicomp => {
                    setVisibleE(false);
                    setVisible(false);
                    setVisibleliOk(true);
                 });
      };

   return(<>
    <View style={{ width: '100%', marginTop: 15, marginBottom: 5 }}>
       <Text
         key={'pgo' + data.idFirebase}
         variant="headlineMedium"
         style={globalStyles.enlace}>{`Parcela/Abono: R${currencyFormat(data.valor)}`}
       </Text>
       <View style={styles.row}>
         <View style={styles.left}>
           <Text variant="titleSmall">Fecha del pago:</Text>
           <Texto
             variant="titleSmall"
             key={'saldo' + data.idFirebase}>
            {formatFecha(data.fechaAbono.split('T')[0])}
           </Texto>
         </View>
         <View style={styles.right}>
           <Text variant="titleSmall">Hora</Text>
           <Texto
             variant="titleSmall"
             key={'fecha' + data.idFirebase}>
             {formateadaFecha(data.fechaAbono)}
           </Texto>
         </View>
       </View>
       <View style={styles.row}>
         <View style={styles.leftbtn}>
           <Texto style={{ width: '100%', marginBottom: 10 }}>
             <Button
               style={{ width: '100%' }}
               mode="contained"
               key={'data' + data.idFirebase}
               onPress={() => _onValueChangeComp(data.imageUrl)}
             >Comprobante del Pago</Button>
           </Texto>
         </View>
         <View style={styles.rightbtn}>
           <Texto style={{ width: '100%', marginTop: -3 }}>
             <IconButton
               icon="trash-outline"
               mode="contained"
               onPress={() => _onValueEliComp(data.idFirebase)}
               size={30} />
           </Texto>
         </View>
       </View>
       <VistaComprobante
         visibleC={visibleC}
         setVisibleC={setVisibleC}
         comprobante={imageUrl}
         />
        <DialogoEli
         visibleE={visibleE}
         setVisibleE={setVisibleE}
         handleEliChange={handleEliChange}
         />
         <DialogoEnv
          visible={visible}
           setVisible={setVisible}
           msg = "Eliminando Comprobante Pix"
        />
          <DialogoEliOk
            visibleliOk={visibleliOk}
            setVisibleliOk={setVisibleliOk}
            onValueEliCompOk={handleMipagos}
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
        width: '80%',
      },
      right: {
        textAlign: 'right',
        width: '20%',
      },
      leftbtn: {
        width: '80%',
      },
     rightbtn: {
        width: '15%',
      },
  });
export default PagosPendientes;
