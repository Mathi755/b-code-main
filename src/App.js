import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [language, setLanguage] = useState('C++');
  const [code, setCode] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      problemStatement: "Write a function to reverse a string.",
      testCases: [
        { input: "hello", output: "olleh" },
        { input: "world", output: "dlrow" },
        { input: "12345", output: "54321" },
      ],
    },
    {
      problemStatement: "Write a function to check if a string is a palindrome.",
      testCases: [
        { input: "racecar", output: "true" },
        { input: "hello", output: "false" },
        { input: "madam", output: "true" },
      ],
    },
    // Add more questions as needed
  ];

  // Disable right-click, copy, and paste
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    const disableCopyPaste = (e) => {
      e.preventDefault();
    };

    // Add event listeners for the entire document
    document.addEventListener('contextmenu', disableRightClick); // Disable right-click
    document.addEventListener('copy', disableCopyPaste); // Disable copy
    document.addEventListener('paste', disableCopyPaste); // Disable paste
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && (e.key === 'c' || e.key === 'v')) {
          e.preventDefault();
          alert('Copying and pasting are disabled on this website.');
      }
    });

    // Add event listeners specifically for the code editor
    const codeEditor = document.querySelector('.code-editor');
    if (codeEditor) {
      codeEditor.addEventListener('contextmenu', disableRightClick);
      codeEditor.addEventListener('copy', disableCopyPaste);
      codeEditor.addEventListener('paste', disableCopyPaste);
    }

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('copy', disableCopyPaste);
      document.removeEventListener('paste', disableCopyPaste);

      if (codeEditor) {
        codeEditor.removeEventListener('contextmenu', disableRightClick);
        codeEditor.removeEventListener('copy', disableCopyPaste);
        codeEditor.removeEventListener('paste', disableCopyPaste);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current date and time
    const now = new Date();
    const timestamp = now.toLocaleString(); // Format: "MM/DD/YYYY, HH:MM:SS AM/PM"

    const submission = {
      name,
      college,
      language,
      code,
      timestamp, // Add the timestamp to the submission
    };

    try {
      const response = await axios.post(
        "https://sheetdb.io/api/v1/k74u8n5i97uy4", // Replace with your SheetDB endpoint
        { data: submission }, // SheetDB expects the data to be wrapped in a "data" object
        {
          headers: {
            Authorization: "Bearer YOUR_API_KEY", // Add your API key here
          },
        }
      );

      if (response.status === 201) {
        // 201 means "Created" in HTTP status codes
        alert("Form submitted successfully!");
        // Move to the next question
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setCode(''); // Clear the code editor
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Form submission failed. Please try again.");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      {/* Title */}
      <center> 
        <header className="app-header">
        <div className="text-center p-4 sm:p-6 md:p-8 lg:p-6 xl:p-6">
          <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-7xl font-extrabold bg-white bg-clip-text text-transparent font-aboutfont animate__animated animate__fadeInUp duration-500" style={{textShadow : "0 0 6px white"}}>
      BLINDATHON <br /> {/*<p className='className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold bg-white bg-clip-text text-transparent font-otherfont'>2024-'25</p>*/}
      </h1>
      </div>
        </header>
      </center>

      {/* Main Form */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>College:</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Programming Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            >
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
            </select>
          </div>

          {currentQuestion && (
            <div className="form-group">
              <label>Question:</label>
              <div className="question-text">
                <p>
                  <strong>Problem Statement:</strong> {currentQuestion.problemStatement}
                </p>
                {currentQuestion.testCases.map((testCase, index) => (
                  <p key={index}>
                    <strong>Test Case {index + 1}:</strong> Input: "{testCase.input}" → Output: "{testCase.output}"
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Code:</label>
            <textarea
              className="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      <br></br>
      
      <footer className="app-footer">
        <center>
          <p>Made by TEAM INNOVENTURE</p>
        </center>
      </footer>
    </div>
  );
}

export default App;