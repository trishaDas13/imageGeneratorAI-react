import React, { useState } from 'react'


function Generator() {

    const [text, setText] = useState('');
    const [imageURL, setImageURL] = useState('');
    const[changeMode, setChangeMode] = useState(false);

    const API_TOKEN = "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";

    //todo: fetch and append image
    function generateImage(){
        async function query(data) {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
                {
                    headers: { Authorization: `Bearer ${API_TOKEN}`},
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.blob();
            return result;
        }
        if (text === ""){
           alert("Please enter some text to generate an image!") ;
           return;        
        }
        query({"inputs": text}).then((response) => {
            const Url = URL.createObjectURL(response);
            setImageURL(Url);
        });
    }

    //todo: toggle between light and dark mode
    function toggleMode(){
        setChangeMode(!changeMode);
    }

  return (
    <>
        <h2>Image Generation App</h2>
        <div className="searchBar">
        <input type="text" 
            onChange={(e) => setText(e.target.value)}
        />
        <button onClick={generateImage}>Generate Image!</button>
        </div>

        <div 
            className={changeMode ? 'darkmode' : 'generatorContainer'}
        >
           <img src={imageURL} alt="" width="350px" />
            <span 
                onClick={toggleMode}
            >{changeMode ? '🌞' : '🌙'}</span>
        </div>
        
    </>
  )
}

export default Generator