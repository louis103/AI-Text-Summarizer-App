const express = require('express');
const app = express();
const port = 3000;
const summarizeText = require('./summarize.js');
const generateImage = require('./generate_image.js');

const generateTextFromImage = require('./generate_text_from_image.js');

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

// Handle POST requests to the '/summarize' endpoint
app.post('/summarize', (req, res) => {

  // TODO: handle POST /summarize request
  // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

  // call your summarizeText function, passing in the text from the request
  summarizeText(text)
    .then(response => {
      res.send(response); // Send the summary text as a response to the client
    })
    .catch(error => {
      console.log(error.message);
    });

});

// Adding endpoint to generate image from text
app.post('/generate-image', (req, res) => {
  // TODO: handle POST /generate-image request
  // get the text_to_summarize property from the request body
  const text = req.body.text_to_convert;

  // call your summarizeText function, passing in the text from the request
  generateImage(text)
    .then(response => {
      // Set the Content-Type header to "image/jpeg"
      res.set('Content-Type', 'image/jpeg');
      res.send(response); // Send the summary text as a response to the client
    })
    .catch(error => {
      console.log(error.message);
    });
});

// handling image to text analysis
app.post('/image-to-text', (req, res) => {
  // TODO: handle POST /summarize request
  // get the text_to_summarize property from the request body
  const text = req.body.url_to_convert;

  // call your summarizeText function, passing in the text from the request
  generateTextFromImage(text)
    .then(response => {
      res.send(response); // Send the summary text as a response to the client
    })
    .catch(error => {
      console.log(error.message);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
