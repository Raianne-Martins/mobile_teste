import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid, Platform } from 'react-native';
import BaseLayout from '../components/BaseLayout'; 

const mostrarMensagem = (mensagem) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(mensagem, ToastAndroid.LONG);
  } else {
    Alert.alert('Aviso', mensagem);
  }
};

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email, 
          senha: senha
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro no Login', data.error || 'Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro: ' + error.message);
    }
  };

  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>LOGIN</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
          <Text style={{ color: '#778899', textAlign: 'center', marginTop: 10, gap: 10, }}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
          <Text style={{ color: '#778899', textAlign: 'center', marginTop: 10, gap: 10,padding:10 }}>Registre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#F9F7F3' },
  title: { fontSize: 46, fontWeight: 'bold', marginBottom: 20, color: '#F7A072', textAlign: 'center', transform: [{ translateY: -40 }], },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5,},
  buttonText: { color: '#fff', fontSize: 16 },
});

export default Login;
