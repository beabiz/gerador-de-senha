document.addEventListener("DOMContentLoaded", function() {
    generatePassword();
});

// Seleciona os elementos de entrada
const rangeInput = document.getElementById('inputSizePass');
const textInput = document.getElementById('inputRangeSizePass');

// Atualiza o valor do input text quando o input range for alterado
rangeInput.addEventListener('input', function () {
    textInput.value = rangeInput.value;
});

document.getElementById("generate-btn").addEventListener("click", generatePassword);
document.getElementById("copy-btn").addEventListener("click", copyPassword);
document.getElementById("copy-icon").addEventListener("click", copyPassword);

function generatePassword() {
    const length = document.getElementById("inputSizePass").value;
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let charSet = "";
    if (includeUppercase) charSet += uppercaseChars;
    if (includeLowercase) charSet += lowercaseChars;
    if (includeNumbers) charSet += numberChars;
    if (includeSymbols) charSet += symbolChars;

    if (charSet === "") {
        charSet += lowercaseChars;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }

    document.getElementById("password").value = password;
    evaluatePasswordStrength(password);
}

function copyPassword() {
    const passwordField = document.getElementById("password").value;
    if (navigator && navigator.clipboard && navigator.clipboard.writeText){
        alert("Senha copiada para a área de transferência!")
        return navigator.clipboard.writeText(passwordField);
        }
    else{    
        alert("Erro");
    }
}

document.getElementById("inputSizePass").oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #fff 0%, #fff ' + value + '%, #2C1746 ' + value + '%, #2C1746 100%)'
  };

function evaluatePasswordStrength(password) {

    let strength = 0;

    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const strengthBar = document.getElementById("strength-bar");
    if (password.length >= 12 && strength >= 4) {
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "#00FF85";
    } else if (password.length >= 8 && strength >= 3) {
        strengthBar.style.width = "66%";
        strengthBar.style.backgroundColor = "#FAF408";
    } else {
        strengthBar.style.width = "33%";
        strengthBar.style.backgroundColor = "#E71B32";
    }
}
