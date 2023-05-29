// 
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
    if (currentDisplay.textContent.includes(".") && digit.textContent==".") return;
    if (equalPressed) previousDisplay.textContent = "";
    
    currentInput += digit.textContent;
    currentDisplay.textContent = currentInput;
    currentNumber = Number(currentInput);
    inputEntered = true;
    equalEnabled = true;
    equalPressed = false;
}));

operators.forEach(op => op.addEventListener('click', () => {
    if (currentDisplay.textContent == '.') return;

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
        if (isNaN(answer)) return;
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
    if (currentDisplay.textContent == '.') return;

    previousNumber = Number(previousDisplay.textContent.split(" ")[0]);
    currentNumber = Number(currentInput);
    answer = calculate(previousNumber, currentNumber, operator);
    if (isNaN(answer)) return;
    previousDisplay.textContent = `${previousNumber} ${operator} ${currentNumber} =`;
    currentDisplay.textContent = answer;
    currentInput = "";
    operator = "";
    equalEnabled = false;
    equalPressed = true;
});

del.addEventListener('click', () => {
    if (!inputEntered) return;
    if (equalPressed){
        restart();
        return;
    }

    currentInput = currentDisplay.textContent.substring(0, currentInput.length-1);
    currentDisplay.textContent = currentInput;
    currentNumber = Number(currentInput);
});

clear.addEventListener('click', restart);

// ------------------------------------------------------------
// Functions

function calculate(previousNumber, currentNumber, operator){
    switch(operator){
        case "+": return round((previousNumber + currentNumber), 5);
        case "-": return round((previousNumber - currentNumber), 5);
        case "X": return round((previousNumber * currentNumber), 5);
        case "÷": return round((previousNumber / currentNumber), 5);
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

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}