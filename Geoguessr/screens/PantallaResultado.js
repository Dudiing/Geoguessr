import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const PantallaResultado = ({ route }) => {

  const navigation = useNavigation();

    const { totalPoints } = route.params;
    const [grade, setGrade] = useState(0);

    const gradeImages = {
      1: Agrade,
      2: Bgrade,
      3: Cgrade,
      4: Fgrade,
    };

    useEffect(() => {
      const calculateGrade = (points) => {
        let avgPoints = points / 5;
        console.log(avgPoints);

        if (avgPoints >= 90 && avgPoints <= 100){
          setGrade(1);
        }
        else if (avgPoints >= 70 && avgPoints <= 89){
          setGrade(2);
        }
        else if (avgPoints >= 50 && avgPoints <= 69){
          setGrade(3);
        }
        else {
          setGrade(4);
        }
      };

      calculateGrade(totalPoints);
      console.log(grade);

  }, []);

    return (
        <View style={styles.textContainer}>
          <Text style={styles.pointsLbl}>TOTAL POINTS</Text>
          <Text style={styles.points}>{totalPoints}/500</Text>
        </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#c2c2c4',
      width: '100%',
      height: '100%',   
  },
  imgContainer: {
  //  backgroundColor: 'blue',
    width: '100%',
    height: '20%',
    alignItems: 'center',

  },
  img: {
    width: '60%',
    height: '80%',
    marginTop: '20%',
  },
  
  gradeContainer: {
    width: '40%',
    height: '20%',
   // backgroundColor: 'green',
    marginTop: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  grade: {
    width: '80%',
    height: '80%',
    alignItems: 'center',
   // backgroundColor: 'yellow',
  },
  textContainer: {
   // backgroundColor: 'blue',
    width: '50%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  pointsLbl: {
    fontSize: 28,
  },
  points: {
    fontSize: 23,
    marginTop: '5%',
  },
  btnContainer: {
    height: '10%',
    width: '40%',
  //  backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 70,
    zIndex: 2,
    marginTop: '10%',
},
btn: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
},

  });

export default PantallaResultado;