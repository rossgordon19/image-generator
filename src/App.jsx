import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '512x512',
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  return (
    <div className="app-main">
      {loading ? (
        <>
          <h2 className='text-white text-4xl text-center align-center'>Generating Image...</h2>
          <div class="load"></div>
        </>
      ) : (
        <>
          <h1 className="text-white text-4xl p-4 font-bold">AI Image Generator</h1>
          <textarea
            className="p-2"
            placeholder="Start typing to generate an image"
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <p className="text-white pt-5 hover:underline">
            Powered by{' '}
            <a href="https://openai.com/api" target="_blank">
              OpenAI API
            </a>
          </p>
          <button
            className="bg-[#F5CB5C] p-2 font-bold mt-8"
            onClick={generateImage}
          >
            Generate Image
          </button>
          {result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;
