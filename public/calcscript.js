const numberButton = document.querySelectorAll('.number');
const operatorButton = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');

let currentOperand = document.querySelector('.current-input');
let previousOperand = document.querySelector('.previous-input');
let operator = undefined;
let result = null;

clearButton.addEventListener('click', () => {
    operator = undefined;
    result = null;
    currentOperand.textContent = '';
    previousOperand.textContent = '';
})

deleteButton.addEventListener('click', () => {
    currentOperand.textContent = currentOperand.textContent.slice(0, -1);
})

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperand.textContent.includes('.') && button.textContent == '.') return;
        currentOperand.textContent += button.textContent;
    })
})

operatorButton.forEach(opButton => {
    opButton.addEventListener('click', () => {
       if (currentOperand.textContent == '') {
        return;
       } else if (currentOperand.textContent != '' && previousOperand.textContent == '') {
        operator = opButton.textContent;
        previousOperand.textContent = currentOperand.textContent + opButton.textContent;
        currentOperand.textContent = '';
       } else if (currentOperand.textContent != '' && previousOperand.textContent != '') {
        operate();
        previousOperand.textContent = result + opButton.textContent;
        currentOperand.textContent = '';
        operator = opButton.textContent;
       }
    })
})

equalsButton.addEventListener('click', () => {
    if (currentOperand.textContent == '' || previousOperand.textContent == '') {
        return
    } else {
        operate();
        currentOperand.textContent = result;
        previousOperand.textContent = '';
    }
})

const operate = function () {
    let num2 = Number(currentOperand.textContent);
    let num1 = Number(previousOperand.textContent.replace(/[^0-9.]/g, ''));
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case 'x':
            result = num1 * num2
            break;
        case '÷':
            result = num1 / num2;
            break;
        default:
            return;
    }
}