import { HangImage } from './components/HangImage';
import { letters } from './helpers/letters';
import { useEffect, useState } from 'react';
import { getRandomWord } from './helpers/getRandomWord';
import './App.css';

function App() { // manejar el stado 

const [word, setWord] = useState(getRandomWord); // la palabra puede ser aleatoria
const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
const [attempts, setAttempts] = useState(0);
const [lose, setLose] = useState(false);
const [won, setWon] = useState(false);

// perdio 
useEffect( () => { // hooks
if( attempts >= 9 ){
  setLose(true); // lose is true 
}
}, [attempts]);

// gano 
useEffect( () => { // hooks
//console.log(hiddenWord); // _ _ _ _ _ _ _ _ _ _ _ _
const currentHiddenWord = hiddenWord.split(' ').join(''); 
if( currentHiddenWord === word ){
  setWon(true);
}
  }, [ hiddenWord ]);


const checkLetter = ( letter: string) =>{
      if( lose ) return; // no sigue ejecutando mas letras 
      if( won ) return; // no sigue ejecutando mas letras 
      if( ! word.includes (letter)){
      setAttempts( Math.min( attempts + 1, 9) ); // intentos min 9
      return;
    } 

    const hiddenWordArray = hiddenWord.split(' '); // split = separar 
    //console.log( hiddenWordArray );
    
    for( let i = 0; i < word.length; i++){
      if ( word [i] === letter ){
        hiddenWordArray [i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' ')); // join = unir 
    //console.log(hiddenWordArray.join(' '));
}

const newGame = () => {
const newWord = getRandomWord();

  setWord(newWord);
  setHiddenWord('_ '.repeat(newWord.length));
  setAttempts(0);
  setLose(false);
  setWon(false);

}

return (
  <div className="App">
    
   {/* Imagenes */}
   <HangImage imageNumber={ attempts }/>

   {/* Palabra oculta */} 
   <h3>{ hiddenWord }</h3>

   {/* Contador de intentos */} 
   <h3>Intentos: { attempts } </h3>

   {/* mensaje si perdio */} 
   {
    ( lose ) 
    ? <h2>Perdio { word }</h2>
    : ''
   }

   {/* mensaje si gano */} 
   {
    ( won ) 
    ? <h2>Felicidades</h2>
    : ''
   }   

   {/* Botones de letras */} 
   {
    letters.map( (letter) => (
      <button
        onClick={ () => checkLetter(letter) }
        key={letter}>
          { letter }
      </button>    
    ))
   }

   <br /> <br />
   <button onClick={ newGame }> ¿Nuevo Juego? </button>



  </div>
);
};
export default App;
