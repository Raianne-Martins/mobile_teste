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

const RecuperarSenha = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleRecuperacao = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/users/recuperar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        mostrarMensagem('Token para recuperação de email enviada. Confira sua caixa de entrada');
        navigation.navigate('NovaSenha');
      } else {
        const data = await response.json();
        mostrarMensagem(data.error || 'Erro ao enviar o email.');
      }
    } catch (error) {
      mostrarMensagem('Ocorreu um erro: ' + error.message);
    }
  };

  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Redefinir Senha</Text>
        <Text style={styles.label}>Informe seu e-mail de acesso:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleRecuperacao}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </BaseLayout>
)};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', transform: [{ translateY: -80 }] },
  title: { fontSize: 60, fontWeight: 'bold', marginBottom: 20, color: '#F7A072', textAlign: 'center', transform: [{ translateY: -50 }]},
  label: {fontSize: 18, marginBottom: 15,},
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15,  shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, shadowRadius: 3.84,  },
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default RecuperarSenha;
