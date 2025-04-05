import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderAlterado from './HeaderAlterado'; 

const BaseLayout = ({ children, navigation }) => {
  return (
    <View style={styles.container}>
     
      <HeaderAlterado navigation={navigation} />

      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F3',
  },
  content: {
    flex: 1,
  },
});

export default BaseLayout;

