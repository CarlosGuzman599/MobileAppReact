import { StyleSheet } from 'react-native';
const ColorNotificacion = "#193958";
const ColorSecondaryTransparent = "#43577e85";
const ColorPrimary = "#3A4F6D";
const ColorSecondary = "#43577E";
const ColorRed = '#FF2128';
const ColorDarkTransparent = '#1a1a1a63';

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

    //Inventario
    inputCategoria: {
        padding: 10,
        fontSize: 25,
        color:'white',
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

    itemFlatListOpen:{
        padding: 8,
        margin: 5,
        textAlign: "center",
        fontFamily: 'Raleway-Regular',
        backgroundColor: ColorDarkTransparent,
        borderRadius: 20,
    },
    FlatList:{
        marginTop: 30,
        backgroundColor: ColorSecondary,
        borderRadius: 20,
        height: 250,
    },
    FlatListOpen:{
        backgroundColor: ColorSecondary,
        borderRadius: 20,
        height: 280,
        padding: 10,
    },
    ListOpenNombre:{
        textAlign: "center",
        fontSize:19,
        fontFamily: 'Raleway-Bold',
    },
    btn:{
        fontSize:20,
        textAlign: "center",

    },
    btnCerrar:{
        backgroundColor: '#da140d',       
        borderRadius: 5,
        padding: 5,
        margin:10,
        width: '45%',
        textAlign:"center",
        fontSize:20,
    },
    btnValidar:{
        backgroundColor: '#FFF000',       
        color:'#000000',
        borderRadius: 5,
        padding: 5,
        margin:10,
        width: '45%',
        textAlign:"center",
        fontSize:20,
    },
    btnContinuar:{
        backgroundColor: '#003cff',       
        borderRadius: 5,
        padding: 5,
        margin:10,
        width: '45%',
        textAlign:"center",
        fontSize:20,
    },
    modalScanner: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
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
        width: 150,
        fontSize: 20,
        padding: 15,
        color: "white"
    },
});