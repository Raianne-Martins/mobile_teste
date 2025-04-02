import React from 'react';
import { View, Button, Alert } from 'react-native';
import api from '../services/api'; 

const TesteAPI = () => {
  const testarRegistro = async () => {
    try {
      const response = await api.post('/api/users/register', {
        nome: "Exemplo Usuário",
        email: "exemplo@usuario.com",
        login: "exemplo_login",
        senha: "minhaSenhaSegura",
        perguntaSecreta: "Qual o nome do seu primeiro pet?",
        respostaSecreta: "Rex",
        idTipoUsuario: 2
      });
      Alert.alert("Sucesso", JSON.stringify(response.data));
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Testar Registro" onPress={testarRegistro} />
    </View>
  );
};

export default TesteAPI;
