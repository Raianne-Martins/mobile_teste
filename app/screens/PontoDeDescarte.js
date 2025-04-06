import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseLayout from '../components/BaseLayout';

const PontoDeDescarte = ({ navigation }) => {
  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Ponto de Descarte</Text>
        <Text style={styles.description}>
        Página em desenvolvimento
        </Text>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
  },
});

export default PontoDeDescarte;
