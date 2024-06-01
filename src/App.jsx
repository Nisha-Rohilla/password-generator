import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+{}[]<>?/";
    }
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const passwordClipboardCopy = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed, length, charAllowed]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-300 bg-gray-700">
        <h1 className="text-shite text-center">Password generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            // onChange={() => setPassword((prev) => !prev)}
            placeholder="Password"
            readOnly
            className="outline-none w-full py-1 px-3"
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={passwordClipboardCopy}
          >
            Copy
          </button>
        </div>
        <div>
          <div className="flex text-sm gap-x-2">
            <div className=" flex items-center gap-x-1">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="">Length: {length}</label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="numberInput"> Number</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="charAllowed">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
