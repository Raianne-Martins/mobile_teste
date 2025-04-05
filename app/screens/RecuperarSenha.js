import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid, Platform } from 'react-native';

const mostrarMensagem = (mensagem) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(mensagem, ToastAndroid.LONG);
  } else {
    Alert.alert('Aviso', mensagem);
  }
};

const RecuperarSenha = () => {
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
      } else {
        const data = await response.json();
        mostrarMensagem(data.error || 'Erro ao enviar o email.');
      }
    } catch (error) {
      mostrarMensagem('Ocorreu um erro: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <TextInput 
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleRecuperacao}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
  button: { backgroundColor: '#F7A072', padding: 15, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default RecuperarSenha;
