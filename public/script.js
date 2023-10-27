const textArea = document.getElementById("text_to_summarize");

const summarizedTextArea = document.getElementById("summary");

const submitButton = document.getElementById("submit-button");

const urlTextArea = document.getElementById("image_to_text");

const submitButtonForImage = document.getElementById("submit-button-img");

const generatedTextArea = document.getElementById("image-text-summary");



textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

submitButtonForImage.addEventListener("click", submitForTextFromImage);
urlTextArea.addEventListener("input", validateIfHttps);

// First, we disable the submit button by default when the user loads the website.
submitButton.disabled = true;
submitButtonForImage.disabled = true;

// Next, we define a function called verifyTextLength(). This function will be called when the user enters something in the text area. It receives an event, called ‘e’ here
function verifyTextLength(e) {

  // The e.target property gives us the HTML element that triggered the event, which in this case is the textarea. We save this to a variable called ‘textarea’
  const textarea = e.target;

  // Check if the text in the text area is the right length - between 200 and 100,000 characters
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    // If it is, we enable the submit button.
    submitButton.disabled = false;
  } else {
    // If it is not, we disable the submit button.
    submitButton.disabled = true;
  }
}

function validateIfHttps(e) {
  const textarea = e.target;
  const userInput = textarea.value.trim(); // Remove leading and trailing spaces

  // Regular expression to check if userInput starts with "https://"
  const httpsPattern = /^https:/i;

  if (httpsPattern.test(userInput)) {
    // Input starts with "https://"
    submitButtonForImage.disabled = false
  } else {
    // Input doesn't start with "https://"
    submitButtonForImage.disabled = true
  }
}

function submitData(e) {

  // This is used to add animation to the submit button
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  // INSERT CODE SNIPPET FROM POSTMAN BELOW
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Note - here we can omit the “baseUrl” we needed in Postman and just use a relative path to “/summarize” because we will be calling the API from our Replit!  
  fetch('/summarize', requestOptions)
    .then(response => response.text()) // Response will be summarized text
    .then(summary => {
      // Do something with the summary response from the back end API!

      // Update the output text area with new summary
      summarizedTextArea.value = summary;

      // Stop the spinning loading animation
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.log(error.message);
    });

}


function submitForTextFromImage(e){
  // This is used to add animation to the submit button
  submitButtonForImage.classList.add("submit-button--loading");

  const url_to_convert = urlTextArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "url_to_convert": url_to_convert
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("/image-to-text", requestOptions)
    .then(response => response.text())
    .then(finalText => {
      // Update the output text area with new summary
      generatedTextArea.value = finalText;

      // Stop the spinning loading animation
      submitButtonForImage.classList.remove("submit-button--loading");
    })
    .catch(
      error => console.log('error', error.message)
    );
}


// handle submit for image generation
function submitDataForImage(e) {
  // This is used to add animation to the submit button
  submitButtonForImage.classList.add("submit-button--loading");

  const text_to_convert = txtImgArea.value;

  // INSERT CODE SNIPPET FROM POSTMAN BELOW
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_convert": text_to_convert
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Note - here we can omit the “baseUrl” we needed in Postman and just use a relative path to “/summarize” because we will be calling the API from our Replit!  
  fetch('/generate-image', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    }) // Response will be summarized text
    .then(blob => {
      // const imgUrl = URL.createObjectURL(blob);
      // newGenImage.src = imgUrl;
      // alert("Image generated fine!");
      // // Stop the spinning loading animation
      // const newFile = new File([blob], 'image.jpeg', {
      //     type: blob.type,
      // });
      const myFile = new File([blob], 'image.jpeg', {
        type: blob.type,
      });

      // Create a URL for the File
      const fileUrl = URL.createObjectURL(myFile);
      newGenImage.src = fileUrl;

      alert("Image generated fine!");
      
      // console.log(blob);
      submitButtonForImage.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.log("FrontEND ERRORRRRRRRRRRR",error.message);
      alert("An error occurred!!", error.message);
    });
}
