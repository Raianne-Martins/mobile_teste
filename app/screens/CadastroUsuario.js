import React, { useState } from 'react';
import api from '../services/api';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid, Platform } from 'react-native';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import { Picker } from '@react-native-picker/picker';
import BaseLayout from '../components/BaseLayout';

const mostrarMensagem = (mensagem) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(mensagem, ToastAndroid.LONG);
  } else {
    Alert.alert('Aviso', mensagem);
  }
};

const CadastroUsuario = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perguntasecreta, setPerguntaSecreta] = useState('');
  const [respostasecreta, setRespostaSecreta] = useState('');
  const [tipousuario, setTipoUsuario] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');

  const perguntas = [
    'Qual o nome do seu primeiro pet?',
    'Qual o nome do seu primeiro namorado(a)?',
    'Qual cidade você nasceu?',
    'Qual o nome da maternidade que você nasceu?',
    'Qual o nome do seu professor favorito?'
  ];

  const tiposUsuario = [
    { label: 'Geral', value: 'Geral' },
    { label: 'Empresa', value: 'Empresa' },
    { label: 'Administrador', value: 'Administrador' },
  ];

  const handleCadastro = async () => {
    console.log("handleCadastro acionado");
    
    if (tipousuario === '') {
      mostrarMensagem('Por favor, selecione o tipo de usuário.');
      return;
    }
    if (tipousuario === 'Empresa') {
      if (!cnpjValidator.isValid(cnpj)) {
        mostrarMensagem('CNPJ inválido.');
        return;
      }
    } else {
      if (!cpfValidator.isValid(cpf)) {
        mostrarMensagem('CPF inválido.');
        return;
      }
    }

    try {
      const payload = {
        nome,
        email,
        login: email, 
        senha,
        perguntaSecreta: perguntasecreta,
        respostaSecreta: respostasecreta,
        tipoUsuario: tipousuario,
      };

      if (tipousuario === 'Empresa') {
        payload.cnpj = cnpj;
      } else {
        payload.cpf = cpf;
      }

      console.log("Dados enviados:", payload);
      const response = await api.post('/api/users/register', payload);

      console.log("Resposta do servidor:", response);
    
      if (response.status === 200) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Erro no Cadastro", response.data.error || "Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no handleCadastro:", error);
      Alert.alert("Erro", "Ocorreu um erro: " + error.message);
    }
  };

  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>CADASTRO</Text>
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
        <Picker
         selectedValue={perguntasecreta}
         style={styles.picker}
         onValueChange={(itemValue) => setPerguntaSecreta(itemValue)}
        >
        <Picker.Item label="Escolha sua pergunta de segurança" value="" />
         {perguntas.map((pergunta, index) => (
        <Picker.Item key={index} label={pergunta} value={pergunta} />
        ))}
        </Picker>

        <TextInput 
          style={styles.input} 
          placeholder="Resposta da pergunta de segurança" 
          secureTextEntry 
          value={respostasecreta} 
          onChangeText={setRespostaSecreta}
        />

        <Picker
          selectedValue={tipousuario}
          style={styles.picker}
          onValueChange={(itemValue) => setTipoUsuario(itemValue)}
        >
          <Picker.Item label="Selecione o tipo de usuário" value="" />
          {tiposUsuario.map((tipo, index) => (
            <Picker.Item key={index} label={tipo.label} value={tipo.value} />
          ))}
        </Picker>

        {tipousuario === 'Empresa' ? (
          <TextInput 
            style={styles.input} 
            placeholder="CNPJ" 
            value={cnpj} 
            onChangeText={setCnpj}
          />
        ) : (
          <TextInput 
            style={styles.input} 
            placeholder="CPF" 
            value={cpf} 
            onChangeText={setCpf}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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
    backgroundColor: '#F9F7F3'
  },
  title: { 
    fontSize: 50, 
    fontWeight: 'bold', 
    marginBottom: 20,
    textAlign: 'center',
    color: '#F7A072',
    transform: [{ translateY: -30 }],
  },
  input: { 
    width: '100%', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    padding: 10, 
    marginBottom: 15 ,
  },
  picker: {
    width: '100%', 
    height: 60, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    marginBottom: 15,
  },
  button: { 
    backgroundColor: 'blue', 
    padding: 10, 
    borderRadius: 5 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16 
  },
});

export default CadastroUsuario;
