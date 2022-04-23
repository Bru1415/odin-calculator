// the logic for calculating with floating numbers was copied nearly one to one from:    https://gist.github.com/rockagen/9913346


const gF_add = (num1, num2) => {

    let baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }

    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));

    console.log("base: " + baseNum);

    return (num1 * baseNum + num2 * baseNum) / baseNum;

    // return (+num1) + (+num2);
}

const gF_subtract = (num1, num2) => {

    let baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }

    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));

    console.log("base: " + baseNum);

    return (num1 * baseNum - num2 * baseNum) / baseNum;

    // return (+num1) - (+num2);
}

const gF_multiply = (num1, num2) => {

    
    var baseNum = 0;
		try {
			baseNum += num1.toString().split(".")[1].length;
		} catch (e) {
		}
		try {
			baseNum += num2.toString().split(".")[1].length;
		} catch (e) {
		}
		return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
    
    // return (+num1) * (+num2);
}

const gF_divide = (num1, num2) => {

    let baseNum1 = 0, baseNum2 = 0;
    let baseNum3, baseNum4;

    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum3 = Number(num1.toString().replace(".", ""));
    baseNum4 = Number(num2.toString().replace(".", ""));
    return (baseNum3 / baseNum4) * (Math.pow(10, baseNum2 - baseNum1));

    // return (+num1) / (+num2);
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
    isNumberPadAllowed = true;
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
let isNumberPadAllowed = true;
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
            isNumberPadAllowed = false;

        } else if (targetBtn.className === 'operator' && isFirstNumberPushed) {


            if (isEqualStepOperationUsed) {

                gV_operator = targetBtn.textContent;
                isChainedOperationUsed = true;
                isEqualStepOperationUsed = false;
                isNumberPadAllowed = true;

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

            if (isNumberPadAllowed) {
                
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
    }

});