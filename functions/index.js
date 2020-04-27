const functions = require('firebase-functions');
const admin = require('firebase-admin');
// admin.initializeApp();

var serviceAccount = require("../keys/anonibus-23bbf-firebase-adminsdk-8t52x-c8fcb49974.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://anonibus-23bbf.firebaseio.com"
});



let db = admin.firestore();

exports.enviarMensagem = functions.https.onRequest((request, response) => {

  let queryRef = db.collection('chats')
    .doc('sala_01').collection('mensagens').doc();

  queryRef.set({
    mensagem: request.body.mensagem,
    usuario: request.body.usuario,
    avatar: request.body.avatar
  }).then(function () {
    response.json({ "ok": true })
  }).catch(function (err) {
    response.json({ "error": true })
  });
})



exports.haversine = functions.https.onRequest((request, response) => {

  const start = {
    latitude: 30.849635,
    longitude: -83.24559
  }

  const end = {
    latitude: 27.950575,
    longitude: -82.457178
  }

  response.json({
    'distance': haversine(start, end, { unit: 'meter' })
  });

})


exports.saveme2 = functions.https.onRequest((request, response) => {


  let cityRef = db.collection('cities').doc('teste25');

  cityRef.set({
    capital: true
  }, { merge: true }).then(function () {
    console.log('oi')
    response.json({ "ok": true })
  }).catch(function (err) {
    response.json({ "error": true })
  });



})

exports.myFunction = functions.firestore
  .document('cities/{docid}')
  .onWrite((change, context) => {

    let cityRef = db.collection('log').doc('teste24-1');

    cityRef.set({
      capital: true
    }, { merge: true }).then(function () {
      console.log('oi')
      response.json({ "ok": true })
    }).catch(function (err) {
      response.json({ "error": true })
    });

  });