const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('#clear');
const del = document.querySelector('#del');
const divide = document.querySelector('#divide');
const times = document.querySelector('#times');
const minus = document.querySelector('#minus');
const point = document.querySelector('#point');
const equal = document.querySelector('#equal');

const currentDisplay = document.querySelector('#current');
const previousDisplay = document.querySelector('#previous');

let operator = "";
let currentInput = "", previousInput = "";
let currentNumber = 0, previousNumber = 0, answer = 0;
let equalPressed = false, inputEntered = false;

digits.forEach(digit => digit.addEventListener('click', () => {
    // if (equalPressed){
    //     currentInput="";
    // }

    currentInput += digit.textContent;
    currentDisplay.textContent = currentInput;
    currentNumber = Number(currentInput);
    inputEntered = true;

    // equalPressed = false;
}));

operators.forEach(op => op.addEventListener('click', () => {
    if (previousDisplay.textContent == ""){
        operator = op.textContent;
        previousNumber = currentNumber;
        currentInput = "";
        previousDisplay.textContent = `${previousNumber} ${operator}`
        currentDisplay.textContent = currentInput;

        return;
    }

    if (inputEntered && operator != ""){
        previousNumber = Number(previousDisplay.textContent.split(" ")[0]);
        currentNumber = Number(currentInput);
        answer = calculate(previousNumber, currentNumber, operator);
        operator = op.textContent;
        previousDisplay.textContent = `${answer} ${operator}`
        currentInput = "";
        currentDisplay.textContent = currentInput;
        inputEntered = false;

        return;
    }
    
    if (!inputEntered){
        operator = op.textContent;
        previousNumber = Number(previousDisplay.textContent.split(" ")[0]);
        previousDisplay.textContent = `${previousNumber} ${operator}`;

        return;
    }
}));

// equal.addEventListener('click', () => {
//     if (equalPressed) return;

//     answer = calculate(operator);

//     previousDisplay.textContent = `${previousNumber} ${operator} ${currentNumber} =`;
//     currentDisplay.textContent = answer;
//     previousNumber = answer;
//     operator = "";
//     equalPressed = true;
// });

// ------------------------------------------------------------
// Functions

function calculate(previousNumber, currentNumber, operator){
    switch(operator){
        case "+": return previousNumber + currentNumber;
        case "-": return previousNumber - currentNumber;
        case "X": return previousNumber * currentNumber;
        case "÷": return previousNumber / currentNumber;
        default: return
    }
}

function restart(){
    currentInput = "";
    // previousInput = "";
    // currentNumber = 0;
    // previousNumber = 0;
    // answer = 0;
    previousDisplay.textContent = "";
    equalPressed = false;
}