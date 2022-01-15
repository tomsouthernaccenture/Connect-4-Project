//DOM ELEMENTS
const allCells = document.querySelectorAll('.cell:not(.row-top)');
const topCells = document.querySelectorAll('.cell.row-top');
const resetButton = document.querySelector('.reset');
const statusSpan = document.querySelector('.status');

//COLUMNS Starting from the bottom and going up supports logic of the function:
const column0 = [allCells[35], allCells[28], allCells[21], allCells[14], allCells[7], allCells[0], topCells[0]];
const column1 = [allCells[36], allCells[29], allCells[22], allCells[15], allCells[8], allCells[1], topCells[1]];
const column2 = [allCells[37], allCells[30], allCells[23], allCells[16], allCells[9], allCells[2], topCells[2]];
const column3 = [allCells[38], allCells[31], allCells[24], allCells[17], allCells[10], allCells[3], topCells[3]];
const column4 = [allCells[39], allCells[32], allCells[25], allCells[18], allCells[11], allCells[4], topCells[4]];
const column5 = [allCells[40], allCells[33], allCells[26], allCells[19], allCells[12], allCells[5], topCells[5]];
const column6 = [allCells[41], allCells[34], allCells[27], allCells[20], allCells[13], allCells[6], topCells[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6];


//ROWS
const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5], topCells[6]];
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5], allCells[6]];
const row1 = [allCells[7], allCells[8], allCells[9], allCells[10], allCells[11], allCells[12], allCells[13]];
const row2 = [allCells[14], allCells[15], allCells[16], allCells[17], allCells[18], allCells[19], allCells[20]];
const row3 = [allCells[21], allCells[22], allCells[23], allCells[24], allCells[25], allCells[26], allCells[27]];
const row4 = [allCells[28], allCells[29], allCells[30], allCells[31], allCells[32], allCells[33], allCells[34]];
const row5 = [allCells[35], allCells[36], allCells[37], allCells[38], allCells[39], allCells[40], allCells[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow];

//VARIABLES:
let gameIsLive = true
let RedIsNext = true //Determines who's turn it is

//FUNCTIONS:
const getClassListArray = (cell) => {
    const classList = cell.classList
    return [...classList]
};

// Get the cell location pass cell in as argument:
const getCellLocation = (cell) => {
    const classList = getClassListArray(cell); 

    //callback function using .find //Loop through each of the class list arrays and will find the lowest
    const rowClass = classList.find(className => className.includes('row'));
    const colClass = classList.find(className => className.includes('col'));

    const rowIndex = rowClass[4] //Getting two numbers when we console.log
    const colIndex = colClass [4] 
    
    const rowNumber = parseInt(rowIndex, 10);
    const colNumber = parseInt(colIndex, 10);

    return [rowNumber, colNumber]; //returning the rowNum and colNum as numbers because we have parsed the numbers
};

//Get last available column
const getFirstOpenCellForColumn = (colIndex) => {
  const column = columns[colIndex];
  const columnWithoutTop = column.slice(0, 6);

  for (const cell of columnWithoutTop) {
      const classList = getClassListArray(cell);
      if (!classList.includes('red') && !classList.includes('yellow')){ //does not include red and yellow
          return cell;
      }
  }

  return null; //If it does it returns no openings
};

//Alternate the colors from top row
const clearColorFromTop =(colIndex) => {
    const topCell =topCells[colIndex];
    topCell.classList.remove('red');
    topCell.classList.remove('yellow')
};

//GETTING COLOR OF CELL TO SUPPORT CHECK WIN STATUS FUNCTION
const getColorOfCell = (cell) => {
    const classList = getClassListArray(cell);
    if (classList.includes('red')) return 'red';
    if (classList.includes('yellow')) return 'yellow';
    return null;
};

const checkWinningCells = (cells) => {
    if (cells.length < 4) return;
        
        gameIsLive = false;
        for (const cell of cells) {
            cell.classList.add('win');
        } 
        statusSpan.textContent = '${RedIsNext ? "red" : "yellow"} has won'
};

const checkStatusOfGame = (cell) => {
    const color =getColorOfCell(cell);
    if (!color) return;
    const [rowIndex, colIndex] = getCellLocation(cell);

    //Check Horizontally:
    let winningCells = [cell];
    let rowToCheck = rowIndex;
    let colToCheck = colIndex -1
    while (colToCheck >= 0) {
        const cellToCheck =rows[rowToCheck][colToCheck]; //Give us the cell associated with the two parameters
        
       // if (getColorOfCell(cellToCheck === color) {
          //  winningCells.push(cellToCheck);
          //  colToCheck--; 
       // }
         //  else {
         //  break;
        // }
   // }

    checkWinningCells(winningCells);

    if (winningCells.length >= 4) {
        gameIsLive = false;

    }

};

//EVENT HANDLERS
//Using Mouse to hover over creates lots of different MouseEvents:
const handleCellMouseOver =(e) => {
const cell = e.target
const [rowIndex, colIndex] = getCellLocation(cell); //The index tells us which row and column we are on

//If and else condition for hovering over the top row
const topCell = topCells[colIndex];  // Can use T.Operator topCell.classList.add(yellowIsNext ? 'yellow' : 'red');
if (RedIsNext){
    topCell.classList.add('red');
 } else {
     topCell.classList.add('yellow')
 }
};

const handleCellMouseOut = (e) => {
    const cell = e.target
    const [rowIndex, colIndex] = getCellLocation(cell);
    clearColorFromTop(colIndex);
};

const handleCellClick = (e) => {
    const cell = e.target;
    const [rowIndex, colIndex] = getCellLocation(cell)
    
    const openCell = getFirstOpenCellForColumn(colIndex);
  
    if (!openCell) return; //Don't add anything if the cell is full

    openCell.classList.add(RedIsNext ? 'red' : 'yellow');
    checkStatusOfGame(openCell);
    //Check the status of the game

    
    //Alternate turn
    RedIsNext = !RedIsNext;
    clearColorFromTop(colIndex);
    const topCell = topCells[colIndex];
    topCell.classList.add(RedIsNext ? 'yellow' : 'red')
};

//ADDING EVENT LISTENERS
//Creating a For Loop to Loop through each row and each cell:
for (const row of rows) {
  for (const cell of row) {
    cell.addEventListener('mouseover', handleCellMouseOver );
    cell.addEventListener('mouseout', handleCellMouseOut);
    cell.addEventListener('click', handleCellClick);
  }
};
