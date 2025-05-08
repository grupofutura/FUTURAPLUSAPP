import { ActivityIndicator, Platform, View, StyleSheet } from 'react-native';
import {
  Button,
  Text,
  Paragraph,
  Dialog,
  Portal,
  useTheme,
  MD3Colors,
  MD2Colors,
} from 'react-native-paper';

export const DialogoEnv = ({visible, setVisible}) => {
  const hideDialog = () => setVisible(false);
  const isIOS = Platform.OS === 'ios';
  const { isV3 } = useTheme();
  return (
    <Portal>
    <Dialog onDismiss={hideDialog} visible={visible}>
      <Dialog.Title>Envio Comprobante</Dialog.Title>
      <Dialog.Content>
        <View style={styles.flexing}>
          <ActivityIndicator
            color={isV3 ? MD3Colors.tertiary30 : MD2Colors.indigo500}
            size={isIOS ? 'large' : 48}
            style={styles.marginRight}
          />
          <Text>Validando Comprobante Pix</Text>
        </View>
      </Dialog.Content>
    </Dialog>
  </Portal>
  );
};
export const DialogoOk = ({visibleOk, setVisibleOk}) => {
  const hideDialog = () => setVisibleOk(false);
  return (
    <Portal>
    <Dialog onDismiss={hideDialog} visible={visibleOk}>
      <Dialog.Title>Comprobante</Dialog.Title>
      <Dialog.Content>
        <View style={styles.flexing}>
        <Text variant="bodyMedium">El comprobante fue enviado Correctamente/O recibo foi enviado corretamente</Text>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
              <Button onPress={hideDialog}>Ok</Button>
            </Dialog.Actions>
    </Dialog>
  </Portal>
  );
};
const styles = StyleSheet.create({
  flexing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 16,
  },
});