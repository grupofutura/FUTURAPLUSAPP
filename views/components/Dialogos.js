import { ActivityIndicator, Platform, View, StyleSheet } from 'react-native';
import {
  Button,
  Text,
  Dialog,
  Portal,
  useTheme,
  MD3Colors,
  MD2Colors,
} from 'react-native-paper';

export const DialogoEnv = ({visible, setVisible, msg}) => {
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
          <Text>{msg}</Text>
        </View>
      </Dialog.Content>
    </Dialog>
  </Portal>
  );
};
export const DialogoValEnv = ({visibleEnv, setVisibleEnv,valorparcela, handleSubmit}) => {
  const hideDialog = () => setVisibleEnv(false);
  return (<Portal>
        <Dialog onDismiss={hideDialog} visible={visibleEnv}>
        <Dialog.Icon icon="alert-circle-outline" />
        <Dialog.Title style={styles.title}>Enviar Comprobante</Dialog.Title>
        <Dialog.Content>
          <Text>
            Esta seguro que desea enviar este comprobante con valor $R{valorparcela} ?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} color={MD3Colors.error50}>
            Cancelar
          </Button>
          <Button onPress={handleSubmit}>Aceptar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>);
};
export const DialogoEli = ({visibleE, setVisibleE, handleEliChange}) => {
  const hideDialog = () => setVisibleE(false);
  //const isIOS = Platform.OS === 'ios';
  //const { isV3 } = useTheme();
  return (<Portal>
        <Dialog onDismiss={hideDialog} visible={visibleE}>
        <Dialog.Icon icon="alert-circle-outline" />
        <Dialog.Title style={styles.title}>Eliminar Comprobante</Dialog.Title>
        <Dialog.Content>
          <Text>
            Esta seguro que desea eliminar este comprobante?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} color={MD3Colors.error50}>
            Cancelar
          </Button>
          <Button onPress={handleEliChange}>Aceptar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>);
};
export const DialogoOk = ({visibleOk, setVisibleOk}) => {
  const hideDialog = () => setVisibleOk(false);
  return (
    <Portal>
    <Dialog onDismiss={hideDialog} visible={visibleOk}>
      <Dialog.Title>Comprobante</Dialog.Title>
      <Dialog.Content>
        <View style={styles.flexing}>
        <Text variant="bodyMedium"hideDialog>El comprobante fue enviado Correctamente/O recibo foi enviado corretamente</Text>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
              <Button onPress={hideDialog}>Ok</Button>
            </Dialog.Actions>
    </Dialog>
  </Portal>
  );
};

export const DialogoEliOk = ({visibleliOk, setVisibleliOk, onValueEliCompOk}) => {
  const hideDialog = () => {
       onValueEliCompOk();
       setVisibleliOk(false);
  };
  return (
    <Portal>
    <Dialog onDismiss={hideDialog} visible={visibleliOk}>
      <Dialog.Title>Comprobante</Dialog.Title>
      <Dialog.Content>
        <View style={styles.flexing}>
        <Text variant="bodyMedium"hideDialog>El comprobante fue eliminado Correctamente/O recibo foi quitado corretamente</Text>
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
