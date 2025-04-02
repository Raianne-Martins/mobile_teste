import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
    console.log('Home renderizada!');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Cosmepedia mobile!</Text>
      

      <View style={styles.accessContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('CadastroUsuario')}
        >
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Pesquise:</Text>
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => navigation.navigate('Ingredientes')}
        >
          <Text style={styles.searchButtonText}>Ingredientes</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => navigation.navigate('Produtos')}
        >
          <Text style={styles.searchButtonText}>Produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => navigation.navigate('PontoDeDescarte')}
        >
          <Text style={styles.searchButtonText}>Ponto de Descarte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  accessContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  searchButton: {
    backgroundColor: '#03DAC5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Home;
