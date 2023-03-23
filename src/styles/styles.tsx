import { StyleSheet } from 'react-native';

const ColorPrimary = "#3A4F6D";
const ColorSecondary = "#43577E";
const ColorSecondaryTransparent = "#43577E9D";
const ColorRed = '#FF2128';
const ColorGreen = '#04b304';
const ColorYellow = '#fffb24';
const ColorRedTransparent = '#EE1F2673';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: ColorPrimary,
    },
    main:{
        flex: 1
    },
    txtTitulo:{
        fontSize: 29,
        fontFamily: 'Raleway-Regular',
        textAlign: "center",
        margin: 10,
    },
    picker:{
        backgroundColor: ColorRed,
        borderRadius: 20,
        flexBasis: '45%',
        marginTop: 8,
        padding: 0,
    },
    body:{
        flexDirection: 'row',
    },

    //Notificacion
    modalNotificacion: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalNotificacionContainer: {
        height: 240,
        width: '90%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 20,
    },
    //modalNotificacionHeader esta en src\components\notificacion.tsx
    modalNotificacionHeader:{
      backgroundColor: ColorGreen,
      height: 60,
      fontSize: 25,
      fontFamily: 'Raleway-Bold',
      color:'black',
      textAlign: 'center',
      paddingVertical: 5,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    modalNotificacionMessage:{
        height: 120,
        padding: 10,
        fontFamily: 'Raleway-Regular',
        fontSize: 25,
        textAlign: "center",
        color: "white"
    },
    modalNotificacionBtn:{
        backgroundColor: ColorPrimary,
        height: 60,
        paddingVertical: 8,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },

    //Login
    image: {
        flex: 1,
        justifyContent: "center"
    },
    form:{
        backgroundColor: ColorSecondaryTransparent,
        color: "white",
        borderRadius: 5,
        margin: 20,
    },
    input:{
        color: 'white',
        textAlign: "center",
        fontSize: 30,
        fontFamily: 'Raleway-Regular',
    },

    title: {
        fontFamily: 'Raleway-Regular',
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        textAlign: "center",
    },

    //Home
    imgUser:{
        width: 45,
        height: 45,
    },
    txtUser:{
        fontSize: 35,
        marginLeft: 10,
        fontFamily: 'Raleway-Regular',
    },
    banner:{
        flex: 1,
        justifyContent: "center",
        resizeMode: 'contain',
    },
    functions:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: ColorPrimary,
    },
    function:{
        flexBasis: '50%',
    },
    imgButton: {
        width: '98%',
        height: 200,
        marginHorizontal:5,
        borderRadius: 20,
        marginVertical: 5,
    },

    //Inventario
    inputCategoria: {
        padding: 10,
        fontSize: 25,
        color:"white",
        textAlign: "center",
        flexBasis: '55%',
        fontFamily: 'Raleway-Regular',
        textTransform: 'uppercase',
    },
    itemFlatList:{
        padding: 8,
        margin: 5,
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Raleway-Regular',
        backgroundColor: ColorPrimary,
        borderRadius: 20,
    },
    FlatList:{
        marginTop: 30,
        backgroundColor: ColorSecondary,
        borderRadius: 20,
        height: 250,
    },
    //InventarioScanner
    containerInfo: {
        backgroundColor: ColorSecondary,
        width: '85%',
        height: '15%',
        alignSelf: 'center',
        paddingButton: 15,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    txtcontainerInfo: {
        textAlign: "center",
        fontFamily: 'Raleway-Regular',
        fontSize: 20,
    },
    camera: {
        marginTop: '1%',
        width: '85%',
        height: '56%',
        alignSelf: 'center',
    },
    OptionMostrar: {
        width: '85%',
        textAlign: "center",
        alignSelf: 'center',
        backgroundColor: ColorRed,
        fontSize: 30,
        padding: 5,
        marginTop: '1%',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    modalScanner: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalScannerContainerHeader:{
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        textAlign: "center",
        backgroundColor: '#008be7',
        fontFamily: 'Raleway-Regular',
        fontSize: 30,
        padding: 10,
        width: '100%'
    },
    modalOption2: {
        textAlign: "center",
        width: 150,
        fontSize: 20,
        padding: 15,
        color:"red"
    },
    modalOption1: {
        textAlign: "center",
        width: 150,
        fontSize: 20,
        padding: 15,
        color: "white"
    },
    modalFinalizar: {
        textAlign: "center",
        width: '100%',
        fontSize: 20,
        padding: 15,
        borderRadius: 15,
        backgroundColor: ColorRed,
    },
    modalScannerContainer:{
        backgroundColor: ColorSecondaryTransparent,
        width: '80%',
        borderRadius: 20,
    },
    modalScannerContainerLista: {
        borderRadius: 10,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    FlatListEscaneo:{
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: ColorSecondaryTransparent,
        borderRadius: 20,
        height: '70%',
        width: "90%",
    },
    textFlatListEscaneo:{
        fontSize: 15,
        textAlign: "center",
        fontFamily: 'Raleway-Regular',
        marginTop: 10,
        color:"white"
    },
    textFlatListEscaneoCantidad:{
        fontSize: 25,
        textAlign: "center",
        color:"white"
    },
    textFlatListEscaneoBold:{
        fontSize: 25,
        fontWeight: 'bold',
        display: 'flex',
        color:"white"
    },
    itemFlatListEscaneo:{
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 15,
    },
    modalHeaderError: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        textAlign: "center",
        backgroundColor: ColorRed,
        fontFamily: 'Raleway-Regular',
        fontSize: 30,
        padding: 10,
    },
    modalError: {
        textAlign: "center",
        width: 350,
        backgroundColor: ColorSecondary,
        fontSize: 20,
        padding: 15,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    modalContainerError: {
        height: '25%',
        width: 350,
        backgroundColor: 'rgba(0,0,0,0.6)',
    }

});