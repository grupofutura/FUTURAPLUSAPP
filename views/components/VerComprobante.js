/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import {
  Button,
  Portal,
  Dialog,
  MD2Colors,
  useTheme,
  MD3Colors,
} from 'react-native-paper';
import globalStyles from '../../styles/global';
const VerComprobante = ({ visibleC, setVisibleC, comprobante}) => {
    const close = () => setVisibleC(false);
    const { isV3 } = useTheme();
    return(
      <Portal>
      <Dialog visible={visibleC} onDismiss={true}>
      <Dialog.Title
           style={{ color: isV3 ? MD3Colors.tertiary30 : MD2Colors.indigo500}}>
            Comprobante Pago
            </Dialog.Title>
        <Dialog.Content style={styles.container}>
          <ScrollView>
          <View style={comprobante ? styles.fotodoc : styles.foto}>
                            {comprobante ? (
                                    <Image
                                        source={{ uri: comprobante }}
                                        style={globalStyles.fileCprob}
                                    />
                                ) : (
                                    <Image  style={globalStyles.comprobanteImg} source={require('../../assets/comprobante.png')} />
                                )
                                }
                            </View>
          </ScrollView>
        </Dialog.Content>
          <Dialog.Actions>
            <Button
              color={isV3 ? MD3Colors.primary95 : MD2Colors.white}
             onPress={close}
           >
           Cerrar
            </Button>
         </Dialog.Actions>
      </Dialog>
    </Portal>
    );
 };

const styles = StyleSheet.create({
  container: {
    maxHeight: 500,
    paddingHorizontal: 10,
    paddingVertical:-10,
  },
  cardfoto: {
    marginHorizontal: 1,
    marginVertical: 1,
},
foto: {
  width: '100%',
  height: '100%',
  marginHorizontal: 1,
  marginVertical: 1,
},
fotodoc: {
  width: '100%',
  height: '100%',
  marginHorizontal: 1,
  marginVertical: 1,
},
 });
 export default VerComprobante;
