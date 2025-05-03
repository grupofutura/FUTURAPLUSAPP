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
