---
## Demo Backend for xmlform.io Web forms made with NodeJS and Express
---

This Application is a NodeJS/Express project that illustrates, how to serve a web form created with [xmlform.io](https://xmlform.io) 
and how to handle the submitted form data and convert it back to XML with the help of xmlform.io REST API client

## Project Setup

Follow the steps below in order to run this demo Node project.

#### 1. clone this repo:

    git clone https://github.com/didisoft/xmlformio-nodejs.git
    
#### 2. install the required Node modules:

    npm install
   
#### 3. set your CLIENT_ID and CLIENT_SECRET at the top of index.js

    const CLIENT_ID = ''; // Fill in here your xmlform.io Client ID
    const CLIENT_SECRET = ''; // Fill in here your xmlform.io Client Secret

#### 4. run the project

    node index.js
    
## Extending this project

 You can extend this project by adopting it to your use cases and implement logic for storing/loading your XML data.
 
 
* [xmlform.io REST Client Documentation](https://xmlform.io/docs/backend/) (Tutorial chapter describing this demo)

## Missing something?

If you think that something is missing or have ideas how can this demo project be improved, please don't hesitate to drop us a line [xmlform.io/contact](https://xmlform.io/contact).
