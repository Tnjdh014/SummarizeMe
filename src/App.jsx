import React, { useState } from 'react';
import SummaryComponent from './SummaryComponent'; // Import SummaryComponent

function App() {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Please select a PDF file.');
    }
  };

  return (
    <div className="App">
      <h1>PDF Summarizer</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <SummaryComponent pdfFile={pdfFile} /> {/* Pass pdfFile as prop to SummaryComponent */}
    </div>
  );
}

export default App;

