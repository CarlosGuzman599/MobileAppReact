import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { login } from '../screens/login';
import { home } from '../screens/home';
import { inventario } from '../screens/inventario';
import { inventarioScanner } from '../screens/inventarioScanner';
import { InventarioValida } from '../screens/inventarioValida';

export type RootStackParams = {
  login:undefined;
  home:{NombreUsuario:string};
  inventario:undefined;
  inventarioScanner:{SucursalID: number, LineID: number, NombreLinea: string, NombreSucursal:string, InventarioEstadoID, string};
  inventarioValida:{InventarioEstadoID, string};
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={login} />
      <Stack.Screen name="home" component={home} />
      <Stack.Screen name="inventario" component={inventario} />
      <Stack.Screen name="inventarioScanner" component={inventarioScanner} />
      <Stack.Screen name="inventarioValida" component={InventarioValida} />
    </Stack.Navigator>
  );
}