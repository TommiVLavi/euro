import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useState, useEffect } from 'react';

import { API_URL, API_TOKEN } from '@env';

export default function App() {

  const [currencies, setCurrencies] = useState({
    "GBP": 0.72007,
    "JPY": 107.346001
  });
  const [select, setSelect] = useState('');
  const [amount, setAmount] = useState('');
  const [eur, setEur] = useState('');

  const fetchResult = async () => {
    const url = `http://api.apilayer.com/exchangerates_data/latest`;
    const headers = new Headers();
    headers.append('apikey', API_TOKEN);
  

    try{
      const resp = await fetch(url, { headers });
      const data = await resp.json();
      setCurrencies(data.rates);
      console.log(currencies)
      console.log(data)
    }
    catch(error) {
      Alert.alert("Jokin pieleen meni.", error);
    }
  }

  useEffect(() => { fetchResult() }, [])

  const convert = () => {
    const amountEur = Number(amount) / currencies[select];
    setEur(`${amountEur.toFixed(2)}€`);
  }


  return (
    <View style={styles.container}>
      <Image style={{ width: 200, height: 200 }}
        
      />

      <Text style={{...styles.valuerow, ...styles.text}}> {eur} </Text>
      <View style={styles.inputrow}>
        <TextInput
          placeholder='Maara'
          keyboardType='numeric'
          value={amount}
          onChangeText={text => setAmount(text)}
        />

        <Picker
          style={{ height: 40, width: 100}}
          selectedValue={select}
          onValueChange={(itemValue, itemIndex) => {
            setSelect(itemValue)
            console.log(itemValue, itemIndex)
          }}
        >

          {Object.keys(currencies).sort().map(key => 
          (<Picker.Item label={key} value={key} key={key} />))}
        </Picker>

      </View>
      
      <Button title='Muunna'
        onPress={convert}
      />

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  valuerow: {
    paddingTop: 20,
  },

  inputrow: {
    flexDirection: 'row',
    paddingVertical: 10,
  },

  text: {

  }
});
