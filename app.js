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

    if(typeof operator !== 'string'){
        consol.table('not a string');
       operator =  String(operator);
       console.table(operator);
    }

    if(operator !== '+' && operator !== '-' && operator !== '*' && operator !== '/'){
        return 'wrong operator';
    }

    switch (operator) {
        case '+':
           return gF_add(num1, num2);
            // break;
        case '-':
           return gF_subtract(num1,num2);
            // break;
        case '*':
            return gF_multiply(num1,num2);
            // break;
        case '/':
            return gF_divide(num1,num2);
            // break;

        default:
             console.table('Unknown command');
             return;

    }
}

const gE_CalcContainer = document.querySelector('#calc-container');
const gE_calcDisplay = document.querySelector('#display');

gE_CalcContainer.addEventListener('click',(event) => {

    console.log(event.target.tagName);
if(event.target.tagName === 'BUTTON'){
    gE_calcDisplay.textContent = event.target.textContent;
}

});
