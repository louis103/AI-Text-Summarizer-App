const axios = require('axios');

generateTextFromImage = async (urltext) => {
  let data = JSON.stringify({
    "inputs": urltext
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    data : data
  };
  
  try {
    const response = await axios.request(config);
    return response.data[0].generated_text;
  }
  catch (error) {
    console.log("Backend error", error);
  }
  
}

// Allows for generateTextFromImage() to be called outside of this file
module.exports = generateTextFromImage;