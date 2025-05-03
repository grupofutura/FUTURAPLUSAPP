/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View,ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {Chip } from 'react-native-paper';
const ListarCredito = ({ data,onValueChange }) => {
   return(
    <View>
             <SafeAreaView>
                  <ScrollView horizontal>
                  {data.map((item, index) => (
                    <View style={styles.row } key={index}>
                      <Chip
                        key={item.id}
                        onPress={() => onValueChange(item?.id)}
                        style={{ marginRight:6}}
                        icon="checkmark"
                      >
                      {'credito de Equilíbrio/Saldo: R$'}{item?.valorempre}
                      </Chip>
                    </View>))}
                  </ScrollView>
                </SafeAreaView>
       </View>)
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
export default ListarCredito;
