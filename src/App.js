// import logo from './logo.svg';
import './App.scss';
// import Game from './comp/Game';

class Board {

  constructor(height, width, words = 0, difficulty = 7) {
      this.height = height;
      this.width = width;
      this.letters = []
      if (words === 0) {
          this.words = [
              'ALANNA',
              'ARIQ',
              'PAUL',
              'CHRIS'
          ]
      } else {
          this.words = words;
      }
      this.difficulty = difficulty;
      this.wordPlacement = [];
      this.wordList = this.words;
      this.count = 0;
      this.generate();
      this.formatWords();
      this.placeLetters();  
      this.placeWords(this.letters, this.wordPlacement);
      
  }

  newBoard(height, width, words, difficulty){
    
    this.height = height;
    this.width = width;
    this.words = words.split(',');
    this.difficulty = difficulty;
    this.wordPlacement = [];
    this.wordList = this.words;
    this.generate();
    this.formatWords();
    this.placeLetters();  
    this.placeWords(this.letters, this.wordPlacement);
  }

  getLetter(val) {
      switch (val) {
          case 0:
              return 'A';
          case 1:
              return 'B';
          case 2:
              return 'C';
          case 3:
              return 'D';
          case 4:
              return 'E';
          case 5:
              return 'F';
          case 6:
              return 'G';
          case 7:
              return 'H';
          case 8:
              return 'I';
          case 9:
              return 'J';
          case 10:
              return 'K';
          case 11:
              return 'L';
          case 12:
              return 'M';
          case 13:
              return 'N';
          case 14:
              return 'O';
          case 15:
              return 'P';
          case 16:
              return 'Q';
          case 17:
              return 'R';
          case 18:
              return 'S';
          case 19:
              return 'T';
          case 20:
              return 'U';
          case 21:
              return 'V';
          case 22:
              return 'W';
          case 23:
              return 'X';
          case 24:
              return 'Y';
          case 25:
              return 'Z';
          default:
              return '#';
      }
  }

  generate() {
      for (let x = 0; x < this.width; x++) {
          for (let y = 0; y < this.height; y++) {

              let letter = this.getLetter(Math.floor(Math.random() * 26))
              // let letter = '@';
              this.letters.push({
                  'x': x,
                  'y': y,
                  'cell': this.getCell(x, y),
                  'letter': letter
              })
          }
      }
  }
  getLetters() {
      return this.letters;
  }
  getWords(){
      return this.wordList;
  }
  getLower(a, b){
      // console.log("[LOWER] " + a + " " + b);
      // console.log(a - b < 0 ? a : b);
      return a - b < 0 ? a : b;
  }
  getCell(x, y){
      return (x * this.height) + y;
  }

  getCellDistanceFromEdge(cellID, dir) {
      switch(dir){
          case 'NORTH':
              return this.letters[cellID].x;
          case 'EAST':
              return (this.letters[cellID].y - (this.width-1)) * -1;
          case 'SOUTH':
              return (this.letters[cellID].x - (this.height-1)) * -1;
          case 'WEST':
              return this.letters[cellID].y;


          case 'NORTH_EAST':
              // console.log("[NORTH_EAST] " + this.letters[cellID].x + " " + (this.letters[cellID].y - (this.width-1)) * -1);
              return this.getLower(this.letters[cellID].x, (this.letters[cellID].y - (this.width-1)) * -1);
          case 'SOUTH_EAST':
              return this.getLower((this.letters[cellID].x - (this.height-1)) * -1, (this.letters[cellID].y - (this.width-1)) * -1);
          case 'NORTH_WEST':
              return this.getLower(this.letters[cellID].x, this.letters[cellID].y);
          case 'SOUTH_WEST':
            // console.log([this.letters[cellID].x - (this.height-1) * -1, this.letters[cellID].y]);
              return this.getLower((this.letters[cellID].x - (this.height-1)) * -1, this.letters[cellID].y);


          default:
              return this.letters[cellID].x;
      }
  }

  getBound(cellID){
    return {
      'N': this.letters[cellID].x,
      'NE': this.getLower(this.letters[cellID].x, (this.letters[cellID].y - (this.width-1)) * -1),
      'E': (this.letters[cellID].y - (this.width-1)) * -1 ,
      'SE': this.getLower((this.letters[cellID].x - (this.height-1)) * -1, this.letters[cellID].y - (this.width-1) * -1),
      'S': (this.letters[cellID].x - (this.height-1)) * -1,
      'SW': this.getLower(this.letters[cellID].x, this.letters[cellID].y),
      'W': this.letters[cellID].y,
      'NW': this.getLower((this.letters[cellID].x - (this.height-1)) * -1, this.letters[cellID].y),
    }
  }

  formatWords() {
      let wordArr = [];
      // console.log(this.words);
      for (let i = 0; i < this.words.length; i++) {
          // console.log(this.words[i].length);
          let charArr = []
          for(let j = 0; j < this.words[i].length; j++){
              charArr.push(this.words[i][j].split(''));
          }
          // console.log(charArr);
          wordArr.push(charArr);
      }
      this.words = wordArr;
      // console.log(wordArr);
  }

  validPlacement(cell, length, dir){
    // console.log(this.wordPlacement.length);
      if(this.wordPlacement.length === 0){
          return true;
      }

      switch(dir){
          case 'NORTH':
              for(let i = 0; i < length; i++){
                  for(let ii = 0; ii < this.wordPlacement.length; ii++){
                      if(this.wordPlacement[ii].cell === cell-(i*this.height)){
                          return false;
                      }
                  }
              }
              return true;
          case 'NORTH_EAST':
              for(let i = 0; i < length; i++){
                  for(let ii = 0; ii < this.wordPlacement.length; ii++){
                    // console.log(cell-(i*this.height) + (i === 0 ? 0 : 1));
                      if(this.wordPlacement[ii].cell === cell-(i*this.height) + (i === 0 ? 0 : i)){
                          return false;
                      }
                  }
              }
              return true;
          case 'EAST':
              for(let i = 0; i < length; i++){
                  for(let ii = 0; ii < this.wordPlacement.length; ii++){
                      if(this.wordPlacement[ii].cell === cell+(i)){
                          return false;
                      }
                  }
              }
              return true;
          case 'SOUTH_EAST':
              for(let i = 0; i < length; i++){
                  for(let ii = 0; ii < this.wordPlacement.length; ii++){
                    console.log(cell-(i*this.height) + (i === 0 ? 0 : 1));
                      if(this.wordPlacement[ii].cell === cell+(i*this.height) + (i === 0 ? 0 : i)){
                          return false;
                      }
                  }
              }
              return true;
          case 'SOUTH':
              for(let i = 0; i < length; i++){
                  for(let ii = 0; ii < this.wordPlacement.length; ii++){
                      if(this.wordPlacement[ii].cell === cell+(i*this.height)){
                          return false;
                      }
                  }
              }
              return true;
          case 'SOUTH_WEST':
              for(let i = 0; i < length; i++){
                  for(let ii = 0; ii < this.wordPlacement.length; ii++){
                    console.log(cell-(i*this.height) + (i === 0 ? 0 : 1));
                      if(this.wordPlacement[ii].cell === cell+(i*this.height) - (i === 0 ? 0 : i)){
                          return false;
                      }
                  }
              }
              return true;
          case 'WEST':
              for(let i = 0; i < length; i++){
                  for(let ii = 0; ii < this.wordPlacement.length; ii++){
                      if(this.wordPlacement[ii].cell === cell-(i)){
                          return false;
                      }
                  }
              }
              return true;
          case 'NORTH_WEST':
              for(let i = 0; i < length; i++){
                  for(let ii = 0; ii < this.wordPlacement.length; ii++){
                    console.log(cell-(i*this.height) + (i === 0 ? 0 : 1));
                      if(this.wordPlacement[ii].cell === cell-(i*this.height) - (i === 0 ? 0 : i)){
                          return false;
                      }
                  }
              }
              return true;
          default:
              return false;
      }
  }

  placeLetters() {
      for(let i = 0; i < this.words.length; i++) {
          const targetWord = this.words[i];
          let targetCell = 0;
          let targetDir = Math.floor(Math.random() * this.difficulty);
          
          switch (targetDir) {
              case 0:
                  targetDir = 'NORTH';
                  break;
              case 1:
                  targetDir = 'EAST';
                  break;
              case 2:
                  targetDir = 'SOUTH';
                  break;
              case 3:
                  targetDir = 'NORTH_EAST';
                  break;
              case 4:
                  targetDir = 'SOUTH_EAST';
                  break;
              case 5:
                  targetDir = 'WEST';
                  break;
              case 6:
                  targetDir = 'NORTH_WEST';
                  break;
              case 7:
                  targetDir = 'SOUTH_WEST';
                  break;
              default:
                  targetDir = 'NORTH';
                  break;

          }
          do{
              targetCell = Math.floor(Math.random() * ((this.height * this.width) -1));
          }
          while((targetWord.length > this.getCellDistanceFromEdge(targetCell, targetDir) || !this.validPlacement(targetCell, targetWord.length, targetDir)));

          switch (targetDir) {
              case 'NORTH':
                  for (let x = 0; x < targetWord.length; x++){
                      this.wordPlacement.push({'letter':targetWord[x], 'cell':targetCell-(x*this.width) });
                  }
                      break;

              case 'NORTH_EAST':
                  // console.log('[NORTH EAST]');
                  for (let x = 0; x < targetWord.length; x++){
                      this.wordPlacement.push({'letter':targetWord[x], 'cell':targetCell-((x*this.width)-(x === 0 ? 0 : x)) });
                  }
                  break;

              case 'EAST':
                  // console.log('[EAST]');
                  for (let x = 0; x < targetWord.length; x++){
                      this.wordPlacement.push({'letter':targetWord[x], 'cell':targetCell+x});
                  }
                  break;

              case 'SOUTH_EAST':
                // console.log('[SOUTH EAST]');
                for (let x = 0; x < targetWord.length; x++){
                    this.wordPlacement.push({'letter':targetWord[x], 'cell':targetCell+((x*this.width)+(x === 0 ? 0 : x)) });
                }
                break;

              case 'SOUTH':
                  for (let x = 0; x < targetWord.length; x++){
                      this.wordPlacement.push({'letter':targetWord[x], 'cell':targetCell+(x*this.width) });
                  }
                  break;

              case 'SOUTH_WEST':
                  // console.log('[SOUTH WEST]');
                  for (let x = 0; x < targetWord.length; x++){
                      this.wordPlacement.push({'letter':targetWord[x], 'cell':targetCell+((x*this.width)-(x === 0 ? 0 : x)) });
                  }
                  break;

              case 'WEST':
                  for (let x = 0; x < targetWord.length; x++){
                      this.wordPlacement.push({'letter':targetWord[x], 'cell':targetCell-x });
                  }
                  break;

              case 'NORTH_WEST':
                // console.log('[NORTH WEST]');
                for (let x = 0; x < targetWord.length; x++){
                    this.wordPlacement.push({'letter':targetWord[x], 'cell':targetCell-((x*this.width)+(x === 0 ? 0 : x)) });
                }
                break;

              default:
                  break;
          }
          

      }
      
      // this.letters.forEach(cell => {
      //   cell.letter = this.getLetter(Math.floor(Math.random() * 26));
      // })
  }

  placeWords(grid, letters){
      // console.log(this.letters);
      // console.log(grid);
      grid.forEach(cellVal => {
        letters.forEach(wordTargetCell => {
          // if(cellVal.cell > 100 && cellVal.cell <110){
          //   cellVal.letter = '~'
          // }
              if(cellVal.cell === wordTargetCell.cell){
                cellVal.letter = wordTargetCell.letter[0];
                // if(cellVal.letter === '#'){
                  // }else{
                    // alert(cellVal.cell);
                  // }
              }
          })
          // console.log(this.letters);
          // console.log(this.wordPlacement);
          // if(cellVal.letter != '#'){
          //   cellVal.letter = cellVal.cell;
          // }
      })
      
      // console.log(this.count);
      }
  }




function App() {
  const board = new Board(15, 15, ['KEN', 'DOOR', 'FANNY', 'PISH', 'WIT']);
  // const board = new Board(15, 15, ['KEN', 'WIT', 'AYE', 'PISH', 'BRAW', 'NAW', 'FANNY', 'DOOR', 'WURKIN', 'HOOSE', 'GAFF']);
    
    return ( <div id = "game" > 
            <div className="wordList">
                {
                board.getWords().map((word, index) => {
                    return(
                        <div key = {index} className = "wordList__word" onClick={() => {console.table(board.getLetters())}}> 
                            {word} 
                            {/* {board.getCellDistanceFromEdge(index, 'north')}  */}
                            {/* {index } */}
                            {/* { letterArr.x +" "+ letterArr.y} */}
                        </div>
                    )
                })
                }
                <input type="number" id="widthIn" min="8" max="15"></input>
                <input type="number" id="heightIn" min="8" max="15"></input>
                <input type="number" id="diffIn" min="0" max="7"></input>
                <input type="text"   id="wordIn"></input>
                <button id="newBoard" onClick={() => {board.newBoard(document.getElementById('widthIn').value,document.getElementById('heightIn').value,document.getElementById('wordIn').value,document.getElementById('heightIn').value,document.getElementById('diffIn').value)}}>New Board</button>
            </div>
            <div id="board">
                {
                board.getLetters().map((letterArr, index) => {
                    return (
                            // <div key = {index} cell={letterArr.cell} className = {letterArr.letter === ('#' || '?') ? 'board__cell' : 'board__cell wordLetter'} onClick={() => console.log(board.getBound(index))}>
                              <div key = {index} cell={letterArr.cell} className = 'board__cell' onClick={(el) => {
                                if(el.target.classList.contains('active')){
                                  el.target.classList.remove('active');
                                }else{
                                  el.target.classList.add('active');
                                }
                                }}>
                                {letterArr.letter} 
                                {/* {board.getCellDistanceFromEdge(index, 'north')}  */}
                                {/* {index } */}
                                {/* {letterArr.cell + ", " + letterArr.letter} */}
                                {/* { letterArr.x +", "+ letterArr.y} */}
                            </div>
                    )
                })
                } 
            </div>
            </div>
    );
}

export default App;
