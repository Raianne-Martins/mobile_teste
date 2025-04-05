import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BaseLayout from '../components/BaseLayout';

const Home = ({ navigation }) => {
  
  const [expanded, setExpanded] = useState(false);
  

  const toggleTray = () => {
    setExpanded(!expanded);
  };


  const halfScreenHeight = Dimensions.get('window').height / 2;

  return (
    <BaseLayout navigation={navigation}>
     
      <View style={styles.content}>
       
        <Image 
          source={require('../../assets/logo_laranja.png')}
          style={styles.logo}
        />

        
        <View style={[styles.tray, { height: expanded ? halfScreenHeight : 60 }]}>
          <TouchableOpacity onPress={toggleTray} style={styles.trayToggle}>
            <Text style={styles.trayToggleText}>
              {expanded ? '▼' : '▲'}
            </Text>
          </TouchableOpacity>
          {expanded && (
            <View style={styles.trayContent}>
              <Text style={styles.trayContentText}>Ingredientes</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  icon: {
    marginHorizontal: 10, 
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
  },
  trayContentText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Home;
