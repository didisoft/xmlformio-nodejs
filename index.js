//**************************************************
// 
// xmlform.io Demo backend with NodeJS and Express
//
// License: MIT
//
//**************************************************

//********************************
// JWT Authentication Credentials
// from xmlform.io 'API Key' section
//********************************
const CLIENT_ID = ''; // Fill in here your xmlform.io Client ID
const CLIENT_SECRET = ''; // Fill in here your xmlform.io Client Secret

const express = require('express')
const path = require('node:path');
const bodyParser = require('body-parser');
const fs = require('fs');
//const xmlform = require('../dist/index.js'); 
const xmlform = require('@xmlformio/api'); 

const port = 3000
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));

var api = new xmlform.XmlformioApi();
var xml = "";
var token = null;

///////////////////////////////
//
// Allow Ajax from browser if this backend is not the one serving the Form rendering HTML
//
///////////////////////////////
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
	next();
});



///////////////////////////////
//
// GET / render xmlform.io form
//
///////////////////////////////
app.get('/', (req, res) => {
    const options = {
        root: path.join(__dirname)
    };

    const fileName = 'form.html';
	
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})


///////////////////////////////
//
// POST / hanlde XML Form post
//
///////////////////////////////
app.post('/', (req, res) => {
  let formDataRaw = req.body.data;
  let formData = JSON.parse(formDataRaw);
  
  //
  // Invoke xmlform.io REST API to conver the raw submitted form JSON into XML    
  //
  api.formToXml(formData.data, function done(error, data, response) {
		if(error) {
            console.error('Error: ', error);
            res.sendStatus(500);
        } else {
			
			// 
			// Return result XML form data to the browser
			// in a rea world application wer are usually going to save the XML 
			// and redirect the user to another page 
			//
			res.set('Content-Type', 'application/xml');
			res.send(data);			
        }  	  
  }); 
})

/* 

app.get('/load-data/', (req, res) => {
  const fileContents = fs.readFileSync(XML_FILE).toString()
  
  api.xmlToForm(fileContents, function done(error, data, response) {
		if(error) {
            //handle error
            console.error('Error: ', error);
            res.sendStatus(500);
        } else {			
			res.set('Content-Type', 'application/json');
			res.send(data);			
        }  	  
  });   
})

app.get('/xml/', (req, res) => {
  res.send(xml);
})
*/

if (CLIENT_ID === '' || CLIENT_SECRET === '')
	throw new Error('\x1b[31mPlease fill in the CLIENT_ID and CLIENT_SECRET constants, with your cerdentials from the xmlform.io "API Key" dashboard section!\x1b[0m');

app.listen(port, () => {  	

  //
  // Prepare xmlform.io JWT auth data
  //
  var jwtRequest = new xmlform.JwtLoginRequest();
  jwtRequest.client_id = CLIENT_ID;
  jwtRequest.client_secret = CLIENT_SECRET;

  //
  // Execure xmlform.io JWT auth call
  //  
  api.jwtLogin(jwtRequest, function done(error, data, response) {
		if(error) {
            console.error('Error: ', error);
        } else {	 
			token = data.token;
			//
			// Set the current JWT token to be used on all subsequent API calls
			//
			api.apiClient.authentications['bearerAuth'].accessToken = token;			
		}
  });
	
  console.log(`xmlform.io Example backend listening on port ${port}`);
})