import Bluebot from "../src/assets/bluebot.svg"
import TextField from '@mui/material/TextField';
import Walle from "../src/assets/walle.svg"
import { useState } from "react"
import { client } from "@gradio/client";

function App() {

  const [Text, setText] = useState('');
  const [Response, setResponse] = useState('');

  interface PredictResult {
    data: YourExpectedDataType;
  }
  
  const predictText = async (value: string) => {
    try {
      setText(value);
      const app = await client("https://shally-ruana.hf.space/");
      const result: PredictResult = await app.predict("/predict", [value]);
  
      // Now TypeScript knows about the 'data' property
      if (result) {
        setResponse(result.data);
      }
    } catch (error) {
      setResponse(error.message);
    }
  };
  
  return (
    <>
      <div className='bg-gray-900 w-full flex flex-col justify-center items-center min-h-screen bg-opacity-80'>

        <div className="rounded-xl w-full md:w-[60%] px-4 md:px-28 flex justify-center items-center">
          <div className="md:w-auto rounded-lg dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
            <div role="banner">
              <img className="w-[112px] h-[122px]" src={Response?Walle:Bluebot} alt="" />
            </div>
            <div className="mt-12">
              <h1 role="main" className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 mb-3 text-center text-gray-800">Introducing RUANA</h1>
              <h1 role="main" className="text-yellow-400 pt-2 font-semibold leading-7 lg:leading-9 text-center">
                <span className="text-white">R</span>oman
                <span className="text-white"> U</span>rdu
                <span className="text-white"> A</span>busive and
                <span className="text-white"> N</span>on-abusive.</h1>
            </div>
            <div className="mt-2">
              <p className="mt-6 sm:w-80 text-base text-yellow-400 leading-7 italic text-center">Please, submit any roman urdu string sample to test!</p>
            </div>
            <div className="mt-4 w-full">
              <TextField className="w-full" value={Text} onChange={(e) => predictText(e.target.value)} id="filled-basic" label="Input" variant="filled" />
            </div>
            <div className="w-full mt-4 flex flex-row justify-center items-center gap-3 rounded-lg bg-black h-[50px]">
              <p className="text-green-600 font-semibold text-center">Response:</p>
              <p className={`${Response[0]?.includes('Not') ? "text-green-600" : "text-red-600"} text-center`}>{Response || "N/A"}</p>
            </div>
            <p className="absolute bottom-5 text-center text-white italic right-5">⚡ by Shahpaal</p>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
