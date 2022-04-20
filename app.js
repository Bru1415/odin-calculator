const gF_add = (num1, num2) => {

    return (+num1) + (+num2);
}

const gF_subtract = (num1, num2) => {

    return (+num1) - (+num2);
}

const gF_multiply = (num1, num2) => {

    return (+num1) * (+num2);
}

const gF_divide = (num1, num2) => {

    return (+num1) / (+num2);
}

const gF_operate = (num1, num2, operator) => {

    if (typeof operator !== 'string') {
        consol.table('not a string');
        operator = String(operator);
        console.table(operator);
    }

    if (operator !== '+' && operator !== '-' && operator !== '*' && operator !== '/') {
        return 'wrong operator';
    }

    switch (operator) {
        case '+':
            return gF_add(num1, num2);
            // break;
        case '-':
            return gF_subtract(num1, num2);
            // break;
        case '*':
            return gF_multiply(num1, num2);
            // break;
        case '/':
            return gF_divide(num1, num2);
            // break;

        default:
            console.table('Unknown command');
            return;

    }
}

const gE_CalcContainer = document.querySelector('#calc-container');
const gE_calcDisplay = document.querySelector('#display');
let gV_numberBuffer = '';
let gV_firstOperand = '';
let gV_secondOperand = '';
let gV_operator = '';
let gV_operatorCounter = 0;

gE_CalcContainer.addEventListener('click', (event) => {

    if (event.target.tagName === 'BUTTON') {

        if (event.target.className === 'number') {
            gE_calcDisplay.textContent += event.target.textContent;
            gV_numberBuffer += event.target.textContent;
            console.log(gV_numberBuffer);
        }else if (event.target.className === 'operator') {
            console.log('operator');
            gV_operatorCounter++;
            gV_firstOperand = gV_numberBuffer;
        }else if (event.target.className.includes('sign')){
            console.log('sign');
        }else if (event.target.id === 'clear-calc'){
            console.log('clear');
        }else if (event.target.id === 'equals'){
            console.log('equals');
        }
    }

});