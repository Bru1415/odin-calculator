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

const gF_clearCalc = () => {


    gV_firstOperand = '';
    gV_secondOperand = '';
    gV_operatorCounter = 0;
    gV_numberBuffer = '';
}

const gE_CalcContainer = document.querySelector('#calc-container');
let gE_calcDisplay = document.querySelector('#display');
let gV_numberBuffer = '';
let gV_firstOperand = '';
let gV_secondOperand = '';
let gV_operator = '';
let gV_operatorCounter = 0;
let targetBtn = null;
let gV_solution = '';

gE_CalcContainer.addEventListener('click', (event) => {

    event.preventDefault();

    targetBtn = event.target;

    if (targetBtn.tagName === 'BUTTON') {

        if (targetBtn.id === 'equals' || gV_operatorCounter === 2) {

            console.log(gV_operatorCounter);
            gV_secondOperand = gV_numberBuffer;
            gV_solution = gF_operate(gV_firstOperand, gV_secondOperand, gV_operator);
            gE_calcDisplay.textContent = gV_solution;
            gF_clearCalc();
            gV_numberBuffer = gV_solution;

        } else if (targetBtn.className === 'operator') {

            gV_operator = targetBtn.textContent;
            gV_operatorCounter++;
            gV_firstOperand = gV_numberBuffer;
            gV_numberBuffer = '';
            gE_calcDisplay.textContent = '';

        } else if (targetBtn.className.includes('sign')) {

            console.log('sign');
            if (targetBtn.id === 'point') {
                gE_calcDisplay.textContent += targetBtn.textContent;
                gV_numberBuffer += targetBtn.textContent;
            } else if (targetBtn.id === 'pre-sign') {
                gE_calcDisplay.textContent = String((+gE_calcDisplay.textContent) * (-1));
                gV_numberBuffer = String((+gV_numberBuffer) * (-1));
            }

        } else if (targetBtn.id === 'clear-calc') {

            gF_clearCalc();
            gE_calcDisplay.textContent = '';

        } else if (targetBtn.className === 'number') {


            gE_calcDisplay.textContent += targetBtn.textContent;
            gV_numberBuffer += targetBtn.textContent;
        }
    }

});