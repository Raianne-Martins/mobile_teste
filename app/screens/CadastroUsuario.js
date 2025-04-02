// src/screens/CadastroUsuario.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const CadastroUsuario = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perguntasecreta, setPerguntaSecreta] = useState('');
  const [respostasecreta, setRespostaSecreta] = useState('');

  const handleCadastro = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          login: email, 
          senha,
          perguntaSecreta: perguntasecreta,
          respostaSecreta: respostasecreta,
          idTipoUsuario: 2  
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Erro no Cadastro", data.error || "Tente novamente.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nome" 
        value={nome} 
        onChangeText={setNome} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        secureTextEntry 
        value={senha} 
        onChangeText={setSenha}
      />
      {/* Colocar um dropdown para escolher a pergunta secreta */}
      <TextInput 
        style={styles.input} 
        placeholder="Pergunta Secreta" 
        value={perguntasecreta} 
        onChangeText={setPerguntaSecreta}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Resposta Pergunta Secreta" 
        secureTextEntry 
        value={respostasecreta} 
        onChangeText={setRespostaSecreta}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  input: { 
    width: '100%', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    padding: 10, 
    marginBottom: 15 
  },
  button: { 
    backgroundColor: '#6200EE', 
    padding: 15, 
    borderRadius: 5 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16 
  },
});

export default CadastroUsuario;
