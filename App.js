import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, YellowBox, TouchableOpacity } from 'react-native';
import firebase from './config/firebase';
import axios from './services/axios';

YellowBox.ignoreWarnings(['Setting a timer']);

export default function App() {

  const db = firebase.firestore();
  const [mensagens, setMensagens] = useState([])
  const [distance, setDistance] = useState(null)

  useEffect(() => {
    let mensagens_enviadas = []
    const unsubscribe = db.collection("mensagens")
      .onSnapshot({ includeMetadataChanges: false }, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            const { mensagem } = change.doc.data()
            const id = change.doc.id
            mensagens_enviadas.push({ mensagem, id })
          }
        })
        setMensagens([...mensagens_enviadas])
      })
    return () => {
      unsubscribe()
    }
  }, [])

  const salvar = () => {
    let json = {
      mensagem: "Ola"
    }
    db.collection("mensagens").add(json)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        json.id = docRef.id
        setMensagens([...mensagens, json])
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  const handleHaversine = () => {
    axios.post('/haversine', {
      latitude: 99.123123,
      longitude: 20.312333
    })
      .then(function (response) {
        setDistance(response.data.distance)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text>{distance}</Text>

      <TouchableOpacity onPress={handleHaversine}>
        <Text>Chamar Haversine</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={salvar}>
        <Text>Gerar novo registro!!</Text>
      </TouchableOpacity>

      {mensagens.length > 0 && mensagens.map(item => (
        <Text key={item.id}>{item.id}</Text>
      ))}
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
});
