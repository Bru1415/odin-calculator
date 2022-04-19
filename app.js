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