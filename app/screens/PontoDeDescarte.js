import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import api from '../services/api';

const PontoDeDescarte = () => {
  const [pontos, setPontos] = useState([]);

  useEffect(() => {
    api.get('/pontos')
      .then(response => setPontos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pontos de Descarte</Text>
      <FlatList 
        data={pontos}
        keyExtractor={(item) => item.id ? String(item.id) : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.nome}</Text>
            <Text>{item.endereco}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#ccc' },
  itemTitle: { fontSize: 18, fontWeight: '600' }
});

export default PontoDeDescarte;
