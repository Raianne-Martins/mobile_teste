import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BaseLayout from '../components/BaseLayout';

const RedefinirSenha = ({ navigation }) => {
  const perguntas = [
    'Qual o nome do seu primeiro pet?',
    'Qual o nome do seu primeiro namorado(a)?',
    'Qual cidade você nasceu?',
    'Qual o nome da maternidade que você nasceu?',
    'Qual o nome do seu professor favorito?'
  ];

  const [selectedPergunta, setSelectedPergunta] = useState(perguntas[0]);
  const [respostaSecreta, setRespostaSecreta] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRedefinir = async () => {

    if (!respostaSecreta || !novaSenha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não conferem.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:3000/api/users/redefinir-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pergunta: selectedPergunta,
          respostaSecreta,
          novaSenha,
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
        navigation.navigate('Login');
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.error || 'Erro ao redefinir a senha.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro: ' + error.message);
    }
  };

  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirmar Senha</Text>
        <Text style={styles.label}>Selecione sua pergunta secreta: </Text>
        <Picker
          selectedValue={selectedPergunta}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedPergunta(itemValue)}
        >
          {perguntas.map((pergunta, index) => (
            <Picker.Item key={index} label={pergunta} value={pergunta} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Resposta Secreta"
          value={respostaSecreta}
          onChangeText={setRespostaSecreta}
        />
        <TextInput
          style={styles.input}
          placeholder="Nova Senha"
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Nova Senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        <TouchableOpacity style={styles.button} onPress={handleRedefinir}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F7F3',
    transform: [{ translateY: -40 }],
  },
  title: { 
    fontSize: 60, 
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F7A072',
    textAlign: 'center',
    transform: [{ translateY: -50 }],
},
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  picker: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RedefinirSenha;
