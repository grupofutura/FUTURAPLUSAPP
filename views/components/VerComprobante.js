/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import {
  Button,
  Portal,
  Dialog,
  MD2Colors,
  useTheme,
  MD3Colors,
} from 'react-native-paper';
import globalStyles from '../../styles/global';
const VerComprobante = ({ visibleC, setVisibleC}) => {
      const [tempUri, setTempUri] = useState('');
    const close = () => setVisibleC(false);
    const { isV3 } = useTheme();

        useEffect(() => {
          setTempUri('https://storage.googleapis.com/futuraproapp.firebasestorage.app/abonos/1748700550591.png?GoogleAccessId=631353695283-compute%40developer.gserviceaccount.com&Expires=1780236550&Signature=ZudtNs24JRcjDSq3aq%2FDxBd6Iccnr9drA4NbuY5Tb67ZY3kStWF2rzirtUM3R5bT432mStXZThqwnTghe3In%2BRPzmDMnTcNvQ7UlmvhI8jMVKuQGDmrv9z8YpAbYUdjMqDP1Kv2ACFP1WUuXLfba6C3Omx3t7%2FivFzYf2crpsFFvzMnhOaUdYpwavv%2B9r%2FYc6TnE4kUXxPoO0G%2FykVanq0riY%2FAfTMioO%2BC97Q34%2BGUM7DgaMdZVNwQ5OyqVQIxvoJm3Z92a%2F15CRNnNkRL2K7BDGnyVJrRScRG71hL8RuTR8cPQY9vVHAFe6ogRbEovUmPaP1OvlLU%2F66Cf%2BJ48cQ%3D%3D');
         }, []);
         //console.log(tempUri);
    return(
      <Portal>
      <Dialog visible={visibleC} onDismiss={true}>
      <Dialog.Title
           style={{ color: isV3 ? MD3Colors.tertiary30 : MD2Colors.indigo500}}>
            Comprobante Pago
            </Dialog.Title>
        <Dialog.Content style={styles.container}>
          <ScrollView>
          <View style={tempUri ? styles.fotodoc : styles.foto}>
                            {tempUri ? (
                                    <Image
                                        source={{ uri: tempUri }}
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
           Aceptar
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
