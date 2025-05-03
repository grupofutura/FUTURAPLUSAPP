/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { Text,Pressable } from 'react-native';
import {DefaultTheme, MD3Colors, Icon} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Login from '../views/Login';
import Comprobantes from '../views/Comprobantes';
import Inicio from '../views/Inicio';
import DetallePagos from '../views/DetallePagos';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0c1b5a',
    accent: '#0655BF',
  },
};

const StackNavigator = () => {
      const navigation = useNavigation();
    return (
        <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.surface,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Iniciar Sesión',
            headerShown: false,
          }}
        />
       <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{
            title: 'FuturaPlus',
            headerTitleAlign:'center',
            headerLeft:()=>(
              <Pressable onPress={()=> navigation.navigate('Login')}>
                <Text style={{color:'#fff',fontSize:24,marginLeft:10}}>
                   <Icon
                      source="power-outline"
                      color={MD3Colors.secondary90}
                      size={35}
                    />
                  </Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
                name="Comprobantes"
                component={Comprobantes}
                options={{
                  title: 'Comprobante Pago Pix',
                }}
              />
            <Stack.Screen
                name="DetallesPgo"
                component={DetallePagos}
                options={{
                  title: 'Detalles Parcela/Abono',
                }}
              />
      </Stack.Navigator>
    );
};
export default StackNavigator;
