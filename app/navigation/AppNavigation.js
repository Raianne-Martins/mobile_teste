
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import CadastroUsuario from '../screens/CadastroUsuario';
import Ingredientes from '../screens/Ingredientes';
import Produtos from '../screens/Produtos';
import PontoDeDescarte from '../screens/PontoDeDescarte';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Cosmepedia' }} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Ingredientes" component={Ingredientes} />
        <Stack.Screen name="Produtos" component={Produtos} />
        <Stack.Screen name="PontoDeDescarte" component={PontoDeDescarte} options={{ title: 'Pontos de Descarte' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
