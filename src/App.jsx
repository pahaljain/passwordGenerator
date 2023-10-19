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

    navigator.clipboard.writeText(copyText.value);

  }

  return (
    <div className="app">
        <h1 className="w-1/3 text-3xl">Password Generator</h1>
      <div className="box w-1/3 bg-red-400">
        
        <div className="password mb-4">
          <input type="text" placeholder="Your Password" value={password} id="copyText" className="p-3 w-72 rounded-sm" readOnly />
          <button type="submit" onClick={copy} className="bg-slate-500 p-3 rounded-md text-white">Copy Password</button>
        </div>

        <div className="inputs mt-6">
          <input type="range" max="25" min="6" className="mr-1" onChange={e => setLength(e.target.value)}/>
          {/* show length of password */}
          <label className="mr-3">{length}</label>

          <input type="checkbox" 
          onChange={e => setNumber(e.target.checked)} 
          className="mr-1"/>
          <label className="mr-3">Numbers</label>
          <input type="checkbox" onChange={e => setSpecial(e.target.checked)} className="mr-1"/>
          <label className="mr-3">Special Characters</label>
        </div>
      </div>

    </div>
  )
}

export default App
