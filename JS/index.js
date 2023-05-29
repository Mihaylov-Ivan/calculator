const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('#clear');
const del = document.querySelector('#del');
const divide = document.querySelector('#divide');
const times = document.querySelector('#times');
const minus = document.querySelector('#minus');
const equal = document.querySelector('#equal');

const currentDisplay = document.querySelector('#current');
const previousDisplay = document.querySelector('#previous');

let operator = "";
let currentInput = "", previousInput = "";
let currentNumber = 0, previousNumber = 0, answer = 0;
let equalEnabled = false, equalPressed = false, inputEntered = false;

digits.forEach(digit => digit.addEventListener('click', () => {
    if(equalPressed) previousDisplay.textContent = ""
    
    currentInput += digit.textContent;
    currentDisplay.textContent = currentInput;
    currentNumber = Number(currentInput);
    inputEntered = true;
    equalEnabled = true;
    equalPressed = false;
}));

operators.forEach(op => op.addEventListener('click', () => {
    if(currentDisplay.textContent == '.') return;

    if (previousDisplay.textContent == ""){
        operator = op.textContent;
        currentInput = "";
        previousNumber = currentNumber;
        previousDisplay.textContent = `${previousNumber} ${operator}`
        currentDisplay.textContent = currentInput;
        equalEnabled = false;
        inputEntered = false;
        return;
    }

    if (equalPressed){
        operator = op.textContent;
        currentInput = "";
        previousNumber = Number(currentDisplay.textContent);
        previousDisplay.textContent = `${previousNumber} ${operator}`
        currentDisplay.textContent = currentInput;
        equalPressed = false;
        inputEntered = false;
        return;
    }

    if (inputEntered && operator != ""){
        previousNumber = Number(previousDisplay.textContent.split(" ")[0]);
        currentNumber = Number(currentInput);
        answer = calculate(previousNumber, currentNumber, operator);
        operator = op.textContent;
        currentInput = "";
        previousDisplay.textContent = `${answer} ${operator}`
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

equal.addEventListener('click', () => {
    if (!equalEnabled) return;
    if(currentDisplay.textContent == '.') return;

    previousNumber = Number(previousDisplay.textContent.split(" ")[0]);
    currentNumber = Number(currentInput);
    answer = calculate(previousNumber, currentNumber, operator);
    previousDisplay.textContent = `${previousNumber} ${operator} ${currentNumber} =`;
    currentDisplay.textContent = answer;
    currentInput = "";
    operator = "";
    equalEnabled = false;
    equalPressed = true;
});

del.addEventListener('click', () => {
    if (!inputEntered) return;

    currentInput = currentDisplay.textContent.substring(0, currentInput.length-1);
    currentDisplay.textContent = currentInput;
    currentNumber = Number(currentInput);
});

clear.addEventListener('click', restart);

// ------------------------------------------------------------
// Functions

function calculate(previousNumber, currentNumber, operator){
    switch(operator){
        case "+": return (previousNumber + currentNumber).toFixed(6);
        case "-": return (previousNumber - currentNumber).toFixed(6);
        case "X": return (previousNumber * currentNumber).toFixed(6);
        case "÷": return (previousNumber / currentNumber).toFixed(6);
        default: return
    }
}

function restart(){
    operator = "";
    currentInput = "";
    previousInput = "";
    equalEnabled = false;
    equalPressed = false;
    inputEntered = false;
    currentNumber = 0;
    previousNumber = 0;
    answer = 0;
    currentDisplay.textContent = "";
    previousDisplay.textContent = "";
}