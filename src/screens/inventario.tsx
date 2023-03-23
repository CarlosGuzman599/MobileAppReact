import React, {useState, useEffect} from 'react'
import { Text, View, TextInput, FlatList, TouchableHighlight, Modal, Image, ScrollView} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/inventarioStyles';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props extends StackScreenProps<any, any>{};
var domainName = '';
export const inventario = ({ navigation }: Props) => {
    const [notificacionState, setNotificacionState] = useState({"Visible":false,"Header":'NoHeaderSet', "Message":'NoInfirmacionSet', "Color":'#FFF'});//PARA NOTIFICACION-CARGANDO
    const [load, setLoad] = useState(false);//PARA NOTIFICACION-CARGANDO
    const [selectedValue, setSelectedValue] = useState(false);//Valor de Picker sucursal id
    const [selectedValueNombre, setSelectedValueNombre] = useState('MATRIZ SA');//Valor de Picker sucursal nombre
    const [find, setFind] = useState(false);//captura valode de input para buscar linea
    const [lineas, setLineas] = useState();//Lineas encontradas
    const [lineasAbiertas, setLineasAbiertas] = useState();//Lineas abiertas encontradas
    const [cerrarLinea, setCerrarLinea] = useState(false);
    const [password, setPassword] = useState(false);
    const [inventarioEstadoID, setInventarioEstadoID] = useState(false);
    const [login, setLogin] = useState(false);
    const [tipoLogin, setTipoLogin] = useState(false);

    useEffect(() => {
        const getAuth = async ()=>{
            domainName = await AsyncStorage.getItem('domainName');
            setSelectedValue(4);
        };
        getAuth();
    }, []);

    
    useEffect(() => {
        const getAuth = async ()=>{
            if(login){
                setLogin(false);
                if(!(password == "")){
                    setLoad(true);
                    try{
                        var request = {password};
                        axios.defaults.timeout =  15000;
                        var url = `${domainName}/api/login`,
                        response = await axios.post(url, request);
                        setLoad(false);
                        if(response.data.status == 200){
                            try{
                                url = await `${domainName}/api/linea/state/${inventarioEstadoID}/${tipoLogin}`,
                                response = await axios.post(url, request);
                                console.log(response);
                                if(response.data[0] == "OK"){
                                    setLineasAbiertas(response.data[1]);
                                    setCerrarLinea(false);
                                    var dataTemp = selectedValue;
                                    setSelectedValue(false);
                                    setSelectedValue(selectedValue);
                                }
                            }catch(e){
                                setNotificacionState({"Visible":true,"Header":'Error!', "Message":'*Contacte a sistemas x favor* \n'+e, "Color":'#FF2128'});
                            }
                        }else{
                            setNotificacionState({"Visible":true,"Header":'Notificación', "Message":'Acceso Denegado', "Color":'#fffb24'});
                        }
                    }catch(e){
                        setNotificacionState({"Visible":true,"Header":'Error!', "Message":'*Contacte a sistemas x favor* \n'+e, "Color":'#FF2128'});
                    }
                }
            }
        };
        getAuth();
    }, [login]);
    
    useEffect(() => {
      const getLineasAPI = async () =>{
        if(find){
            try{
                const url = `${domainName}/api/show-linea/${find}`;
                axios.defaults.timeout =  5000;
                const resultado = await axios.get(url);
                //console.log(resultado.data);
                if(resultado.data.length == 0){
                    setNotificacionState({"Visible":true,"Header":'Error!', "Message":'Sin coincidencias de búsqueda', "Color":'#fffb24'});
                }else{
                    setLineas(resultado.data);
                }
            }catch(e){
                setNotificacionState({"Visible":true,"Header":'Error!', "Message":'*Contacte a sistemas x favor* \n'+e, "Color":'#FF2128'});
            }
        }
      }
      getLineasAPI();
    }, [find]);

    useEffect(() => {
        const getLineasAbiertas = async () =>{
            if(selectedValue){
                try{
                    const url = `${domainName}/api/show-linea/open/${selectedValue}`;
                    axios.defaults.timeout =  5000;
                    const request = await axios.get(url);
                    //console.log(JSON.stringify(request.data,null, 3));
                    setLineasAbiertas(request.data);
                }catch(e){
                    setNotificacionState({"Visible":true,"Header":'Error!', "Message":'*Contacte a sistemas x favor* \n'+e, "Color":'#FF2128'});
                }
            }
        }
        getLineasAbiertas();
    }, [selectedValue]);

    const sucursales = {1:'MATRIZ', 2:'Suc02', 3:'Suc03', 4:'MATRIZ SA', 5:'Suc02 SA', 6:'Suc03 SA'};

    const setSucursalData = (ID) => {
        setSelectedValue(ID);
        setSelectedValueNombre(sucursales[ID]);
    }

    const IrScanner = (lineID, nombreLinea) =>{
        var selection = {SucursalID: selectedValue, LineID:lineID, NombreLinea:nombreLinea, NombreSucursal:selectedValueNombre, InventarioEstadoID: false};
        setLineas([]);
        navigation.navigate('inventarioScanner', selection);
    }

    const getLineas = async (text) =>{
        if(text.length > 1){
            setFind(text);
        }else{
            setFind(false);
        }
    }

    const toCerrarLinea = (InventarioEstadoID) => {//Hace referencia a InventarioEstadoID que contiene el id de la linea
        setTipoLogin(0);
        setCerrarLinea(true);//Mostraba el login
        setInventarioEstadoID(InventarioEstadoID);//Alteraba el estado de InventarioEstadoID y accionando el UseEffec
    }

    const toFinalizaConteo = (InventarioEstadoID) => {//Hace referencia a InventarioEstadoID que contiene el id de la linea
        setTipoLogin(3);
        setCerrarLinea(true);//Mostraba el login
        setInventarioEstadoID(InventarioEstadoID);//Alteraba el estado de InventarioEstadoID y accionando el UseEffec
    }


    const checkSatate = (item) =>{
        if(item.Estado == 3){
            return(
                <View style={styles.itemFlatListOpen}>
                    <View style={{flexDirection:'row', alignSelf: 'center',}}>
                        <Text style={styles.ListOpenNombre}>{item.NombreLinea}   </Text>
                        <Text>{item.Conteo}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:10}}>{/*Contenedor botones*/}
                        <TouchableHighlight underlayColor = "rgba(0,0,0,0)" style={styles.btnCerrar} onPress={()=>toCerrarLinea(item.InventarioEstadoID)}><Text style={styles.btn}>Cerrar Linea</Text></TouchableHighlight>
                        <TouchableHighlight underlayColor = "rgba(0,0,0,0)" style={styles.btnValidar} onPress = { () => {navigation.navigate('inventarioValida', item.InventarioEstadoID);} }><Text style={styles.btn}>Validar</Text></TouchableHighlight>
                    </View>{/*fin contenedor botones*/}
                </View>
            );
        }else{
            return(
                <View style={styles.itemFlatListOpen}>
                    <View style={{flexDirection:'row', alignSelf: 'center',}}>
                        <Text style={styles.ListOpenNombre}>{item.NombreLinea}   </Text>
                        <Text>{item.Conteo}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:10}}>{/*Contenedor botones*/}
                        <TouchableHighlight underlayColor = "rgba(0,0,0,0)" style={styles.btnCerrar} onPress={()=>toFinalizaConteo(item.InventarioEstadoID)}><Text style={styles.btn}>Finalizar Conteo</Text></TouchableHighlight>
                        <TouchableHighlight underlayColor = "rgba(0,0,0,0)" style={styles.btnContinuar} onPress = { () => IrScanner(item.LineaID ,item.NombreLinea) }><Text style={styles.btn}>Continuar</Text></TouchableHighlight>
                    </View>{/*fin contenedor botones*/}
                </View>
            );
        }
        
    }

    return(
        <View style={styles.container}>
            <View><Text style={styles.txtTitulo}>Inventario</Text></View>

            <ScrollView style={{flexDirection: 'column'}}>
                <View style={styles.body}>
                    {/*Piker Select Linea*/}
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => setSucursalData(itemValue)}
                        >
                            <Picker.Item label='MATRIZ SA' value="4"/>
                            <Picker.Item label='Suc02 SA' value="5"/>
                            <Picker.Item label='Suc03 SA' value="6"/>
                        </Picker>
                    </View>
                    <TextInput
                        placeholder="Buscar Linea" 
                        selectionColor={'white'}
                        style={styles.inputCategoria}
                        onChangeText={(text)=>getLineas(text)}
                        //onSubmitEditing={ () => IrScanner(1 ,1)}
                    />
                </View>

                <View>
                    <FlatList style={styles.FlatList}
                        data={lineas}
                        renderItem={({item}) =>
                            //Elemento Linea
                            <TouchableHighlight
                                underlayColor = "#EE1F2673"
                                onPress = { () => IrScanner(item.LineaID ,item.NombreLinea) }
                                /*onPress = { () => navigation.navigate('inventarioScanner') }*/
                            >
                                <Text style={styles.itemFlatList}>{item.NombreLinea}</Text>
                            </TouchableHighlight>
                        }
                    />
                </View>
            
                <View><Text style={styles.txtSubTitulo}>Lineas Abiertas</Text></View>

                <View>
                    <FlatList style={styles.FlatListOpen}
                        data={lineasAbiertas}
                        renderItem={({item}) => checkSatate(item)}
                    />
                </View>
            </ScrollView>

            <Modal animationType="fade" visible={cerrarLinea} transparent={true}>{/*Notificacion Finalizar*/}
                <View style={styles.modalScanner}>
                    <View style={styles.modalScannerContainer}>
                        <Text style={styles.modalScannerContainerHeader}>Finalizar Conteo</Text>{/*Titulo Notificacion*/}
                        <Text style={{marginTop: '1%', fontFamily: 'Raleway-Regular', fontSize: 20, textAlign: "center", color: "white"}}>Introduzca contraseña</Text>
                        <TextInput placeholder="Contraseña" secureTextEntry={true} selectionColor={'white'} style={styles.input} onChangeText={ (text) => setPassword(text) }/>{/*Guarda conforme se escribe en useSatate*/}

                        <View style={{flexDirection: 'row'}}>{/*Contenedor botones*/}
                            <TouchableHighlight underlayColor = "rgba(0,0,0,0)" onPress={()=>setCerrarLinea(false)}><Text style={styles.modalOption2}>Cancelar</Text></TouchableHighlight>
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
                        <Text style={{fontSize: 30,fontFamily: 'Raleway-Bold',textAlign: 'center', color: notificacionState.Color, paddingTop:5}}>{notificacionState.Header}</Text>{/*Titulo Notificacion*/}
                    </View>
                    <Text style={styles.NotificacionMessage}>{notificacionState.Message}</Text>
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
