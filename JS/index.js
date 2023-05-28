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
let equalPressed = false;

digits.forEach(digit => digit.addEventListener('click', () => {
    if (equalPressed){
        currentInput="";
    }
    currentInput += digit.textContent;
    currentDisplay.textContent = currentInput;
    currentNumber = Number(currentInput);

    equalPressed = false;
}));

operators.forEach(op => op.addEventListener('click', () => {
    operator = op.textContent;
    
    if (previousDisplay.textContent == ""){
        previousNumber = currentNumber;
        currentNumber = 0;
        currentInput = "";
        previousDisplay.textContent = `${previousNumber} ${operator}`
        currentDisplay.textContent = "";
        return;
    }
}));

equal.addEventListener('click', () => {
    if (equalPressed) return;

    answer = calculate(operator);

    previousDisplay.textContent = `${previousNumber} ${operator} ${currentNumber} =`;
    currentDisplay.textContent = answer;
    previousNumber = answer;
    operator = "";
    equalPressed = true;
});

// ------------------------------------------------------------
// Functions

function calculate(operator){
    switch(operator){
        case "+": return previousNumber + currentNumber;
        case "-": return previousNumber - currentNumber;
        case "X": return previousNumber * currentNumber;
        case "÷": return previousNumber / currentNumber;
        default: return
    }
}