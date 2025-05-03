import GetLocation from 'react-native-get-location';

export const getCurrentLocation = async (setPosocion) => {

    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    }).then(location => {
        setPosocion(location);
        }).catch(error => {
            const { code, message } = error;
            console.warn(code, message);
    });
};
