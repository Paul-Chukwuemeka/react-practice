"use client";
import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight, FaCheck } from "react-icons/fa";
import { FaCopy } from "react-icons/fa6";

function Page() {
  const [passwordLength, setPasswordLength] = useState(4);
  const [strengthLevel, setStrengthLevel] = useState({
    level: "weak",
    colour: "red-500",
  });
  const [checks, setChecks] = useState({
    uppercase: true,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [chars, setChars] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);

  const options = {
    Uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    Lowercase: "abcdefghijklmnopqrstuvwxyz",
    Numbers: "0123456789",
    Symbols: "!@#$%^&*()",
  };

  useEffect(() => {
    setChars("");
    if (checks.uppercase) setChars((prev) => prev + options.Uppercase);
    if (checks.lowercase) setChars((prev) => prev + options.Lowercase);
    if (checks.numbers) setChars((prev) => prev + options.Numbers);
    if (checks.symbols) setChars((prev) => prev + options.Symbols);
  }, [checks]);

  function generatePassword() {
    setPassword("");
    if (chars) {
      for (let i = 0; i <= passwordLength; i++) {
        const random = Math.floor(Math.random() * chars.length);
        setPassword((prev) => prev + chars[random]);
      }
    }
  }

  useEffect(() => {
    setStrength(0);
    if (passwordLength > 8) {
      setStrength((prev) => prev + 1);
    }
    let checksCount = 0;
    for (let key in checks) {
      if (checksCount >= 3) {
        checksCount = 3;
      } else {
        if (checks[key] == true) checksCount++;
      }
    }
    setStrength((prev) => prev + checksCount);
  }, [checks, passwordLength]);

  useEffect(() => {
    if (strength < 2) {
      setStrengthLevel({
        level: "weak",
        colour: "red-500",
      });
    } else if (strength == 2) {
      setStrengthLevel({
        level: "medium",
        colour: "yellow-500",
      });
    } else if (strength == 3) {
      setStrengthLevel({
        level: "strong",
        colour: "lime-500",
      });
    } else {
      setStrengthLevel({
        level: "very strong",
        colour: "green-500",
      });
    }
  }, [strength]);

  // for strength

  /*
  lenght > 8 = strength + 1
  every option picked increases strength by 1 
  
  
  */

  return (
    <div className="w-full gap-10 h-screen flex flex-col items-center text-white p-20">
      <h1 className=" text-3xl font-bold">Password Generator</h1>
      <div className="bg-gray-800 h-130 gap-4 flex flex-col rounded-lg p-2 shadow-lg w-full max-w-120">
        <div className="flex  w-full items-center justify-between px-10 bg-gray-900 h-15 rounded-lg">
          <h1 className="text-2xl font-bold">
            {password ? password : "Password"}
          </h1>
          <button className="text-3xl cursor-pointer active:scale-95 hover:text-green-500">
            <FaCopy />
          </button>
        </div>
        <div className="bg-gray-900 flex flex-col gap-2 p-4 rounded-lg flex-1">
          <div className="flex items-center text-lg justify-between">
            <h3>Character Length</h3>
            <p className="text-2xl font-bold text-green-500">
              {passwordLength}
            </p>
          </div>
          <input
            type="range"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            min={4}
            max={16}
            className="w-full"
          />
          <div className="flex flex-col py-4 gap-2">
            <span className="text-lg flex items-center gap-2 font-bold">
              <button
                className="w-5 h-5 border rounded-full flex items-center justify-center  text-sm"
                onClick={() =>
                  setChecks({ ...checks, uppercase: !checks.uppercase })
                }
              >
                {checks.uppercase && <FaCheck />}
              </button>
              Include Uppercase Letters
            </span>
            <span className="text-lg flex items-center gap-2 font-bold">
              <button
                className="w-5 h-5 border rounded-full flex items-center justify-center  text-sm"
                onClick={() =>
                  setChecks({ ...checks, lowercase: !checks.lowercase })
                }
              >
                {checks.lowercase && <FaCheck />}
              </button>
              Include Lowercase Letters
            </span>
            <span className="text-lg flex items-center gap-2 font-bold">
              <button
                className="w-5 h-5 border rounded-full flex items-center justify-center  text-sm"
                onClick={() =>
                  setChecks({ ...checks, numbers: !checks.numbers })
                }
              >
                {checks.numbers && <FaCheck />}
              </button>
              Include Number
            </span>
            <span className="text-lg flex items-center gap-2 font-bold">
              <button
                className="w-5 h-5 border rounded-full flex items-center justify-center  text-sm"
                onClick={() =>
                  setChecks({ ...checks, symbols: !checks.symbols })
                }
              >
                {checks.symbols && <FaCheck />}
              </button>
              Include Symbols
            </span>
          </div>

          <div className="flex font-bold items-center justify-between bg-gray-800 p-4 text-2xl">
            <h3 className="">Strength</h3>

            <div className=" flex gap-1 h-full w-full justify-end *:shrink-0 *:border *:w-4 *:h-full">
              <p className="min-w-fit border-none capitalize px-3">
                {strengthLevel.level}
              </p>
              <div className={`bg-${strengthLevel.colour}`}></div>
              <div className={`bg-${strength >= 2 && strengthLevel.colour}`}></div>
              <div className={`bg-${strength >= 3 && strengthLevel.colour }`}></div>
              <div className={`bg-${strength == 4 && strengthLevel.colour}`}></div>
            </div>
          </div>
          <button
            className="flex hover:bg-green-500 active:scale-95 cursor-pointer items-center justify-center h-18 my-2 rounded-lg text-xl gap-1  border-green-500 border"
            onClick={() => {
              generatePassword();
            }}
          >
            Generate <FaLongArrowAltRight className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
