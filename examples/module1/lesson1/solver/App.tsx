import { useState } from 'react';
import { add, divide, multiply, subtract } from './functions';

const App = () => {
  const [firstOperand, setFirstOperand] = useState<number>(0);
  const [secondOperand, setSecondOperand] = useState<number>(0);
  const [result, setResult] = useState<number | string>(0);

  const calculate = (calculationFunction: (a: number, b: number) => number) => {
    setResult(calculationFunction(firstOperand, secondOperand));
  };

  const removeLeadingZeros = (value: string): string =>
    value.replace(/^0+(?!$)/, '');

  const getInputValue = (value: string): string => {
    return removeLeadingZeros(value);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <input
          type="number"
          className="rounded-md shadow-md p-4"
          value={getInputValue(firstOperand.toString())}
          onChange={(e) =>
            setFirstOperand(parseFloat(removeLeadingZeros(e.target.value)))
          }
        />
        <input
          type="number"
          className="rounded-md shadow-md p-4"
          value={getInputValue(secondOperand.toString())}
          onChange={(e) =>
            setSecondOperand(parseFloat(removeLeadingZeros(e.target.value)))
          }
        />
      </div>
      <div className="grid grid-cols-4 gap-x-4 my-4">
        <button
          className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
          onClick={() => calculate(add)}
        >
          +
        </button>
        <button
          className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
          onClick={() => calculate(subtract)}
        >
          -
        </button>
        <button
          className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
          onClick={() => calculate(multiply)}
        >
          *
        </button>
        <button
          className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
          onClick={() => {
            if (secondOperand === 0) {
              setResult('Division by zero');
              return;
            }
            calculate(divide);
          }}
        >
          /
        </button>
      </div>
      <div>Result: {result}</div>
    </div>
  );
};

export default App;
