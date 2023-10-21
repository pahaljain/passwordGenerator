import { useEffect, useState } from "react"

function App() {

  const [password , setPassword] = useState("");
  
  const [length , setLength] = useState(0);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);

  const generate = () => {
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num = "1234567890";
    let sp = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    let pass = "";

    if(number && special){
      alphabet += num + sp;
    }
    else if(number){
      alphabet += num ;
    }
    else if(special){
      alphabet += sp;
    }

    for(let i=0 ; i<length ; i++){
      pass += alphabet.charAt(Math.random() * alphabet.length)
    }
    // console.log(pass);
    setPassword(pass);
  }

  useEffect(() => {
    generate();
  }, [ length ,  number , special])
  
  const copy = () => {
    let copyText = document.getElementById("copyText");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard
      .writeText(copyText.value)
      .then(() => {
        alert("successfully copied")
      })
      .catch(() => {
        alert("something went wrong")
      });

  }

  return (
    <div className="app">
        <h1 className="text-lg md:text-3xl ">Password Generator</h1>
      <div className="box w-5/6 md:w-3/5 lg:w-2/3 xl:w-1/2  bg-red-400">
        
        <div className="password mb-4">
          <input type="text" placeholder="Your Password" value={password} id="copyText" className="p-3 w-48 sm:w-72 rounded-sm" readOnly />
          <button type="submit" onClick={copy} className="bg-slate-500 p-3 rounded-sm text-white">Copy</button>
        </div>

        <div className="inputs mt-6 md:flex">
          <div>
            <input type="range" max="25" min="6" className="mr-1 block" onChange={e => setLength(e.target.value)}/>
            <label className="mr-3">Length: {length}</label>
          </div>

          <div>
            <input type="checkbox" 
            onChange={e => setNumber(e.target.checked)} 
            className="mr-1"/>
            <label className="mr-3">Numbers</label>
          </div>

          <div>
            <input type="checkbox" onChange={e => setSpecial(e.target.checked)} className="mr-1"/>
            <label className="mr-3">Special Characters</label>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
