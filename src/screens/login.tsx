import React,{useState, useEffect} from 'react';
import { Text, View, ImageBackground, TextInput, Modal, TouchableHighlight, Image} from 'react-native'
import { styles } from '../styles/loginStyles';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props extends StackScreenProps<any, any>{};

var domainName = '';
export const login = ({ navigation }: Props) => {
  const[notificacionState, setNotificacionState] = useState({"Visible":false,"Header":'NoHeaderSet', "Message":'NoInfirmacionSet', "Color":'#FFF'});//PARA NOTIFICACION-CARGANDO
  const[load, setLoad] = useState(false);//PARA NOTIFICACION-CARGANDO
  const[password,setPassword] = useState();
  const[login,setLogin] = useState(false);

  useEffect(() => {
    const Domain = async () =>{
      await AsyncStorage.setItem('domainName', 'http://192.168.1.173:8080');
      domainName = await AsyncStorage.getItem('domainName');
    };
    Domain();
  },[]);

  useEffect(() => {
    const autenticacion = async () =>{
      if(login){
        try {
          if(!(password == "")){
            setLoad(true);
            var request = {password};
            axios.defaults.timeout =  15000;
            const url = `${domainName}/api/login`,
            resultado = await axios.post(url, request);
            try{
              setLoad(false);
              await AsyncStorage.setItem('userID', resultado.data.user[0].UsuarioID);
              await AsyncStorage.setItem('userName', resultado.data.user[0].NombreUsuario);
              setPassword('');
              navigation.navigate('home', {NombreUsuario: resultado.data.user[0].NombreUsuario});
            }catch(exception){
              setLoad(false);
              setPassword('');
              setNotificacionState({"Visible":true,"Header":'Notificación', "Message":exception, "Color":'#fffb24'});
            }
          }
        } catch (e) {
          setLoad(false);
          setNotificacionState({"Visible":true,"Header":'Error!', "Message":'*Contacte a sistemas x favor* \n'+e, "Color":'#FF2128'});
        }
        setLogin(false);
      }
    }
    autenticacion();
  }, [login]);//la llamada al api ocurre cuabdo detecta un cambie eb el estado parteID osea cuando se escanea algo

  return(
    <View style={styles.main}>
      <ImageBackground source={require('../assets/img/login.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.form}>
          <Text style={styles.title}>Acceder</Text>
          <TextInput
            onSubmitEditing={() => setLogin(true)}
            onChangeText={(text) => setPassword(text)}
            value = {password}
            secureTextEntry={true}
            placeholder="Password"
            selectionColor={'white'}
            style={styles.input}
          />
        </View>
      </ImageBackground>

      {/*NOTIFICACIONES-CARGANDO*/}
      <Modal animationType="fade" visible={notificacionState.Visible} transparent={true}>
        <View style={styles.Notificacion}>
          <View style={styles.NotificacionContainer}>
            <View style={styles.NotificacionHeader}>
              <Text style={{fontSize: 30,fontFamily: 'Raleway-Bold',textAlign: 'center', color: notificacionState.Color, paddingTop:5}}>
                {notificacionState.Header}
              </Text>{/*Titulo Notificacion*/}
            </View>
            <Text style={styles.NotificacionMessage}>
              {notificacionState.Message}
            </Text>
            <TouchableHighlight style={styles.NotificacionBtn} underlayColor = "rgba(0,0,0,0)" onPress={()=>setNotificacionState({"Visible":false,"Header":'NoHeaderSet', "Message":'NoInfirmacionSet', "Color":'#FFF'})}>
              <Text style={{fontSize: 25,fontFamily: 'Raleway-Bold',textAlign: 'center',paddingTop:5}}>Aceptar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>{/*End Notificacion*/}
      <Modal animationType="fade" visible={load} transparent={true}>{/*Cargando*/}
        <View style={styles.Cargando}>
          <Image source={require('../assets/img/test2.gif')} style={{height: 200,width: 200}} resizeMode={"cover"} ></Image>
        </View>
      </Modal>{/*End Cargando*/}
      {/*END NOTIFICACIONES-CARGANDO*/}
    </View>
  );
};
