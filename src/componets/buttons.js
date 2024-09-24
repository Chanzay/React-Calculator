import '../App.css';
import { useState } from 'react';
import Display from './display';


const button = [
  'AC', '+/-', '%', '/',
  '7', '8', '9', 'X',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '=',
];

const listButton = button.map(i =>{ 
  if(i === 'AC'|| i === '+/-'|| i === '%'){
    return <button key={i} className='bg-gray-400 rounded-full h-16 w-16 active:bg-slate-200'>{i}</button>
  }
  else if(i === '/'|| i === 'X'|| i === '-' || i === '+' || i === '='){
    return <button key={i} className='bg-orange-400 rounded-full h-16 w-16 active:bg-slate-200' >{i}</button>
  }
  else if(i === '0'){
    return <button key={i} className='bg-gray-600 rounded-full h-16 col-span-2 active:bg-slate-200'>{i}</button>
  }
  else{
   return <button key={i} className='bg-gray-600 rounded-full h-16 w-16 active:bg-slate-200'>{i}</button>
  }
});


export default function Buttons() {
  const [currInput,setCurrInput] = useState('0');
  const [preInput,setPreInput] = useState(' ');
  const [operator, setOperator] = useState(null);

  const handleClick = (e) => {
    const value = e.target.innerText;

    if (!isNaN(parseInt(value))) {
      setCurrInput((prev) => (prev === '0' ? value : prev + value));
      }
    else if(['/', 'X', '-', '+'].includes(value)){
      operatorHandler(value);
    }
    else if(value === 'AC'){
      setCurrInput('0');
      setPreInput(' ');
      setOperator(null);
    }
    else if(value === '+/-'){
      if(currInput > 0){
        setCurrInput("-" + currInput);
      }
      else{
        setCurrInput(currInput * -1);
      }
    }
    else if(value === '.'){
      setCurrInput(currInput + '.');
    }
    else if(value === '%'){
      setCurrInput(currInput / 100);
    }
    else if(value === '='){
      calculateNewValue();
    }
  }

  const operatorHandler = (value) =>{
    if(currInput && operator){
      calculateNewValue();
    }
    else{
      setPreInput(currInput);
      setCurrInput('');
    }
    setOperator(value);
  };

  const calculateNewValue = () =>{
    if(!currInput|| !preInput || !operator){
      return;
    }

    const num1 = parseFloat(preInput);
    const num2 = parseFloat(currInput);
    let result;


    switch(operator){
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case 'X':
        result = num1 * num2;
        break;
      case '/':
        result = num2 !== 0 ? num1/num2: "Error";
        break;
      default:
        return;  
    }
    setCurrInput(result.toString());
    setPreInput('');
    setOperator(null);
  };


  return (
    <div>
      <Display curr={currInput} pre={preInput}  />
      <div onClick={(e) => handleClick(e)} className='bg-black text-3xl grid grid-cols-4 gap-1 text-white p-2 rounded-b-sm'>
        {listButton}
      </div>
    </div>
  )
}