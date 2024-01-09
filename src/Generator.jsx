import React, { useState } from 'react'

function Generator() {

    const [text, setText] = useState();
    const [imageURL, setImageURL] = useState('');

    const API_TOKEN = "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";

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
        query({"inputs": text}).then((response) => {
            const Url = URL.createObjectURL(response);
            setImageURL(Url);
        });
    }

  return (
    <div>
        <p>Image Generation App</p>
        <div className="searchBar">
        <input type="text" 
            onChange={(e) => setText(e.target.value)}
        />
        <button onClick={generateImage}>Generate Image!</button>
        </div>

        <div className="generatorContainer">
           <img src={imageURL} alt="" />
        </div>
    </div>
  )
}

export default Generator