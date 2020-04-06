const functions = require('firebase-functions');
const haversine = require('haversine')

exports.haversine = functions.https.onRequest((request, response) => {

  //response.json(request.body)

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

});