import { Platform } from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const posLogin = async (Objdata) => {
  const objdata = JSON.parse(JSON.stringify(Objdata));
    try {
        const { data } = await axios.post('https://logincliente-niyi2iph7a-uc.a.run.app', {
          cpf: objdata.documento,
        });
        return data;
    } catch (error) {
        console.error(error);
      return error;
    }
};

export const getCuotaDetalles = async (Idabono) => {
  try {
    const { data } = await axios.post('https://obtenerabonoporid-niyi2iph7a-uc.a.run.app', {
      idAbono: Idabono,
    });
     return data;
  } catch (error) {
    console.error(error);
  }
};
//
export const getMisCuotas = async (IdP) => {
  try {
   const { data } = await axios.post('https://obtenerabonospretamos-niyi2iph7a-uc.a.run.app', {
    idPrestamo: IdP,
  });
  return data;
  } catch (error) {
    console.error(error);
  }
};

export const uploadComprobante = async (file, valorpgo,TipoUP) => {
  const DataEnvio = JSON.parse(await AsyncStorage.getItem('dataPrestamos'));
 if(Number(TipoUP) === 0){
    if(!file || !file.assets || !file.assets[0]){
     console.log('archivo invalido');
     console.log(file);
     return;
  }
 }else{
  if(!file){
    console.log('archivo invalido');
    console.log(file);
    return;
 }
 }
 //console.log(file);
 const URI  = Number(TipoUP) === 0 ? file.assets[0].uri : 'file://' + file[0].filePath;
 const TYPE = Number(TipoUP) === 0 ? file.assets[0].type : file[0].mimeType;
 const NAME = Number(TipoUP) === 0 ? file.assets[0].fileName : file[0].fileName;

 const fileToUpload = {
   uri: Platform.OS === 'ios' ? URI.replace('file://', '') : URI,
   type: TYPE || 'image/*',
   name:  NAME || 'upload.jpg',
 };

  const formData = new FormData();
  formData.append('idFuncionario', DataEnvio[0].idfun);
  formData.append('idPrestamo', DataEnvio[0].id);
  formData.append('file', fileToUpload);
  formData.append('valor', valorpgo);

   try {
     const response = await fetch('https://subirabonos-niyi2iph7a-uc.a.run.app', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         // No definas 'Content-Type'
       },
       body: formData,
     });

     if (!response.ok) {
       const errorText = await response.text();
       console.log(errorText);
       //throw new Error(⁠ Error ${response.status}: ${errorText} ⁠);
     }

     const result = await response.text(); // o .json() si aplica
     return result;

   } catch (error) {
     console.error('Upload error:', error.message);
     return error.message;
  }
};


