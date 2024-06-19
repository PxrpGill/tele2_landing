document.addEventListener("DOMContentLoaded", function () {
    const inputTel = document.querySelector('.main__processing-personal-data-input-tel');

    let getInputNumberValue = function (input) {
        return input.value.replace(/\D/g, "");
    };

    let onPhoneInput = function (event) {
        let input = event.target;
        let inputNumbersValue = getInputNumberValue(input);
        let formattedInputValue = '';
        let selectionStart = input.selectionStart;

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            if (event.data && /\D/g.test(event.data))
                input.value = inputNumbersValue;
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            //Русские номера телефонов
            if (inputNumbersValue[0] == '9') {
                inputNumbersValue = "7" + inputNumbersValue;
            }
            let firstSymbols = (inputNumbersValue[0] == '8') ? '8' : '+7';
            formattedInputValue = firstSymbols + " ";

            if (inputNumbersValue.length > 1) {
                formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
            }

            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
            }

            if (inputNumbersValue.length >= 8) {
                formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
            }

            if (inputNumbersValue.length >= 10) {
                formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
            }

        } else {
            // Иностранные номера телефонов
            formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
        }

        input.value = formattedInputValue;
    };

    let onPhoneKeyDown = function (event) {
        let input = event.target;
        if (event.keyCode == 8 && getInputNumberValue(input).length == 1) {
            input.value = '';
        }
    }

    let onPhonePaste = function (event) {
        let pasted = event.clipboardData || window.clipboardData;
        let input = event.target;
        let inputNumbersValue = getInputNumberValue(input);

        if (pasted) {
            let pastedText = pasted.getData("Text");
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
            }
        }
    }

    inputTel.addEventListener("input", onPhoneInput);
    inputTel.addEventListener('keydown', onPhoneKeyDown);
    inputTel.addEventListener('paste', onPhonePaste);
});