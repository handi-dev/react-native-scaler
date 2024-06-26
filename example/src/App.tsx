import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { initScalers } from 'react-native-scaler';
const { moderateScaleWidth, ScaledSheet } = initScalers();

const scaledStyles = ScaledSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '250@mw0.2',
    height: '80@mw',
    borderColor: '#696969',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '25@sh',
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: -1,
    },
  },
  text: {
    fontSize: moderateScaleWidth(20),
    fontWeight: 'bold',
  },
});

const regularStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 250,
    height: 80,
    borderColor: '#696969',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: -1,
    },
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const Home = () => {
  const [isRegular, setIsRegular] = useState(false);

  let styles = isRegular ? regularStyles : scaledStyles;
  const onChange = () => {
    setIsRegular((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>First Example</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>Second Example</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onChange}>
        <Text>Switch to: </Text>
        <Text style={styles.text}>{isRegular ? 'Scaled' : 'Regular'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
