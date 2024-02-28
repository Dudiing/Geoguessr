import { TouchableOpacity, View, StyleSheet, Image, Text } from "react-native";
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const PantallaPrincipal = ({ navigation }) => {
    
  const onPress = () => {
    navigation.navigate('Game');
    console.log('button clicked');
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
        <View style={styles.btn}>
          <Text>Comenzar Juego</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#c2c2c4',
        alignItems: 'center',
    },
    picContainer: {
        flex: 1,
        width: '100%',
        height: '50%',
    },
    backgroundPic: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        marginTop: '7%',
    },   
    btnContainer: {
        height: '10%',
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 70,
        zIndex: 2,
        marginTop: '10%',
        backgroundColor: 'white', // Color de fondo agregado para visualización
    },
    btn: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2,
    },
});

export default PantallaPrincipal;
