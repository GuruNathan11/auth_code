// const axios = require('axios');

// const clientId = 'c8a66708-b64b-4b0e-a59b-b3b396dd3837';
//  const clientSecret = '209a3d46-9fb6-4b4c-8cee-2478b6884022';
// const redirectUri = 'http://localhost:3000/ds/callback';
// const authorizationCode = `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=${clientId}&redirect_uri=${redirectUri}`;

// const url = `https://account-d.docusign.com/oauth/token`;

// const data = {
//   code: authorizationCode,
//   grant_type: 'authorization_code',
// };

// const config = {
//   headers: {
//     'Content-Type': 'application/json'
//   }
// };

// axios.post(url, data, config)
//   .then(response => {
//     console.log(response.data);
//     // use the access_token in response.data.access_token for API calls
//   })
//   .catch(error => {
//     console.error(error.response.data);
//   });

// const express = require('express');
// const axios = require('axios');
// const qs = require('qs');

// const app = express();
// const port = 3000;

// // DocuSign account settings
// const clientId = '3488934a-c517-45ca-8533-e24f1b61fb9a';
//  const clientSecret = '209a3d46-9fb6-4b4c-8cee-2478b6884022';
// const redirectUri = 'http://localhost:3000/ds/callback';
// const authorizationEndpoint = 'https://account-d.docusign.com/oauth/auth';
// const tokenEndpoint = 'https://account-d.docusign.com/oauth/token';

// // Routes
// app.get('/', (req, res) => {
//     // Redirect to DocuSign authorization endpoint to obtain an authorization code
//     const authUrl = `${authorizationEndpoint}?response_type=code&scope=signature&client_id=${clientId}&redirect_uri=${redirectUri}`;
//     res.redirect(authUrl);
//   });
  
//   app.post('/callback', async (req, res) => {
//     const authorizationCode = req.body.code;
  
//     try {
//       // Exchange the authorization code for an access token
//       const response = await axios.post(
//         tokenEndpoint,
//         qs.stringify({
//           grant_type: 'authorization_code',
//           code: authorizationCode,
//           redirect_uri: redirectUri,
//           client_id: clientId,
//           client_secret: clientSecret,
//           scope: 'signature'
//         })
//       );
  
//       const accessToken = response.data.access_token;
  
//       // Use the access token to make API requests to DocuSign
//       // ...
      
//       console.log(`Authorization code: ${authorizationCode}`);
//       console.log(`Access token: ${accessToken}`);
  
//       res.send(`Authorization code: ${authorizationCode}`);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error');
//     }
//   });
  

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

const express = require('express');
const axios = require('axios');
const qs = require('qs');

const app = express();
const port = 3000;

// DocuSign account settings
const clientId = '3488934a-c517-45ca-8533-e24f1b61fb9a';
const clientSecret = '209a3d46-9fb6-4b4c-8cee-2478b6884022';
const redirectUri = 'http://localhost:3000/ds/callback';
const authorizationEndpoint = 'https://account-d.docusign.com/oauth/auth';
const tokenEndpoint = 'https://account-d.docusign.com/oauth/token';

// Routes
app.get('/', (req, res) => {
  // Redirect to DocuSign authorization endpoint to obtain an authorization code
  const authUrl = `${authorizationEndpoint}?response_type=code&scope=signature&client_id=${clientId}&redirect_uri=${redirectUri}`;
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const authorizationCode = req.query.code;

  try {
    // Exchange the authorization code for an access token
   
    const response = await axios.post(
      tokenEndpoint,
      qs.stringify({
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'signature'
      })
    );

    const accessToken = response.data.access_token;

    // Use the access token to make API requests to DocuSign
    // ...
    
    res.send(`Access token: ${accessToken}`);
    
  } catch (error) {
    console.error(error);
   
    res.status(500).send('Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
