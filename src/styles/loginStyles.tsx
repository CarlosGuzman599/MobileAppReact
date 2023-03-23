import { StyleSheet } from 'react-native';
const ColorSecondaryTransparent = "#43577E9D";
const ColorPrimary = "#3A4F6D";
const ColorNotificacion = "#193958";
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
        backgroundColor: 'rgba(0,0,0,0)',
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


    main:{
        flex: 1
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
});