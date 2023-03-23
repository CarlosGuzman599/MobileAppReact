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
    txtSubTitulo:{
        fontSize: 25,
        fontFamily: 'Raleway-Regular',
        textAlign: "center",
        margin: 10,
    },
    body:{
        flexDirection: 'row',
    },
    picker:{
        backgroundColor: ColorRed,
        borderRadius: 20,
        flexBasis: '45%',
        marginTop: 8,
        padding: 0,
    },
    input:{
        color: 'white',
        textAlign: "center",
        fontSize: 30,
        fontFamily: 'Raleway-Regular',
    },

    //* ESTILOS DE VENTANA *//

    FlatList:{
        marginTop: 5,
        backgroundColor: BlackTransparent,
        borderRadius: 20,
        height: '85%',
    },
    itemFlatList:{
        padding: 8,
        margin: 5,
        backgroundColor: ColorPrimary,
        borderRadius: 20,
    },
    itemTextFlatList:{
        fontFamily: 'Raleway-Regular',
        textAlign: "center",
        fontSize: 16,
        color: 'white'
    },
    itemTextFlatListTow:{
        fontFamily: 'Raleway-Regular',
        textAlign: "center",
        fontSize: 19,
        color: 'white',
        fontWeight: 'bold'
    },
    itemAdd:{
        textAlign: "center",
        padding: 8,
        fontSize: 19,
        backgroundColor: ColorRed,
        color:'white',
        margin:4,
        borderRadius: 20,
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
    },
    itemSend:{
        textAlign: "center",
        padding: 8,
        fontSize: 19,
        backgroundColor: '#FFF000', 
        marginTop:10,
        borderRadius: 10,
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
    },
    modalScanner: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalScannerContainer:{
        backgroundColor: ColorSecondaryTransparent,
        width: '80%',
        borderRadius: 20,
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
});