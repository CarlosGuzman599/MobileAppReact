import React,{useState, useEffect} from 'react';
import { View, Text, Modal, TouchableHighlight, Vibration, FlatList, Switch, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Sound from 'react-native-sound';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles/InventarioScannerStyles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props extends StackScreenProps<RootStackParams, 'inventarioScanner'>{};
var request;
var Listado = [];
var domainName;
var NombreUsusario;
export const inventarioScanner = ({navigation,route}:Props) => {
  const[notificacionState, setNotificacionState] = useState({"Visible":false,"Header":'NoHeaderSet', "Message":'NoInformationSet', "Color":'#FFF'});//PARA NOTIFICACION-CARGANDO
  const[load, setLoad] = useState(false);//PARA NOTIFICACION-CARGANDO
  const params = route.params;
  const[tokenSession, setTokenSession] = useState(null);
  const[isVisibleCantidad, setIsVisibleCantidad] = useState(false);{/*estado de notificacion*/}
  const[isVisibleLista, setIsVisibleLista] = useState(false);{/*Muestra Lista Escaneado*/}
  const[isVisibleNotificaFin, setIsVisibleNotificaFin] = useState(false);{/*Muestra Auth deFinalizacion*/}
  const[parteNombre, setParteNombre] = useState();{/*nombre a agregar*/}
  const[parteNumero, setParteNumero] = useState();{/*numero a agregar*/}
  const[tipoCantidad, setTipoCantidad] = useState("Agregar");{/*Para mostrar dialogo de agregar o modificar*/}
  const[parteID, setParteID] = useState(false);{/*parteID a agregar*/}
  const[cantidad, setCantidad] = useState(1);{/*cantidad a agregar*/}
  const[update,setUpdate] = useState(false);{/*Informacion cargada para un error*/}
  const[login, setLogin] = useState(false);{/*para solicitar info al api desde funcion autenticacion y enviar informacion*/}
  const[password, setPassword] = useState();{/*almacena el password conforme se escrebe*/}
  const[inventarioEstadoID, setInventarioEstadoID] = useState();{/*almacena el password conforme se escrebe*/}
  const[isEnabled, setIsEnabled] = useState(true);
  const[lastPart, setLastPart] = useState(['NumeroDeParte', 0, 'NombreDeParte']);
  const[addManual, setAddManual] = useState(false);
  const[numeroParte, setNumeroParte] = useState(false);
  const[listaNumeroParte,setListaNumeroParte] = useState([]);
  //const[allowReadCode,setAllowReadCode] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  //  setInterval(function () {setAllowReadCode(true)}, 2500);

  const readCode = async (data) =>{
    if(!(data.barcodes.length == 0 ) && (data.barcodes[0].format == "CODE_93" || data.barcodes[0].format == "EAN_13") && !addManual && !isVisibleLista && !notificacionState.Visible){
      //setAllowReadCode(false);//
      await setParteID(data.barcodes[0].data);
      //setParteID(false);
    }
  }

  useEffect(() => {
    const getDoamain = async ()=>{
      domainName = await AsyncStorage.getItem('domainName');
      NombreUsusario = await AsyncStorage.getItem('userName');
      NombreUsusario = NombreUsusario.replace(' ','_');
      const d = new Date();
      const token = await `${params.SucursalID}_${params.LineID}_${NombreUsusario}-F${d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()+ "T" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds()}`;
      setTokenSession(token);
      InitValues();
    };

    const InitValues = async () =>{
      Listado = [];
      if(!params.InventarioEstadoID){
        try {
          request = {SID: params.SucursalID, LID: params.LineID};
          const url = `${domainName}/api/inventario-use-line`,
          respuesta = await axios.post(url, request);
          var response = respuesta.data;
          setInventarioEstadoID(response.folio);
          if(response.tipo=='no_complete'){
            setNotificacionState({"Visible":true,"Header":'Notificación', "Message":'Faltan sucursales por inventariar, validar conteo en todas las sucursales Redireccionando ...', "Color":'#FFFB24'});
            setTimeout(() => {
              navigation.reset;
              navigation.navigate('inventario');
            }, 5000);
          }else if(response.tipo=='nuevo'){
            setNotificacionState({"Visible":true,"Header":'Ok', "Message":'Se abre la linea para inventario', "Color":'#33FF3F'})
          }else{
            setNotificacionState({"Visible":true,"Header":'Ok', "Message":'Linea previamente abierta', "Color":'#33FF3F'})
          }
        }catch (e) {
          setNotificacionState({"Visible":true,"Header":'Error!', "Message":'*Contacte a sistemas x favor* \n'+e, "Color":'#FF2128'});
        }
        response = null;
      }
    }
    getDoamain();
  }, []);

  useEffect(() => {
    const getLineasAPI = async () =>{
      if(parteID && !update){
        try{
          request = {session:tokenSession}
          const url = `${domainName}/api/show-parte/${parteID}`,
          resultado = await axios.get(url, request);
          console.log(JSON.stringify(resultado, null,3));
          Sound.setCategory('Playback', true);
          let sound = new Sound('beep.mp3',Sound.MAIN_BUNDLE, async()=>{
            await sound.play(()=>{
              sound.release();
            });
            Vibration.vibrate();
          });
          try{//trata de identificar si extiste valor de retorno valido desde la api
            if(!(params.LineID === resultado.data[0].LineaID)){//verifica que la parte escaneada pertenesca a la linea seleccionada
              setNotificacionState({"Visible":true,"Header":'Notificación', "Message":'Parte NO perteneciente a linea', "Color":'#FFFB24'});
              setParteID(false);//reinicia valor de ParteID osea valor escaneado
              setTimeout(()=>{setParteID(false);}, 3000)//reinicia valor escaneado
            }else{//Parte y Linea Correcta
              setParteNombre(depuraNombreParte(resultado.data[0].NombreParte));
              setParteNumero(resultado.data[0].NumeroParte);
              if(isEnabled){//si el modo dinamico SI esta activo
                var Time = new Date();
                if(Listado.length == 0){ // si la lista esta vacia agrega directamente con valor de 1
                  //Listado.unshift({PID:resultado.data[0].ParteID, cant: cantidad, NP: depuraNombreParte(resultado.data[0].NombreParte), NumP: resultado.data[0].NumeroParte, H: ""+Time.getHours()+":"+Time.getMinutes()+":"+Time.getSeconds()});
                  Listado.unshift({PID: parteID, cant: cantidad, NP: depuraNombreParte(resultado.data[0].NombreParte), NumP: resultado.data[0].NumeroParte, H: ""+Time.getHours()+":"+Time.getMinutes()+":"+Time.getSeconds()});
                  setLastPartView();
                }else{
                  var bandera = 0;
                  Listado.forEach(parte => {
                    if(parte.PID == parteID){//si parteID(iteracion) = parteID(useState) => modifica Xfi y bandera en 1
                      parte.cant = parte.cant + 1;
                      bandera = 1;//se encontry se actualizo
                      setLastPartView();
                    }
                  });
                  if(bandera == 0){//no se encontro y agrega
                    //Listado.unshift({PID:resultado.data[0].ParteID, cant: cantidad, NP: depuraNombreParte(resultado.data[0].NombreParte), NumP: resultado.data[0].NumeroParte, H: ""+Time.getHours()+":"+Time.getMinutes()+":"+Time.getSeconds()});
                    Listado.unshift({PID: parteID, cant: cantidad, NP: depuraNombreParte(resultado.data[0].NombreParte), NumP: resultado.data[0].NumeroParte, H: ""+Time.getHours()+":"+Time.getMinutes()+":"+Time.getSeconds()});
                    setLastPartView();
                  }
                }
                setTimeout(()=>{setParteID(false);}, 2500)//reinicia valor escaneado
              }else{//si el modo dinamico NO esta activo
                setIsVisibleCantidad(true); //Muestra modal para ingresar cantidad manualmente
              }
            }
          }catch(e){
            setNotificacionState({"Visible":true,"Header":'Notificación', "Message":'Parte no localizada en registro \n'+e, "Color":'#FFFB24'});
          }
        }catch(e){
          setNotificacionState({"Visible":true,"Header":'Error!', "Message":'*Contacte a sistemas x favor* \n'+e, "Color":'#FF2128'});
        }
      }
    }
    getLineasAPI();
  }, [parteID]);//la llamada al api ocurre cuabdo detecta un cambie eb el estado parteID osea cuando se escanea algo

  useEffect(() => {
    const sendList = async () =>{
      await setLoad(true);
      axios.defaults.timeout =  15000;
      const url = `${domainName}/api/inventario-create`,
      response = await axios.post(url, request);//console.log(JSON.stringify(response, null,3));
      try{
        if(response.data == "OK"){
          setLoad(false);
          rebootStates();
          Listado = null;
          navigation.reset;
          navigation.navigate('inventario');
        }else{
          setNotificacionState({"Visible":true,"Header":'Error!', "Message":'*Contacte a sistemas x favor* \n -Error al registrar- \n'+response.data, "Color":'#FF2128'});
        }
      }catch(e){
        setNotificacionState({"Visible":true,"Header":'Error!', "Message":'*Contacte a sistemas x favor* \n -Error al registrar- \n'+e, "Color":'#FF2128'});
      }
    }

    const autenticacion = async () =>{
      if(login){
        var pass = {password};
        axios.defaults.timeout =  15000;
        const url = `${domainName}/api/login/`,
        response = await axios.post(url, pass);
        if(response.data.status == 200 && response.data.user[0].Activo == 1){
          try{
            request = {session:tokenSession,SID: (params.SucursalID).toString(), UID: response.data.user[0].UsuarioID ,Partes: Listado, IEID: inventarioEstadoID};
            sendList();
          }catch(e){
            setNotificacionState({"Visible":true,"Header":'Error!', "Message":'*Contacte a sistemas x favor* \n'+e, "Color":'#FF2128'});
          }
        }else{
          setNotificacionState({"Visible":true,"Header":'Notificación', "Message":'Acceso Denegado', "Color":'#fffb24'});
        }
        setLogin(false);
      }
    }
    autenticacion();
  }, [login]);//la llamada al api ocurre cuabdo detecta un cambie eb el estado parteID osea cuando se escanea algo

  useEffect(() => {
    const getPartesNumero = async() =>{
      if(numeroParte.length > 3){
        try{
          axios.defaults.timeout =  15000;
          const url = `${domainName}/api/show-parte/numero/${numeroParte}/line/${params.LineID}`,
          response = await axios.get(url);
          setListaNumeroParte(response.data);
        }catch(e){
          setNotificacionState({"Visible":true,"Header":'Error!', "Message":'*Contacte a sistemas x favor* \n'+e, "Color":'#FF2128'});
        }
      }else{
        setListaNumeroParte([]);
      }
    }
    getPartesNumero()
  }, [numeroParte])

  const depuraNombreParte = (NombreParte) => {
    //return NombreParte.replace('"','');
    return (NombreParte.replace('"','')).substring(0, 30);
  }

  const rebootStates = () =>{
    setTipoCantidad("Agregar");
    setCantidad(1);
    setParteNombre(false);
    setParteID(false);
    setIsVisibleCantidad(false);
    setIsVisibleNotificaFin(false);
  }

  const setLastPartView = () =>{
    Listado.forEach(last => {
      if(last.PID == parteID){
        setLastPart([last.NumP, last.cant, last.NP]);
      }
    });
  }

  const addParte = () =>{
    setIsVisibleCantidad(false);
    var Time = new Date();
    if(Listado.length == 0 && !(cantidad == 0)){
      Listado.unshift({PID: parteID, cant: cantidad, NP: parteNombre, NumP: parteNumero, H: ""+Time.getHours()+":"+Time.getMinutes()+":"+Time.getSeconds()});
      setLastPartView();
    }else{
      var bandera = 0;
      Listado.forEach(parte => {
        if(parte.PID == parteID){//si parteID(iteracion) = parteID(useState) => modifica Xfi y bandera en 1
          parte.cant = cantidad;
          bandera = 1;//se encontry se actualizo
        }
      });
      if(bandera == 0){//no se encontro y agrega
        Listado.unshift({PID: parteID, cant: cantidad, NP: parteNombre, NumP: parteNumero, H: ""+Time.getHours()+":"+Time.getMinutes()+":"+Time.getSeconds()});
        setLastPartView();
      }
    }

    Listado = Listado.filter(function(item){//Depura que no halla elementos con cantidad 0
      return item.cant !== 0;
    });

    setParteID(false);
    setCantidad(1);
    setUpdate(false);
    setParteNumero('');

  }

  const updateCantidad = (parteID, nombreParte) =>{//prepara para modificar coloca en estados los valores de id y nombre    
    setUpdate(true);
    setParteID(parteID);
    setParteNombre(nombreParte);
    setIsVisibleCantidad(true);
    setTipoCantidad("Modificar");
  }

  const validaListaVacia = () =>{
    var ListadoDepurado = [];
    Listado.forEach(element => {
      if(element.PID != false){
        ListadoDepurado.push(element);
      }
    });
    Listado = ListadoDepurado;
    if(Listado.length == 0){
      setNotificacionState({"Visible":true,"Header":'Notificación', "Message":'Lista Vacia', "Color":'#FFFB24'});//
    }else{
      setIsVisibleNotificaFin(true);
    }
  }

  const agregarManualOpen = () =>{
    setAddManual(true);
    setIsVisibleLista(false);
  }

  const agregarManualClose = () =>{
    setAddManual(false);
    setIsVisibleLista(true);
  }

  return (
    <View style={styles.container}>
      <View><Text style={styles.txtTitulo}>Inventario Scanner</Text></View>
      <View style={styles.containerInfo}>{/*Contener informacion*/}
        <Text style={styles.txtcontainerInfo}> Sucursal: {params.NombreSucursal}</Text>
        <Text style={styles.txtcontainerInfo}> Linea: {params.NombreLinea}</Text>

        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center',}}>{/*Contenedor botones*/}
          <Text style={{fontSize: 25, fontFamily: 'Raleway-Regular', marginRight: 10, color:"white"}}>Escaneo Dinamico</Text>{/*Titulo Notificacion*/}
          <Switch
            style={{marginTop: 8,}}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#FF2128" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>{/*fin contenedor botones*/}

      </View>

      <RNCamera
        style={styles.camera}
        onGoogleVisionBarcodesDetected={(data)=>readCode(data)}
      />{/*Componente Camara que lee el codigo y va ah funcion 'readCode'*/}

      <TouchableHighlight underlayColor = "#'rgba(0,0,0,0)'" onPress={()=>setIsVisibleLista(true)}><Text style={styles.OptionMostrar}>Mostrar Lista</Text></TouchableHighlight>

      <View style={styles.containerLast}>
        <View style={{flexDirection:'row', alignSelf: 'center',}}>
          <Text style={styles.textFlatListEscaneoBold}>{lastPart[0]}     </Text>
          <Text style={styles.textFlatListEscaneoCantidad}>{lastPart[1]}</Text>
        </View>
        <Text style={styles.textFlatListEscaneo}>{lastPart[2]}</Text>
      </View>
      
      {/*Notificacion de agregar disponible*/}
      <Modal animationType="fade" visible={isVisibleCantidad} transparent={true}>
        <View style={styles.modalScanner}>
          <View style={styles.modalScannerContainer}>

            <Text style={styles.modalScannerContainerHeader}>{tipoCantidad}</Text>{/*Titulo Notificacion*/}
            <Text style={{marginTop: 10, fontFamily: 'Raleway-Regular', fontSize: 20, textAlign: "center", color:"white"}}>Cantidad disponible</Text>
            <Text style={{marginTop: 10, fontFamily: 'Raleway-Regular', fontSize: 10, textAlign: "center", color:"white"}}>{parteNombre}</Text>
            <TextInput placeholder="Ingrese cantidad" style={{fontSize: 30, textAlign: "center", color:"white"}} keyboardType='numeric' autoFocus onChangeText={ (text) => setCantidad(Number(text)) }/>{/*Guarda conforme se escribe en useSatate*/}

            <View style={{flexDirection: 'row'}}>{/*Contenedor botones*/}
              <TouchableHighlight underlayColor = "rgba(0,0,0,0)" onPress={()=>rebootStates()}><Text style={styles.modalOption2}>Cancelar</Text></TouchableHighlight>
              <TouchableHighlight underlayColor = "rgba(0,0,0,0)" onPress={()=>addParte()}><Text style={styles.modalOption1}>Aceptar</Text></TouchableHighlight>
            </View>{/*fin contenedor botones*/}

          </View>
        </View>
      </Modal>{/*End Notificacion*/}

      {/*Listado Escaneado*/}
      <Modal animationType="fade" visible={isVisibleLista} transparent={true}>
        <View style={styles.modalScanner}>
          <View style={styles.modalScannerContainerLista}>

            <Text style={styles.modalScannerContainerHeader}>Escaneados</Text>
            <Text style={{marginTop: 10, fontFamily: 'Raleway-Regular', fontSize: 25, textAlign: "center", color: "white"}}>L   I   S   T   A</Text>

            <View style={{flexDirection:'column'}}>
              <FlatList style={styles.FlatListEscaneo} data={Listado}
                renderItem={({item}) =>
                  <TouchableHighlight style={styles.itemFlatListEscaneo} underlayColor = "#EE1F2673" onPress={()=>updateCantidad(item.PID, item.NP)}>{/*manda id y nombre al useState (Cantidad ya esta guardada)*/}
                    <View>
                      <View style={{flexDirection:'row', alignSelf: 'center',}}>
                        <Text style={styles.textFlatListEscaneoBold}>{item.NumP}     </Text>
                        <Text style={styles.textFlatListEscaneoCantidad}>{item.cant}</Text>
                      </View>
                      <Text style={styles.textFlatListEscaneo}>{item.NP}</Text>
                    </View>
                  </TouchableHighlight>
                }
              />
            </View>{/*Contenedor de lista*/}

            <View style={{flexDirection: 'row', justifyContent: 'center',}}>{/*Contenedor botones*/}
              <TouchableHighlight underlayColor = "rgba(0,0,0,0)" onPress={()=>validaListaVacia()}><Text style={styles.modalFinalizar}>Finalizar</Text></TouchableHighlight>
              <TouchableHighlight underlayColor = "rgba(0,0,0,0)" onPress={()=>agregarManualOpen()}><Text style={styles.modalManual}>Agregar</Text></TouchableHighlight>
              <TouchableHighlight underlayColor = "rgba(0,0,0,0)" onPress={()=>setIsVisibleLista(false)}><Text style={styles.modalOption1}>Aceptar</Text></TouchableHighlight>
            </View>{/*fin contenedor botones*/}

          </View>
        </View>
      </Modal>{/*End Listado Escaneado*/}

      {/*AGREGAR MANUAL*/}
      <Modal animationType="fade" visible={addManual} transparent={true}>
        <View style={styles.modalScanner}>
          <View style={styles.modalScannerContainerLista}>

            <Text style={styles.modalScannerContainerHeader}>Agregar Manual</Text>
            <Text style={{marginTop: 10, fontFamily: 'Raleway-Regular', fontSize: 25, textAlign: "center", color: "white"}}>E N C O N T R A D O S</Text>

            <View style={{flexDirection:'column'}}>
              <FlatList style={styles.FlatListEncontrado} data={listaNumeroParte}
                renderItem={({item}) =>
                  <TouchableHighlight style={styles.itemFlatListEscaneo} underlayColor = "#EE1F2673" onPress={()=>setParteID(item.ParteID)}>{/*manda id y nombre al useState (Cantidad ya esta guardada)*/}
                    <View>
                      <View style={{flexDirection:'row', alignSelf: 'center',}}>
                        <Text style={styles.textFlatListEscaneoBold}>{item.NumeroParte}</Text>
                      </View>
                      <Text style={styles.textFlatListEscaneo}>{item.NombreParte}</Text>
                    </View>
                  </TouchableHighlight>
                }
              />
              <TextInput
                onChangeText={(text) =>{setNumeroParte(text)}}
                placeholder="Número de parte"
                selectionColor={'white'}
                style={styles.inputSearchNumero}
              />
            </View>{/*Contenedor de lista*/}

            <View style={{flexDirection: 'row', justifyContent: 'center',}}>{/*Contenedor botones*/}
              <TouchableHighlight underlayColor = "rgba(0,0,0,0)" onPress={()=>agregarManualClose()}><Text style={styles.modalFinalizar}>Cerrar</Text></TouchableHighlight>
            </View>{/*fin contenedor botones*/}

          </View>
        </View>
      </Modal>{/*End AGREGAR MANUAL*/}

      {/*Notificacion Finalizar*/}
      <Modal animationType="fade" visible={isVisibleNotificaFin} transparent={true}>
        <View style={styles.modalScanner}>
          <View style={styles.modalScannerContainer}>

            <Text style={styles.modalScannerContainerHeader}>Finalizar</Text>{/*Titulo Notificacion*/}
            <Text style={{marginTop: '1%', fontFamily: 'Raleway-Regular', fontSize: 20, textAlign: "center", color: "white"}}>Introduzca contraseña</Text>
            <TextInput placeholder="Contraseña" secureTextEntry={true} selectionColor={'white'} style={styles.input} autoFocus onChangeText={ (text) => setPassword(text) }/>{/*Guarda conforme se escribe en useSatate*/}

            <View style={{flexDirection: 'row'}}>{/*Contenedor botones*/}
              <TouchableHighlight underlayColor = "rgba(0,0,0,0)" onPress={()=>rebootStates()}><Text style={styles.modalOption2}>Cancelar</Text></TouchableHighlight>
              <TouchableHighlight underlayColor = "rgba(0,0,0,0)" onPress={()=>setLogin(true)}><Text style={styles.modalOption1}>Aceptar</Text></TouchableHighlight>
            </View>{/*fin contenedor botones*/}

          </View>
        </View>
      </Modal>{/*End Notificacion*/}

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
            <TouchableHighlight style={styles.NotificacionBtn} underlayColor = "rgba(0,0,0,0)" onPress={()=>setNotificacionState({"Visible":false,"Header":'NoHeaderSet', "Message":'NoInformationSet', "Color":'#FFF'})}>
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
    </View>//Fin Container
  );
}
