import React,{useState, useEffect} from 'react';
import { View, Text, Modal, TouchableHighlight, Image, FlatList, TextInput } from "react-native";
import { styles } from '../styles/inventarioValidaStyles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
interface Props extends StackScreenProps<RootStackParams, 'inventarioValida'>{};
var domainName;
var dataToSend;
export const InventarioValida = ({ navigation,route }: Props) => {
    const [notificacionState, setNotificacionState] = useState({"Visible":false,"Header":'NoHeaderSet', "Message":'NoInformationSet', "Color":'#FFF'});//PARA NOTIFICACION-CARGANDO
    const [load, setLoad] = useState(false);//PARA NOTIFICACION-CARGANDO
    const params = route.params;
    const [partes, setPartes] = useState(false);
    const [cantidadUpdate, setCantidadUpdate] = useState(false);

    const [idUpdate, setIdUpdate] = useState(false);
    const [numeroUpdate, setNumeroUpdate] = useState(false);
    const [nombreUpdate, setNombreUpdate] = useState(false);

    useEffect(() => {
        const getDoamain = async () => {
          domainName = await AsyncStorage.getItem('domainName');
          setLoad(true);
          getData();
        };

        const getData = async () => {
            try{
                const url = `${domainName}/api/inventario-estado/validate/${params}`
                var data = await axios.get(url);
                var response = await data.data;
                dataToSend = await data.data;   
                setPartes(response);
                setLoad(false);
            }catch(e){
                setNotificacionState({"Visible":true,"Header":'Error!', "Message":'*Contacte a sistemas x favor* \n'+e, "Color":'#FF2128'});
            }
            
        }
        getDoamain();
    }, []);

    const setCabtidadToParte = (ParteID) =>{
        dataToSend.forEach(async Parte => {
            if(Parte.PID == ParteID){
                await setIdUpdate(ParteID);
                await setNombreUpdate(Parte.NP);
                if(Parte.cant != "Agregar"){
                    await setNumeroUpdate(Parte.cant);
                }else{
                    await setNumeroUpdate("");
                }
            }
        });
        setCantidadUpdate(true);
    }   

    const setCantidad = (Cantidad) =>{
        dataToSend.forEach(async element => {
            if(element.PID == idUpdate){
                var Time = new Date();
                element.cant = await Cantidad;
                element.H = await ""+Time.getHours()+":"+Time.getMinutes()+":"+Time.getSeconds();
            }
        });
        //console.log(JSON.stringify(dataToSend, null, 3));
    }

    const sendValitation = () => {
        console.log("*****************************************************************************");
        console.log(JSON.stringify(dataToSend, null, 3));
        console.log("*****************************************************************************");
        var ban = 0;
        dataToSend.forEach(async element => {
            if(element.cant == "Agregar"){
                ban = await 1;
            }
        });

        if(ban == 1){
            
        }
    }

  return(
    <View style={styles.container}>
        <View><Text style={styles.txtTitulo}>Validar Inventario</Text></View>

        <View>
            <FlatList style={styles.FlatList} data={partes}
                renderItem={({item}) =>
                    <View underlayColor = "#EE1F2673" style={styles.itemFlatList}>
                        <Text style={styles.itemTextFlatListTow}>{item.NumP}</Text>
                        <Text style={styles.itemTextFlatList}>{item.NP}</Text>
                        <TouchableHighlight
                            underlayColor = "#EE1F2673"
                            onPress = { () => setCabtidadToParte(item.PID) }
                        >
                            <Text style={styles.itemAdd}>{item.cant}</Text>
                        </TouchableHighlight>
                        
                    </View>
                }
            />
        </View>

        <TouchableHighlight
            underlayColor = "#EE1F2673"
            onPress = { () => sendValitation()}
        >
            <Text style={styles.itemSend}>Enviar Validación</Text>
        </TouchableHighlight>

        {/*Notificacion de agregar disponible*/}
        <Modal animationType="fade" visible={cantidadUpdate} transparent={true}>
            <View style={styles.modalScanner}>
                <View style={styles.modalScannerContainer}>

                    <Text style={styles.modalScannerContainerHeader}>Agregar Cantidad</Text>{/*Titulo Notificacion*/}
                    <Text style={{marginTop: 10, fontFamily: 'Raleway-Regular', fontSize: 20, textAlign: "center", color:"white"}}>Cantidad disponible</Text>
                    <Text style={{marginTop: 10, fontFamily: 'Raleway-Regular', fontSize: 10, textAlign: "center", color:"white"}}>{nombreUpdate}</Text>
                    <TextInput placeholder="Introducir Cantidad" Value={numeroUpdate} style={{fontSize: 30, textAlign: "center", color:"white"}} keyboardType='numeric' autoFocus onChangeText={ (text) => setCantidad(Number(text)) }/>{/*Guarda conforme se escribe en useSatate*/}

                    <View style={{flexDirection: 'row'}}>{/*Contenedor botones*/}
                    <TouchableHighlight underlayColor = "rgba(0,0,0,0)" onPress={()=>setCantidadUpdate(false)}><Text style={styles.modalOption2}>Cancelar</Text></TouchableHighlight>
                    <TouchableHighlight underlayColor = "rgba(0,0,0,0)"><Text style={styles.modalOption1}>Aceptar</Text></TouchableHighlight>
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
    </View>
  );
};
