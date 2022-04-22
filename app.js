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
    gV_solution = '';
    gV_numberBuffer = '';
    gV_operator = '';
    gE_calcDisplay.textContent = '';
    isChainedOperationUsed = false;
    isEqualStepOperationUsed = false;
    isFirstNumberPushed = false;
    isFirstOperatorPushed = false;
}

const gE_CalcContainer = document.querySelector('#calc-container');
let gE_calcDisplay = document.querySelector('#display');
let gV_numberBuffer = '';
let gV_firstOperand = '';
let gV_secondOperand = '';
let gV_operator = '';
let isFirstNumberPushed = false;
let isFirstOperatorPushed = false;
let isChainedOperationUsed = false;
let isEqualStepOperationUsed = false;
let targetBtn = null;
let gV_solution = '';

gE_CalcContainer.addEventListener('click', (event) => {

    event.preventDefault();

    targetBtn = event.target;

    if (targetBtn.tagName === 'BUTTON') {

        if (targetBtn.id === 'equals' && isChainedOperationUsed && isFirstOperatorPushed) {

            gV_secondOperand = gV_numberBuffer;
            gV_solution = gF_operate(gV_firstOperand, gV_secondOperand, gV_operator);
            gE_calcDisplay.textContent = gV_solution;

            gV_firstOperand = gV_solution;
            isChainedOperationUsed = false;
            isEqualStepOperationUsed = true;

        } else if (targetBtn.className === 'operator' && isFirstNumberPushed) {


            if (isEqualStepOperationUsed) {

                gV_operator = targetBtn.textContent;
                isChainedOperationUsed = true;
                isEqualStepOperationUsed = false;

            } else if (isChainedOperationUsed) {

                gV_secondOperand = gV_numberBuffer;
                gV_solution = gF_operate(gV_firstOperand, gV_secondOperand, gV_operator);
                gE_calcDisplay.textContent = gV_solution;

                gV_firstOperand = gV_solution;
                gV_operator = targetBtn.textContent;

            } else {

                gV_operator = targetBtn.textContent;

                gV_firstOperand = gV_numberBuffer;
                gV_numberBuffer = '';
                gE_calcDisplay.textContent = '';
                isChainedOperationUsed = true;
                isFirstOperatorPushed = true;

            }

        } else if (targetBtn.className.includes('sign') && isFirstNumberPushed) {

            if (targetBtn.id === 'point') {
                gE_calcDisplay.textContent += targetBtn.textContent;
                gV_numberBuffer += targetBtn.textContent;
            } else if (targetBtn.id === 'pre-sign') {
                gE_calcDisplay.textContent = String((+gE_calcDisplay.textContent) * (-1));
                gV_numberBuffer = String((+gV_numberBuffer) * (-1));
            }

        } else if (targetBtn.id === 'clear-calc') {

            gF_clearCalc();


        } else if (targetBtn.className === 'number') {

            isFirstNumberPushed = true;

            if (gV_solution) {

                gE_calcDisplay.textContent = '';
                gV_solution = '';
                gV_secondOperand = '';
                gV_numberBuffer = '';

            }

            gE_calcDisplay.textContent += targetBtn.textContent;
            gV_numberBuffer += targetBtn.textContent;

        }

    }

});