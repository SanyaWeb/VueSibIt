import Inputmask from "inputmask";

function  isInteger(num) {
    return (num ^ 0) === num;
}

class InputFormatNumber {
    constructor() {
        this.result = {
            valid: true,
            error: "",
            position: null
        }
    }

    init(htmlElement, field) {

        let numberMask = new Inputmask({
            regex: "([0-9 ]+)",
            placeholder: ""
        });

        numberMask.mask(htmlElement);

        this.result.value = field.value;

        htmlElement.onblur = (e) => {

            let valDigitsString = e.target.value.replace(/[^0-9+]/g, ''),
                valDigitsNumber = Number(valDigitsString),
                valDigitsStringClear = String(valDigitsNumber);

            this.result.value = valDigitsStringClear;

        };
    }

    getResult() {
        return this.result;
    }
    /** Format field  'oninput' event */

    inputFormatField(htmlElement, field) {

        let valReal = field.value,
            valDigitsString = valReal.replace(/[^0-9+]/g, ''),
            oldVal = String(field.result.value),
            result = {
                valid: true,
                error: "",
            };

        let validate = this.inputValidate(valDigitsString, field.inputValidateParams);
        if (!validate.result) {
            result.valid = false;
            result.error = validate.error;
            result.value = oldVal;
        } else {
            result.value = valReal;
        }
        this.result = result;
    }

    /** Validate val by params */
    inputValidate(val, params) {
        let validate = {
            result: true,
            error: ""
        };

        if(!isInteger(Number(val))) {
            return {
                result: false,
                error: "Допустимы только целые числа"
            }
        }
        if(typeof params.max === "number") {
            if(Number(val) > params.max) {
                return {
                    result: false,
                    error: params.maxError
                }
            }
        }

        return validate;
    }

    /** Format string to form '000 000 000' */
    formatNum(val) {
        val = val.replace(/[^0-9+]/g, '');
        return val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }

}

export default InputFormatNumber;