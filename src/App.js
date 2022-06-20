import './App.css';
import freeCodeCampLogo from './imagenes/freeCodeCamp-logo.png';
import Boton from './componentes/Boton.jsx';
import Pantalla from './componentes/Pantalla.jsx';
import BotonClear from './componentes/BotonClear.jsx';
import { useState } from 'react';
import { evaluate } from 'mathjs'; //Librería instalada desde NPM

function App() {

  let [input, setInput] = useState('');

  const esOperador = (valor) => {
    return isNaN(valor) && (valor !== '.') && (valor !== '=');
  };

  const agregarInput = (valor) => {
    
    //Si es el 1er ingreso, verifico que sea un caracter de inicio válido
    if (input === '') {
      if (['+', '*', '/', '.'].includes(valor)) {
        return;
      }
    }
    
    //Si ingreso un "." y el anterior ingreso fue un ".", no lo permito
    if (valor === '.') {
      if (input) {
        let inputTexto = input.toString();

        if (inputTexto.charAt(inputTexto.length-1) === '.') {
          return;
        }
      }
    }

    //Si ingreso un "." y el anterior ingreso fue un operador, no lo permito
    if (valor === '.') {
      if (input) {
        let inputTexto = input.toString();

        if (esOperador(inputTexto.charAt(inputTexto.length-1))) {
          return;
        }
      }
    }

    //Si ingreso un operador y el anterior ingreso fue un ".", no lo permito
    if (esOperador(valor)) {
      if (input) {
        let inputTexto = input.toString();

        if (inputTexto.charAt(inputTexto.length-1) === '.') {
          return;
        }
      }
    }

    //Si ingreso un operador y el anterior ingreso fue otro operador, lo reemplazo
    if (esOperador(valor)) {
      if (input) {
        let inputTexto = input.toString();

        if (esOperador(inputTexto.charAt(inputTexto.length-1))) {
          setInput(inputTexto.substring(0, inputTexto.length-1)+valor);
          return;
        }
      }
    }
    
    setInput(input + valor);
  };

  const calcularResultado = () => {
    if (input) { //Evalúo sólo si el input tiene contenido
      let inputTexto = input.toString();
      if (esOperador(inputTexto.charAt(inputTexto.length-1))) {
        setInput(evaluate(inputTexto.substring(0, inputTexto.length-1)));
      } else {
        setInput(evaluate(inputTexto)); //evaluate de Mathjs, evalúa la cadena de caracteres y en caso de que sea una expresión matemática válida, calcula y devuelve el resultado
      }  
    }
  };

  return (
    <div className='App'>
      <div className='freecodecamp-logo-contenedor'>
        <img
          src={ freeCodeCampLogo }
          className='freecodecamp-logo'
          alt='Logo de freeCodeCamp' /> 
      </div>
      <div className='contenedor-calculadora'>
        <Pantalla 
          input={ input } />
        <div className='fila'>
          <Boton manejarClic={ agregarInput }>1</Boton>
          <Boton manejarClic={ agregarInput }>2</Boton>
          <Boton manejarClic={ agregarInput }>3</Boton>
          <Boton manejarClic={ agregarInput }>+</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={ agregarInput }>4</Boton>
          <Boton manejarClic={ agregarInput }>5</Boton>
          <Boton manejarClic={ agregarInput }>6</Boton>
          <Boton manejarClic={ agregarInput }>-</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={ agregarInput }>7</Boton>
          <Boton manejarClic={ agregarInput }>8</Boton>
          <Boton manejarClic={ agregarInput }>9</Boton>
          <Boton manejarClic={ agregarInput }>*</Boton>
        </div>
        <div className='fila'>
          <Boton manejarClic={ calcularResultado }>=</Boton>
          <Boton manejarClic={ agregarInput }>0</Boton>
          <Boton manejarClic={ agregarInput }>.</Boton>
          <Boton manejarClic={ agregarInput }>/</Boton>
        </div>
        <div className='fila'>
          <BotonClear manejarClear={ () => setInput('') }>
            Clear
          </BotonClear>
        </div>
      </div>
    </div>
  );
}

export default App;