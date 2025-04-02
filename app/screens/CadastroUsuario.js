import React, { useState } from 'react';
import api from '../services/api';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CadastroUsuario = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perguntasecreta, setPerguntaSecreta] = useState('Escolha sua pergunta de segurança');
  const [respostasecreta, setRespostaSecreta] = useState('');
  const [tipousuario, setTipoUsuario] = useState('Selecione o tipo de usuário');
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
      <TextInput 
        style={styles.input} 
        placeholder="Pergunta Secreta" 
        value={perguntasecreta} 
        editable={false}
      />
      <Picker
        selectedValue={perguntasecreta}
        style={styles.picker}
        onValueChange={(itemValue) => setPerguntaSecreta(itemValue)}
      >

        {perguntas.map((pergunta, index) => (
          <Picker.Item key={index} label={pergunta} value={pergunta} />
        ))}
      </Picker>

      <TextInput 
        style={styles.input} 
        placeholder="Resposta da Pergunta Secreta" 
        secureTextEntry 
        value={respostasecreta} 
        onChangeText={setRespostaSecreta}
      />

      <TextInput 
        style={styles.input} 
        placeholder="Tipo de Usuário" 
        value={tipousuario} 
        editable={false}
      />
      <Picker
        selectedValue={tipousuario}
        style={styles.picker}
        onValueChange={(itemValue) => setTipoUsuario(itemValue)}
      >
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
  picker: {
    width: '100%', 
    height: 50, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    marginBottom: 15,
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
