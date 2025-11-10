/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*(){}[]_+-=₹";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-full max-w-2xl mx-auto shadow-lg rounded-2xl px-6 py-8 text-orange-500 bg-gray-700">
          <h1 className="text-3xl text-center text-white font-semibold mb-6">
            🔐 Password Generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-6">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-3 px-4 bg-white text-gray-800 text-lg"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            >
              copy
            </button>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between text-sm text-white">
            <div className="flex items-center gap-x-2">
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                id="lengthInput"
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="lengthInput" className="text-lg">
                Length: <span className="font-semibold">{length}</span>
              </label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="numberInput" className="text-lg">
                Numbers
              </label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={charAllowed}
                id="charInput"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="charInput" className="text-lg">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
