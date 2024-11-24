import React, { useState } from 'react';
import { evaluate, factorial, sqrt, pow, sin, cos, tan } from 'mathjs';
import { gsap } from 'gsap';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const handleButtonClick = (value) => {
    try {
      if (value === '=') {
        const result = evaluate(input);
        setHistory([...history, `${input} = ${result}`]);
        setInput(result.toString());
      } else if (value === 'C') {
        setInput('');
      } else if (value === 'DEL') {
        setInput(input.slice(0, -1));
      } else if (value === 'π') {
        setInput(input + Math.PI.toFixed(8));
      } else if (value === 'e') {
        setInput(input + Math.E.toFixed(8));
      } else if (value === 'sin') {
        setInput(input + `sin(`);
      } else if (value === 'cos') {
        setInput(input + `cos(`);
      } else if (value === 'tan') {
        setInput(input + `tan(`);
      } else if (value === 'log') {
        setInput(input + `log10(`);
      } else if (value === 'ln') {
        setInput(input + `log(`);
      } else if (value === '√') {
        setInput(input + `sqrt(`);
      } else if (value === '!') {
        const result = factorial(evaluate(input));
        setHistory([...history, `${input}! = ${result}`]);
        setInput(result.toString());
      } else if (value === 'x^2') {
        setInput(input + `^2`);
      } else if (value === 'x^y') {
        setInput(input + `^`);
      } else if (value === '(' || value === ')') {
        setInput(input + value);
      } else {
        setInput(input + value);
      }
    } catch {
      setInput('Error');
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-black p-6 rounded-lg shadow-2xl mx-auto text-white font-mono w-full sm:w-[300px] md:w-[350px] lg:w-[400px]">
      {/* Display */}
      <div className="bg-gray-900 p-4 rounded-lg text-right mb-4 text-lg sm:text-xl md:text-2xl font-bold shadow-inner border border-gray-700">
        {input || '0'}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
        {[
          '(',
          ')',
          'C',
          'DEL',
          '7',
          '8',
          '9',
          '/',
          '4',
          '5',
          '6',
          '*',
          '1',
          '2',
          '3',
          '-',
          '0',
          '.',
          '=',
          '+',
          'sin',
          'cos',
          'tan',
          'log',
          'ln',
          'π',
          'e',
          '^',
          '√',
          '!',
          'x^2',
          'x^y',
        ].map((button) => (
          <Button key={button} label={button} onClick={handleButtonClick} />
        ))}
      </div>

      {/* History */}
      <div className="mt-4 bg-gray-700 p-3 rounded-lg text-xs sm:text-sm shadow-inner border border-gray-600">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-300 mb-2 font-semibold">History:</h3>
          <button
            onClick={clearHistory}
            className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded-md text-xs sm:text-sm"
          >
            Clear History
          </button>
        </div>
        <ul>
          {history.slice(-5).map((item, index) => (
            <li key={index} className="text-gray-100">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Button = ({ label, onClick }) => {
  const btnRef = React.useRef();

  const handleMouseDown = () => {
    gsap.to(btnRef.current, { scale: 0.9, duration: 0.1 });
  };

  const handleMouseUp = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.2 });
  };

  // Assign colors to buttons based on type
  const getButtonColor = (label) => {
    if (['C', 'DEL', '='].includes(label)) return 'bg-red-600 hover:bg-red-700';
    if (['+', '-', '*', '/', '^', '√', 'x^2', 'x^y'].includes(label)) return 'bg-blue-600 hover:bg-blue-700';
    if (['sin', 'cos', 'tan', 'log', 'ln', 'π', 'e', '!'].includes(label)) return 'bg-green-600 hover:bg-green-700';
    return 'bg-gray-700 hover:bg-gray-800';
  };

  return (
    <button
      ref={btnRef}
      className={`text-white py-2 px-3 sm:py-3 sm:px-4 rounded-md font-bold shadow-md ${getButtonColor(label)} text-sm sm:text-base`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default Calculator;
