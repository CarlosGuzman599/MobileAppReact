import { StyleSheet } from 'react-native';
const ColorSecondaryTransparent = "#43577e85";
const BlackTransparent = "#1a1a1a70";
const ColorPrimary = "#3A4F6D";
const ColorNotificacion = "#193958";
const ColorSecondary = "#43577E";
const ColorRed = '#FF2128';
export const styles = StyleSheet.create({

    //***********************   NOTIFICACIONES-CARGANDO    *********************** */
    Cargando:{
        flex: 1,
        backgroundColor: ColorNotificacion,
        marginHorizontal: '10%',
        marginVertical: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
    },

    //Notificacion
    Notificacion: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    NotificacionContainer: {
        height: '25%',
        width: '90%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 10,
    },

    NotificacionHeader:{
        backgroundColor: ColorPrimary,
        height: '25%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },

    NotificacionMessage:{
        flex:1,
        height: '50%',
        padding: 20,
        fontFamily: 'Raleway-Regular',
        fontSize: 19,
        textAlign: "center",
        color: "white",
        justifyContent: 'center',
    },

    NotificacionBtn:{
        backgroundColor: ColorPrimary,
        height: '25%',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    //***********************   END   NOTIFICACIONES-CARGANDO    *********************** */
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: ColorPrimary,
    },
    txtTitulo:{
        fontSize: 29,
        fontFamily: 'Raleway-Regular',
        textAlign: "center",
        margin: 10,
    },
    input:{
        color: 'white',
        textAlign: "center",
        fontSize: 30,
        fontFamily: 'Raleway-Regular',
    },
    //InventarioScanner
    containerInfo: {
        backgroundColor: ColorSecondary,
        width: '85%',
        height: '12%',
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
        backgroundColor: 'rgba(0,0,0,0.9)',
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
        width: 'auto',
        fontSize: 20,
        padding: 15,
        color: "white",
        marginHorizontal:15
    },
    modalFinalizar: {
        textAlign: "center",
        width: '100%',
        fontSize: 20,
        padding: 15,
        borderRadius: 15,
        backgroundColor: ColorRed,
    },
    modalManual:{
        textAlign: "center",
        fontSize: 20,
        padding: 15,
        width: '100%',
        borderRadius: 15,
        color:'#00FF0D',
        marginHorizontal:15,
        fontWeight: 'bold',
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
        backgroundColor: 'rgba(0,0,0,0.1)',
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
    containerLast:{
        backgroundColor: BlackTransparent,
        marginTop:10,
        padding: 5,
        width: '85%',
        height: '10%',
        alignSelf: 'center',
        borderRadius: 20,
    },
    FlatListEncontrado:{
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: ColorSecondaryTransparent,
        borderRadius: 20,
        height: '65%',
        width: "90%",
    },
    inputSearchNumero:{
        color: 'white',
        textAlign: "center",
        fontSize: 30,
        backgroundColor: ColorSecondaryTransparent,
        borderRadius: 20,
        width: "90%",
        alignSelf: 'center',
        marginVertical: 10,
    }
});