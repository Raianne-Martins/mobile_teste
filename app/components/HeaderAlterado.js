import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderAlterado = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>

  <View style={styles.iconsContainer}>

   <View style={styles.starIconContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Ionicons name="star" size={28} color="#fff" />
    </TouchableOpacity>
   </View>

  <View style={styles.rightIconsContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('Produtos')}>
      <MaterialCommunityIcons name="pot-mix-outline" size={28} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Ingredientes')}>
      <Ionicons name="flask-outline" size={28} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('PontoDeDescarte')}>
      <Entypo name="location" size={28} color="#fff" />
    </TouchableOpacity>
    </View>
    </View>


      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Login')}
        >
        <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('CadastroUsuario')}
        >
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingVertical: 40,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%', 
    paddingVertical: 20,
    backgroundColor: '#F7A072',
  },
  starIconContainer: {
    marginLeft: 20, 
  },
  rightIconsContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 15, 
    marginRight: 10,
  },
  
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    backgroundColor: '#EDDEA4',
  },
  button: {
    backgroundColor: '#F9F7F3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default HeaderAlterado;
