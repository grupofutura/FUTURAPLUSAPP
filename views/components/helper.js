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
