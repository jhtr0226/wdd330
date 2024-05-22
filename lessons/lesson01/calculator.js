let calculator = {
    read() {
        this.a = +prompt('a?', 0);
        this.b = +prompt('b?', 0);
    },
    sum() {
        return this.a + this.b;
    },
    mul() {
        return this.a * this.b;
    },
    sub() {
        return this.a - this.b;
    },
    div() {
        if (this.b === 0) {
            return 'Error: Division by zero';
        }
        return this.a / this.b;
    }
};

calculator.read();
alert('Sum: ' + calculator.sum());
alert('Multiplication: ' + calculator.mul());
alert('Subtraction: ' + calculator.sub());
alert('Division: ' + calculator.div());