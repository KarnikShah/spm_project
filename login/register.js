
const minc = document.getElementById("minc");
const country = document.getElementById("country");
const mincDiv = document.getElementById("minc-div");
const types = document.getElementsByName("type");

//Auto capitalize and hyphen minc field.
minc.addEventListener("input", (event) => {
    //remember user cursor position.
    const cursorPosition = minc.selectionStart;
    //clean and enforce field format.
    const cleaned = minc.value.toUpperCase().replace(/[^0-9A-Z]/g, '');
    minc.value = cleaned.replace(/(.{4})(.{4})(.{4})/, '$1-$2-$3')

    //restore user cursor position.
    minc.setSelectionRange(cursorPosition, cursorPosition);
});

//Validate minc format.
minc.addEventListener("input", (event) => {
    if (minc.value.length >= 4) {
        //list regex validator and error message.
        const startWithFourLetters = /^[A-Z]{4}/;
        const startWithFourLettersError = "Must start with four letters for country code and profession code.";
        const onlyNumbersAfterFourth = /^.{4}\d*$/;
        const onlyNumbersAfterFourthError = "Must only have numbers after the four letters for serial code.";

        //clean field.
        const cleaned = minc.value.toUpperCase().replace(/-/g, '');
        //test each validator against value.
        const isValid = [[startWithFourLetters, startWithFourLettersError], [onlyNumbersAfterFourth, onlyNumbersAfterFourthError]].every(([check, errorMsg]) => {
            if (!check.test(cleaned)) {
                minc.setCustomValidity(errorMsg);
                return false;
            }
            return true;
        });
        if (isValid) {
            const noError = "";
            minc.setCustomValidity(noError);
        }
    }
});

//Country validation.
const isCountryValid = country.value;
if (!isCountryValid) {
    const error = "Select a country.";
    country.setCustomValidity(error);
    country.addEventListener("change", (event) => {
        const noError = "";
        country.setCustomValidity(noError);
    }, { once: true });
}

//display/hide minc option
function onChangeTypeHandler(event) {
    if (this.value === "patient") {
        mincDiv.hidden = true;
        minc.disabled = true;
        minc.required = false;
    }
    else {
        minc.disabled = false;
        minc.required = true;
        mincDiv.hidden = false;
    }
}
types.forEach((type) => type.addEventListener("change", onChangeTypeHandler));

