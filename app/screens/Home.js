import React, { useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BaseLayout from '../components/BaseLayout';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }) => {
  const [expanded, setExpanded] = useState(false);
  const [logoAnim] = useState(new Animated.Value(0));

  const toggleTray = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    Animated.timing(logoAnim, {
  
      toValue: newExpanded ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const halfScreenHeight = Dimensions.get('window').height / 2;

  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.content}>
   
        <Animated.Image 
          source={require('../../assets/logo_laranja.png')}
          style={[
            styles.logo,
            { transform: [{ translateY: logoAnim }] }
          ]}
        />

        <View style={[styles.tray, { height: expanded ? halfScreenHeight : 60 }]}>
          <TouchableOpacity onPress={toggleTray} style={styles.trayToggle}>
            <Text style={styles.trayToggleText}>
              {expanded ? '▼' : '▲'}
            </Text>
          </TouchableOpacity>
          {expanded && (
            <View style={styles.trayContent}>
              <View style={styles.cardsContainer}>                
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate("Ingredientes")}
                >
                  <Icon name="flask-outline" size={30} color="#000" />
                  <Text style={styles.cardText}>Ingredientes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate("PontoDeDescarte")}
                >
                  <Icon name="leaf-outline" size={30} color="#000" />
                  <Text style={styles.cardText}>Pontos de Descarte</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate("Produtos")}
                >
                  <Icon name="color-fill-outline" size={30} color="#000" />
                  <Text style={styles.cardText}>Produtos</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 30,
  },
  tray: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#EDDEA4',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  trayToggle: {
    paddingVertical: 10,
  },
  trayToggleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  trayContent: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  cardsContainer: {
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
  },
});

export default Home;
