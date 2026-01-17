// Elementos del DOM
const form = document.getElementById("registroForm");
const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const edadInput = document.getElementById("edad");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const successAlert = document.getElementById("successAlert");

// Objeto para guardar el estado de validación
const validationState = {
    nombre: false,
    email: false,
    password: false,
    confirmPassword: false,
    edad: false,
};

// Expresiones regulares
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

// ==================== VALIDACIÓN DE NOMBRE ====================
function validarNombre() {
    const valor = nombreInput.value.trim();
    const errorMsg = document.getElementById("errorNombre");
    const successMsg = document.getElementById("successNombre");

    nombreInput.classList.remove("valid", "invalid");
    errorMsg.classList.remove("show");
    successMsg.classList.remove("show");

    if (valor === "") {
        errorMsg.textContent = "El nombre es requerido";
        errorMsg.classList.add("show");
        nombreInput.classList.add("invalid");
        validationState.nombre = false;
        return false;
    }

    if (valor.length < 3) {
        errorMsg.textContent = "El nombre debe tener mínimo 3 caracteres";
        errorMsg.classList.add("show");
        nombreInput.classList.add("invalid");
        validationState.nombre = false;
        return false;
    }

    nombreInput.classList.add("valid");
    successMsg.textContent = "✓ Nombre válido";
    successMsg.classList.add("show");
    validationState.nombre = true;
    return true;
}

// ==================== VALIDACIÓN DE EMAIL ====================
function validarEmail() {
    const valor = emailInput.value.trim();
    const errorMsg = document.getElementById("errorEmail");
    const successMsg = document.getElementById("successEmail");

    emailInput.classList.remove("valid", "invalid");
    errorMsg.classList.remove("show");
    successMsg.classList.remove("show");

    if (valor === "") {
        errorMsg.textContent = "El correo electrónico es requerido";
        errorMsg.classList.add("show");
        emailInput.classList.add("invalid");
        validationState.email = false;
        return false;
    }

    if (!emailRegex.test(valor)) {
        errorMsg.textContent = "Ingresa un correo electrónico válido";
        errorMsg.classList.add("show");
        emailInput.classList.add("invalid");
        validationState.email = false;
        return false;
    }

    emailInput.classList.add("valid");
    successMsg.textContent = "✓ Correo válido";
    successMsg.classList.add("show");
    validationState.email = true;
    return true;
}

// ==================== VALIDACIÓN DE CONTRASEÑA ====================
function validarPassword() {
    const valor = passwordInput.value;
    const errorMsg = document.getElementById("errorPassword");
    const successMsg = document.getElementById("successPassword");

    passwordInput.classList.remove("valid", "invalid");
    errorMsg.classList.remove("show");
    successMsg.classList.remove("show");

    // Verificar requisitos
    const tieneLength = valor.length >= 8;
    const tieneNumero = /\d/.test(valor);
    const tieneEspecial = specialCharRegex.test(valor);

    // Actualizar indicadores visuales
    actualizarRequisito("req-length", tieneLength);
    actualizarRequisito("req-number", tieneNumero);
    actualizarRequisito("req-special", tieneEspecial);

    if (valor === "") {
        errorMsg.textContent = "La contraseña es requerida";
        errorMsg.classList.add("show");
        passwordInput.classList.add("invalid");
        validationState.password = false;
        return false;
    }

    if (!tieneLength) {
        errorMsg.textContent = "La contraseña debe tener mínimo 8 caracteres";
        errorMsg.classList.add("show");
        passwordInput.classList.add("invalid");
        validationState.password = false;
        return false;
    }

    if (!tieneNumero) {
        errorMsg.textContent = "La contraseña debe contener al menos un número";
        errorMsg.classList.add("show");
        passwordInput.classList.add("invalid");
        validationState.password = false;
        return false;
    }

    if (!tieneEspecial) {
        errorMsg.textContent = "La contraseña debe contener al menos un carácter especial (!@#$%^&*)";
        errorMsg.classList.add("show");
        passwordInput.classList.add("invalid");
        validationState.password = false;
        return false;
    }

    passwordInput.classList.add("valid");
    successMsg.textContent = "✓ Contraseña válida";
    successMsg.classList.add("show");
    validationState.password = true;

    // Revalidar confirmación de contraseña si ya tiene valor
    if (confirmPasswordInput.value) {
        validarConfirmPassword();
    }

    return true;
}

// Función auxiliar para actualizar requisitos visuales
function actualizarRequisito(id, cumple) {
    const element = document.getElementById(id);
    if (cumple) {
        element.classList.add("met");
    } else {
        element.classList.remove("met");
    }
}

// ==================== VALIDACIÓN DE CONFIRMACIÓN DE CONTRASEÑA ====================
function validarConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const errorMsg = document.getElementById("errorConfirmPassword");
    const successMsg = document.getElementById("successConfirmPassword");

    confirmPasswordInput.classList.remove("valid", "invalid");
    errorMsg.classList.remove("show");
    successMsg.classList.remove("show");

    if (confirmPassword === "") {
        errorMsg.textContent = "Debes confirmar la contraseña";
        errorMsg.classList.add("show");
        confirmPasswordInput.classList.add("invalid");
        validationState.confirmPassword = false;
        return false;
    }

    if (password !== confirmPassword) {
        errorMsg.textContent = "Las contraseñas no coinciden";
        errorMsg.classList.add("show");
        confirmPasswordInput.classList.add("invalid");
        validationState.confirmPassword = false;
        return false;
    }

    confirmPasswordInput.classList.add("valid");
    successMsg.textContent = "✓ Contraseñas coinciden";
    successMsg.classList.add("show");
    validationState.confirmPassword = true;
    return true;
}

// ==================== VALIDACIÓN DE EDAD ====================
function validarEdad() {
    const valor = edadInput.value;
    const errorMsg = document.getElementById("errorEdad");
    const successMsg = document.getElementById("successEdad");

    edadInput.classList.remove("valid", "invalid");
    errorMsg.classList.remove("show");
    successMsg.classList.remove("show");

    if (valor === "" || valor === null) {
        errorMsg.textContent = "La edad es requerida";
        errorMsg.classList.add("show");
        edadInput.classList.add("invalid");
        validationState.edad = false;
        return false;
    }

    const edad = parseInt(valor);

    if (isNaN(edad)) {
        errorMsg.textContent = "Ingresa una edad válida";
        errorMsg.classList.add("show");
        edadInput.classList.add("invalid");
        validationState.edad = false;
        return false;
    }

    if (edad < 18) {
        errorMsg.textContent = "Debes tener 18 años o más";
        errorMsg.classList.add("show");
        edadInput.classList.add("invalid");
        validationState.edad = false;
        return false;
    }

    edadInput.classList.add("valid");
    successMsg.textContent = "✓ Edad válida";
    successMsg.classList.add("show");
    validationState.edad = true;
    return true;
}

// ==================== VALIDAR TODO EL FORMULARIO ====================
function validarFormularioCompleto() {
    validarNombre();
    validarEmail();
    validarPassword();
    validarConfirmPassword();
    validarEdad();

    const todosValidos = Object.values(validationState).every((valor) => valor === true);

    if (todosValidos) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// ==================== EVENT LISTENERS ====================

// Validación en tiempo real
nombreInput.addEventListener("blur", validarNombre);
nombreInput.addEventListener("input", () => {
    if (validationState.nombre) {
        validarNombre();
    }
    validarFormularioCompleto();
});

emailInput.addEventListener("blur", validarEmail);
emailInput.addEventListener("input", () => {
    if (validationState.email) {
        validarEmail();
    }
    validarFormularioCompleto();
});

passwordInput.addEventListener("blur", validarPassword);
passwordInput.addEventListener("input", () => {
    validarPassword();
    validarFormularioCompleto();
});

confirmPasswordInput.addEventListener("blur", validarConfirmPassword);
confirmPasswordInput.addEventListener("input", () => {
    if (validationState.confirmPassword) {
        validarConfirmPassword();
    }
    validarFormularioCompleto();
});

edadInput.addEventListener("blur", validarEdad);
edadInput.addEventListener("input", () => {
    if (validationState.edad) {
        validarEdad();
    }
    validarFormularioCompleto();
});

// Envío del formulario
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validar una última vez
    validarFormularioCompleto();

    // Si todos los campos son válidos
    if (Object.values(validationState).every((valor) => valor === true)) {
        // Mostrar alerta de éxito
        successAlert.style.display = "block";
        successAlert.scrollIntoView({ behavior: "smooth" });

        // Resetear el formulario después de 2 segundos
        setTimeout(() => {
            form.reset();
            successAlert.style.display = "none";
            resetValidationState();
        }, 2000);
    }
});

// Botón de reinicio
resetBtn.addEventListener("click", function () {
    resetValidationState();
    successAlert.style.display = "none";
});

// Función para reiniciar el estado de validación
function resetValidationState() {
    for (let key in validationState) {
        validationState[key] = false;
    }

    // Limpiar estilos
    [nombreInput, emailInput, passwordInput, confirmPasswordInput, edadInput].forEach((input) => {
        input.classList.remove("valid", "invalid");
    });

    // Limpiar mensajes
    document.querySelectorAll(".error-message, .success-message").forEach((msg) => {
        msg.classList.remove("show");
        msg.textContent = "";
    });

    // Limpiar requisitos
    document.querySelectorAll(".requirement").forEach((req) => {
        req.classList.remove("met");
    });

    // Deshabilitar botón de envío
    submitBtn.disabled = true;
}

// Inicializar con botón deshabilitado
submitBtn.disabled = true;
