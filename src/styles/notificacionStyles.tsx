import { StyleSheet } from 'react-native';
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


    /*

      const[notificacionState, setNotificacionState] = useState({"Visible":false,"Header":'NoHeaderSet', "Message":'NoInfirmacionSet', "Color":'#FFF'});//PARA NOTIFICACION-CARGANDO
      const[load, setLoad] = useState(false);//PARA NOTIFICACION-CARGANDO


        <Modal animationType="fade" visible={notificacionState.Visible} transparent={true}>
          <View style={styles.Notificacion}>
            <View style={styles.NotificacionContainer}>
              <View style={styles.NotificacionHeader}>
                <Text style={{fontSize: 30,fontFamily: 'Raleway-Bold',textAlign: 'center', color: notificacionState.Color, paddingTop:5}}>
                  {notificacionState.Header}
                </Text>
              </View>
              <Text style={styles.NotificacionMessage}>
                {notificacionState.Message}
              </Text>
              <TouchableHighlight style={styles.NotificacionBtn} underlayColor = "rgba(0,0,0,0)" onPress={()=>setNotificacionState({"Visible":false,"Header":'NoHeaderSet', "Message":'NoInfirmacionSet', "Color":'#FFF'})}>
                <Text style={{fontSize: 25,fontFamily: 'Raleway-Bold',textAlign: 'center',paddingTop:5}}>Aceptar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Modal animationType="fade" visible={load} transparent={true}>
          <View style={styles.Cargando}>
            <Image source={require('../assets/img/test2.gif')} style={{height: 200,width: 200}} resizeMode={"cover"} ></Image>
          </View>
        </Modal>

    */

});