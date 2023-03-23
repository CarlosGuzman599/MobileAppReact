import React from 'react'
import { Text, View, Image, TouchableHighlight, ImageBackground } from "react-native";
import { styles } from '../styles/homeStyles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';
import { ScrollView } from 'react-native-gesture-handler';
interface Props extends StackScreenProps<RootStackParams, 'home'>{};

export const home = ({ navigation,route }: Props) => {
  return(
    <View style={styles.container}>
      <View style={{ flexDirection: 'row',}}>
        <Image source={require('../assets/img/logo-small.png')} style={styles.banner}/>
      </View>

      <View style={{ flexDirection: 'row', padding: 15, }}>
        <Image source={require('../assets/img/user.png')} style={styles.imgUser}/>
        <Text style={styles.txtUser}>{route.params.NombreUsuario}</Text>
      </View>

      <ScrollView>
        <View style={styles.functions}>

          <View style={styles.function}>
            <TouchableHighlight
              nextFocusRight = {1}
              activeOpacity = {1}
              underlayColor = "#3A4F6D"
              onPress = { () => navigation.navigate('inventario') }
            >
              <ImageBackground source={require('../assets/img/img-inventario.png')} style={styles.imgButton} imageStyle={{ borderRadius: 20}}/>
            </TouchableHighlight>
          </View>

          <View style={styles.function}>
            <TouchableHighlight
              nextFocusRight = {1}
              activeOpacity = {1}
              underlayColor = "#3A4F6D"
            >
              <ImageBackground source={require('../assets/img/img-catalogo.png')} style={styles.imgButton} imageStyle={{ borderRadius: 20}}/>
            </TouchableHighlight>
          </View>

          <View style={styles.function}>
            <TouchableHighlight
              nextFocusRight = {1}
              activeOpacity = {1}
              underlayColor = "#3A4F6D"
            >
              <ImageBackground source={require('../assets/img/img-traspasos.png')} style={styles.imgButton} imageStyle={{ borderRadius: 20}}/>
            </TouchableHighlight>
          </View>

        </View>
      </ScrollView>

    </View>
  );
};
