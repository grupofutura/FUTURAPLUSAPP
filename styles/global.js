import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding:10,
    backgroundColor: '#FFFFFF',
    // marginHorizontal: '2.5%',
  },
  banner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginHorizontal: '40%',
  },
  contenido: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: '0%',
  },
  titulo: {
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 3,
    fontSize: 40,
    color: '#0c1b5a',
  },
  subtitulo: {
    textAlign: 'center',
    marginBottom: 2,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 1,
  },
  lista: {
    textAlign: 'left',
    width: '100%',
    marginTop: 2,
    marginBottom: 3,
    fontSize: 40,
    color: '#0c1b5a',
    backgroundColor: '#FFF',
  },
  input: {
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  listacard: {
    flex: 1,
    height: '100%',
   // width:'100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  titulocard: {
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 3,
    fontSize: 25,
    color: '#0c1b5a',
  },
  boton: {
    width:'100%',
    backgroundColor: '#0c1b5a',
  },
  tab: {
    backgroundColor: '#0c1b5a',
  },
  botonTexto: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  enlace: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 20,
  },
  logo: {
    alignItems: 'center',
    width:'100%',
    marginHorizontal: '40%',
    marginTop: 50,
    marginBottom: '5%',
  },
  logoCabecera: {
    width:'60%',
    height:140,
    marginTop: 1,
    marginBottom: 1,
    resizeMode: 'contain',
  },
  fileImg: {
    width:200,
    height:200,
    alignItems: 'center',
    marginLeft: '20%',
    marginBottom: 1,
    marginTop:5,
    resizeMode: 'contain',
  },
  fileCprob: {
    alignItems: 'center',
    width:'100%',
    height:900,
    marginLeft: 1,
    marginBottom: 1,
  },
});

export default globalStyles;
