import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [veinColor, setVeinColor] = useState(''); 

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleGuideDownload = () => {
    if (result && result.season_prediction && undertone) {
      const undertonePrefix = undertone.split(" ")[0].toLowerCase(); 
      const seasonFileName = result.season_prediction.toLowerCase(); 
      const pdfFileName = `${undertonePrefix} ${seasonFileName}.pdf`; 
      window.open(`/pdf/${pdfFileName}`, "_blank");
    } else {
      alert("No season prediction available.");
    }
  };  

  const handleVeinColorChange = (e) => {
    setVeinColor(e.target.value);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload an image.");
      return;
    }
    if (!veinColor) {
      alert("Please select your vein color.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("vein_color", veinColor); 

    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResult(response.data);
      setErrorMsg('');
    } catch (error) {
      console.error("Error analyzing image:", error);
      setErrorMsg("An error occurred during analysis.");
    }
  };

  // Compute undertone based on veinColor
  const undertone =
    veinColor === "blue/purple" ? "Cool Undertone" :
    veinColor === "green/olive" ? "Warm Undertone" :
    veinColor === "mix" ? "Neutral Undertone" : "";

  return (
    <div className="body">
      <div className="container">
        <p>❤</p>
        <h2>Get your personal seasonal color analysis</h2>
        <img src="/assets/1.PNG" alt="Guide" />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && (
          <div>
            <h3>Image Preview:</h3>
            <img src={imagePreview} alt="Preview" style={{ maxWidth: "300px" }} />
            <br />
            <h5>Please select your vein color (to determine your undertone):</h5> 
            <div onChange={handleVeinColorChange}>
              <input type="radio" value="blue/purple" name="vein_color" id="blue-purple" /> 
              <label htmlFor="blue-purple">Blue/Purple</label>
              <input type="radio" value="green/olive" name="vein_color" id="green-olive" /> 
              <label htmlFor="green-olive">Green/Olive</label>
              <input type="radio" value="mix" name="vein_color" id="mix" /> 
              <label htmlFor="mix">Mix</label>
            </div>
          </div>
        )}
        <button className="button" onClick={handleSubmit}>Analyze Image</button>
        {result && (
          <div className="result">
            <h1>You are a {result.season_prediction} with {undertone}</h1>
            <button className="button" onClick={handleGuideDownload}>Get Complete Guide</button>
          </div>
        )}
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
      </div>
    </div>
  );
};

export default UploadPage;
