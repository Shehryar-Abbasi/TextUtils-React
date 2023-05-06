import React, { useState } from "react";
// import { PropTypes } from 'prop-types'

/*********************for email section************************/
const extractEmails = (text) => {
  // Use a regular expression to match email patterns in the text
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(regex);
  // Return an array of all email addresses found in the text
  return matches || [];
};

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase!", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase!", "success");
  };

  const handleFrequentClick = () => {
    // Split the paragraph into an array of words
    const words = text.split(/\W+/);

    // Count the occurrences of each word
    const counts = {};
    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
      if (counts[word]) {
        counts[word]++;
      } else {
        counts[word] = 1;
      }
    }

    // Convert the object of word counts to an array and sort it in descending order
    const countsArray = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    // Update the state variable with the most frequent words
    setWordCounts(countsArray.slice(0, 10));
    props.showAlert("Frequent words shown below!..", "success");
  };

  const handleEmailClick = () => {
    // Extract email addresses from the text
    const extractedEmails = extractEmails(text);
    // Update the state variable with the extracted emails
    setEmails(extractedEmails);
    props.showAlert("See below!", "success");
  };

  const handleCopyClick = () => {
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Copied to clipboard!", "success");
  };

  const handleSpacesClick = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed", "success");
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    setWordCounts([]);
    setEmails([]);
    props.showAlert("Text Cleared!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const [text, setText] = useState("");
  const [wordCounts, setWordCounts] = useState([]);
  const [emails, setEmails] = useState([]);
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black"}}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            placeholder="Enter text here..."
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "#0b2742",
            }}
            id="myBox"
            rows="5"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-success mx-1" onClick={handleFrequentClick}>
          Frequent Words
        </button>
        <button className="btn btn-warning mx-1" onClick={handleEmailClick}>
          Get Email
        </button>
        <button className="btn btn-primary mx-1" onClick={handleCopyClick}>
          Copy Text
        </button>
        <button className="btn btn-primary mx-1" onClick={handleSpacesClick}>
          Remove Extra Spaces
        </button>
        <button className="btn btn-danger mx-1" onClick={handleClearClick}>
          Clear
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h2>Your text summary</h2>
        <p>
          <b>
            {text.split(" ").length} words and {text.length} characters
          </b>
        </p>
        <p>{0.008 * text.split(" ").length} Minutes read </p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Enter something in the textbox above to preview."}</p>
        <ul>
          {wordCounts.map(([word, count]) => (
            <li key={word}>
              {word} ({count})
            </li>
          ))}
        </ul>
        <p>
          <b>Emails found: </b>
          {emails.map((email, index) => (
            <span key={index}>{email}, </span>
          ))}
        </p>
      </div>
    </>
  );
}
