/* eslint-disable no-array-constructor */
import Icono from '@react-native-vector-icons/ionicons';

export const Iconos = ({name,size,color}) => {
    return (
        <Icono
        name={ name }
        size={ size }
        color={ color }
      />
    );
  };

export const currencyFormat = (num) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(num);

export const formatFecha = (fecha) => {
  fecha = fecha.split('-');
  var dia = fecha[2];
  var mes = fecha[1] - 1;
  var anno = fecha[0];
  var meses = new Array(' ', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
  var fecprocob = dia + ' de ' + meses[mes] + ' de ' + anno;
  return fecprocob;
};

 export const formateadaFecha = (fechaString) => {
const fecha = new Date(fechaString);

    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Sumar 1 al mes y asegurar dos dígitos
    const dia = String(fecha.getDate()).padStart(2, '0'); // Asegurar dos dígitos
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    const fechaFormateada = `${hora}:${minutos}:${segundos}`;
    return fechaFormateada;
};
