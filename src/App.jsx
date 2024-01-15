import Bluebot from "../src/assets/bluebot.svg"
import TextField from '@mui/material/TextField';
import Walle from "../src/assets/walle.svg"
import { useState } from "react"
import { client } from "@gradio/client";

function App() {

  const [Text, setText] = useState('');
  const [Response, setResponse] = useState('');
  const [spinner, setSpinner] = useState(false)

  const predictText = async (value) => {
    try {
      setSpinner(true)
      const app = await client("https://shally-ruana.hf.space/");
      const result = await app.predict("/predict", [value]);
      if (result) {
        setSpinner(false)
        setResponse(result?.data)
      }
    } catch (error) {
      setResponse(error.message)
      setSpinner(false)
    }
  }

  return (
    <>
      <div className='bg-gray-900 w-full flex flex-col justify-center items-center min-h-screen bg-opacity-80'>

        <div className="rounded-xl w-full md:w-[60%] px-4 md:px-28 flex justify-center items-center">
          <div className="md:w-auto rounded-lg dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
            <div role="banner">
              <img className="w-[112px] h-[122px]" src={Response ? Walle : Bluebot} alt="" />
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
            <div className="mt-4 w-full flex gap-2 md:flex-row flex-col justify-center items-center">
              <TextField className="w-full" value={Text} onChange={(e) => setText(e.target.value)} id="filled-basic" label="Input" variant="filled" />
              <a href="#_" onClick={() => predictText(Text)} className="relative md:w-[20%] w-full inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group">
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
                <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
                <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
                <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
                <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                <span className="relative">
                  {!spinner ?
                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    )
                    :
                    (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-spin w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    )}
                </span>
              </a>
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
