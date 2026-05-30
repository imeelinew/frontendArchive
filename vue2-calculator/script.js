new Vue({
    el: '#app',
    data: {
        display: '0',
        stored: null,
        operator: null,
        waitingForOperand: false,
    },
    methods: {
        inputDigit(digit) {
            if (this.waitingForOperand) {
                this.display = digit
                this.waitingForOperand = false
                return
            }
            if (this.display === '0') {
                this.display = digit
            } else {
                this.display += digit
            }
        },
        inputDot() {
            if (this.waitingForOperand) {
                this.display = '0.'
                this.waitingForOperand = false
                return
            }
            if (!this.display.includes('.')) {
                this.display += '.'
            } else {
                return
            }
        },
        selectOperator(operator) {
            if (this.stored !== null && !this.waitingForOperand) {
                this.display = String(this.calculate(this.stored, Number(this.display), this.operator))
            }
            this.stored = Number(this.display)
            this.operator = operator
            this.waitingForOperand = true
        },
        calculate(firstNum, secondNum, operator) {
            if (operator === '+') {
                return firstNum + secondNum
            } else if (operator === '-') {
                return firstNum - secondNum
            } else if (operator === '*') {
                return firstNum * secondNum
            } else if (operator === '/') {
                return firstNum / secondNum
            }
        },
        deleteDigit() {
            if (this.waitingForOperand) return

            if (this.display.length > 1) {
                this.display = this.display.slice(0, -1)
            } else {
                this.display = '0'
            }
        },
        toggle() {
            this.display = String(Number(this.display) * -1)
        },
        percent() {
            this.display = String(Number(this.display) / 100)
        },
        equals() {
            if (this.stored === null || this.operator === null) return
            const result = this.calculate(this.stored, Number(this.display), this.operator)
            this.display = String(result)
            this.stored = null
            this.operator = null
            this.waitingForOperand = true
        },
        clear() {
            this.display = '0'
            this.stored = null
            this.operator = null
            this.waitingForOperand = false
        }
    }
});