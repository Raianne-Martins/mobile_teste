
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import RecuperarSenha from '../screens/RecuperarSenha';
import CadastroUsuario from '../screens/CadastroUsuario';
import Ingredientes from '../screens/Ingredientes';
import Produtos from '../screens/Produtos';
import PontoDeDescarte from '../screens/PontoDeDescarte';
import NovaSenha from '../screens/NovaSenha';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home}  />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
        <Stack.Screen name="NovaSenha" component={NovaSenha} />
        <Stack.Screen name="Ingredientes" component={Ingredientes} />
        <Stack.Screen name="Produtos" component={Produtos} />
        <Stack.Screen name="PontoDeDescarte" component={PontoDeDescarte} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
