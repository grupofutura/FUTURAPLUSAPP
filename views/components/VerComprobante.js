import * as React from 'react';
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
    const close = () => setVisibleC(false);
    const { isV3 } = useTheme();
    return(
      <Portal>
        <Dialog
          onDismiss={close}
          visible={visibleC}
          //style={{ height: '80%'}}
        >
          <Dialog.Title
            style={{ color: isV3 ? MD3Colors.tertiary30 : MD2Colors.indigo500 }}
          >
            Vista Previa Comprobante
          </Dialog.Title>
          <Dialog.Content>
          <View style={styles.cardcomprobante}>
                      <ScrollView>
                            <View
                            style={'tempUri' ? styles.fotodoc : styles.foto}>
                            {false ? (
                                    <Image
                                        source={{ uri: 'tempUri' }}
                                        style={globalStyles.fileCprob}
                                       // onValueChange={_onValueChange}
                                    />
                                ) : (
                                    <View>
                                    <Image  style={globalStyles.fileImg} source={require('../../assets/Imagen_ticket.jpg')} />
                                    </View>
                                )
                                }
                            </View>
                        </ScrollView>
                    </View>
           </Dialog.Content>
          <Dialog.Actions>
            <Button
              color={isV3 ? MD3Colors.primary95 : MD2Colors.white}
              onPress={close}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
 };
 const styles = StyleSheet.create({
  cardfoto: {
    marginHorizontal: 1,
    marginVertical: 1,
},
 });
 export default VerComprobante;
