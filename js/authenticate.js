///Switch between portion
const registerButton = document.getElementById('register-choice');
const loginButton = document.getElementById('login-choice');
const authenticateContainer = document.getElementById('authenticate-container');

//Control cover panel.
registerButton.addEventListener('click', () => {
	authenticateContainer.classList.add("right-panel-active");
});
loginButton.addEventListener('click', () => {
	authenticateContainer.classList.remove("right-panel-active");
});

///Login portion

///Register portion
const minc = document.getElementById("register-minc");
const mincDiv = document.getElementById("register-minc-div");
const types = document.getElementsByName("type");
const password = document.getElementById("register-password");
const confirmPassword = document.getElementById("register-confirm-password");
const cPassword = document.getElementById("login-password");
const toggleViewPassword = document.getElementById("register-see-password");
const toggleViewvPassword = document.getElementById("register-se-password");
const toggleViewConfirmPassword = document.getElementById("register-see-confirm-password");

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

//display/hide minc option depending on user type.
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

//verify same confirm password.
[password, confirmPassword].forEach((passwordField) => {
    passwordField.addEventListener("input", (event) => {
        if (password.value !== confirmPassword.value) {
            const error = "Make sure password and confirmed password are the same."
            confirmPassword.setCustomValidity(error);
        }
        else {
            const noError = "";
            confirmPassword.setCustomValidity(noError);
        }
    });
});

//toggle password view
toggleViewPassword.addEventListener("click", (event) => {
    const passwordVisibleType = "text";
    const passwordInvisibleType = "password";
    
    const shouldPasswordBeVisible = password.type == passwordInvisibleType;
    const visibility = shouldPasswordBeVisible ? passwordVisibleType : passwordInvisibleType;

    password.type = visibility;
    // confirmPassword.type = visibility;
});
toggleViewvPassword.addEventListener("click", (event) => {
    const passwordVisibleType = "text";
    const passwordInvisibleType = "password";
    
    const shouldPasswordBeVisible = password.type == passwordInvisibleType;
    const visibility = shouldPasswordBeVisible ? passwordVisibleType : passwordInvisibleType;

    cPassword.type = visibility;
    // confirmPassword.type = visibility;
});
toggleViewConfirmPassword.addEventListener("click", (event) => {
    const passwordVisibleType = "text";
    const passwordInvisibleType = "password";
    
    const shouldPasswordBeVisible = confirmPassword.type == passwordInvisibleType;
    const visibility = shouldPasswordBeVisible ? passwordVisibleType : passwordInvisibleType;

    // password.type = visibility;
    confirmPassword.type = visibility;
});