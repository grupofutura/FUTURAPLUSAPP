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

export const getCuotaHoy = async (Idabono) => {
  try {
    const { data } = await axios.post('https://obtenerabonoporid-niyi2iph7a-uc.a.run.app', {
      IdAbono: Idabono,
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

export const uploadComprobante = async (file, valorpgo) => {
  const DataEnvio = JSON.parse(await AsyncStorage.getItem('dataPrestamos'));
  if(!file || !file.assets || !file.assets[0]){
     console.log('archivo invalido');
     console.log(file);
     return;
  }

  const fileToUpload = {
    uri: Platform.OS === 'ios' ? file.assets[0].uri.replace('file://', '') : file.assets[0].uri,
    type: file.assets[0].type || 'image/jpeg',
    name: file.assets[0].fileName || 'upload.jpg',
  };

  const formData = new FormData();
  formData.append('idFuncionario', DataEnvio[0].id);
  formData.append('idPrestamo', DataEnvio[0].idfun);
  formData.append('file', fileToUpload);
  formData.append('valor', valorpgo);

  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ': ' + JSON.stringify(pair[1]));
  // }

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
    return null;
  }
};


// export const uploadComprobante = async (file,valorpgo) => {
//   const DataEnvio = JSON.parse(await AsyncStorage.getItem('dataPrestamos'));
//   const header = {
//     'Accept': 'application/json',
//     'Content-type': 'multipart/form-data',
//   };


//   console.log(valorpgo);

//   const fileToUpload = {
//     uri:  file.assets[0].uri,
//     type: file.assets[0].type,
//     name: file.assets[0].fileName,
//   };

//   console.log(fileToUpload);
//    const formData = new FormData();
//    formData.append('idFuncionario', DataEnvio[0].id);
//    formData.append('idPrestamo', DataEnvio[0].idfun);
//    formData.append('file', fileToUpload);
//    formData.append('valor', valorpgo);

//     var requestOptions = {
//      method: 'POST',
//      headers: header,
//      body: formData,
//    };

//    console.log(requestOptions);

//      try {
//       const resp = await fetch('https://subirabonos-niyi2iph7a-uc.a.run.app', requestOptions)
//         .then(response => response.text());
//       return resp;
//     } catch (error) {
//       console.error(error.response.data);
//     }
// };


