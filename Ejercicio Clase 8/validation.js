document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('subscriptionForm');

    // Validación de cada campo en el evento "blur"
    form.addEventListener('blur', function (event) {
        const field = event.target;
        validateField(field);
    }, true);

    // Remover el mensaje de error en el evento "focus"
    form.addEventListener('focus', function (event) {
        const field = event.target;
        clearError(field);
    }, true);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;
        const fields = form.querySelectorAll('input');

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            showSuccessMessage(fields);
        } else {
            showErrorMessage(fields);
        }
    });

    function validateField(field) {
        let valid = true;
        const errorElement = document.getElementById(`error-${field.id}`);
        const value = field.value.trim();

        switch (field.id) {
            case 'nombre':
                valid = value.length > 6 && value.includes(' ');
                errorElement.textContent = valid ? '' : 'El nombre debe tener más de 6 letras y un espacio.';
                break;
            case 'email':
                valid = /\S+@\S+\.\S+/.test(value);
                errorElement.textContent = valid ? '' : 'Ingresa un email válido.';
                break;
            case 'password':
                valid = value.length >= 8 && /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
                errorElement.textContent = valid ? '' : 'La contraseña debe tener al menos 8 caracteres y contener letras y números.';
                break;
            case 'confirmPassword':
                const password = document.getElementById('password').value;
                valid = value === password;
                errorElement.textContent = valid ? '' : 'Las contraseñas no coinciden.';
                break;
            case 'edad':
                valid = Number.isInteger(Number(value)) && Number(value) >= 18;
                errorElement.textContent = valid ? '' : 'La edad debe ser un número entero mayor o igual a 18.';
                break;
            case 'telefono':
                valid = /^\d{7,}$/.test(value);
                errorElement.textContent = valid ? '' : 'El teléfono debe tener al menos 7 dígitos.';
                break;
            case 'direccion':
                valid = value.length >= 5 && /[a-zA-Z]/.test(value) && /\d/.test(value) && value.includes(' ');
                errorElement.textContent = valid ? '' : 'La dirección debe tener al menos 5 caracteres, letras, números y un espacio.';
                break;
            case 'ciudad':
                valid = value.length >= 3;
                errorElement.textContent = valid ? '' : 'La ciudad debe tener al menos 3 caracteres.';
                break;
            case 'codigoPostal':
                valid = value.length >= 3;
                errorElement.textContent = valid ? '' : 'El código postal debe tener al menos 3 caracteres.';
                break;
            case 'dni':
                valid = /^\d{7,8}$/.test(value);
                errorElement.textContent = valid ? '' : 'El DNI debe tener 7 u 8 dígitos.';
                break;
        }

        field.classList.toggle('is-invalid', !valid);
        field.classList.toggle('is-valid', valid);

        return valid;
    }

    function clearError(field) {
        const errorElement = document.getElementById(`error-${field.id}`);
        errorElement.textContent = '';
        field.classList.remove('is-invalid');
        field.classList.remove('is-valid');
    }

    function showSuccessMessage(fields) {
        const data = Array.from(fields).reduce((acc, field) => {
            acc[field.id] = field.value;
            return acc;
        }, {});
        alert(`Formulario enviado con éxito:\n${JSON.stringify(data, null, 2)}`);
    }

    function showErrorMessage(fields) {
        const errors = Array.from(fields).filter(field => field.classList.contains('is-invalid')).map(field => {
            return `${field.previousElementSibling.textContent}: ${document.getElementById(`error-${field.id}`).textContent}`;
        }).join('\n');
        alert(`Errores en el formulario:\n${errors}`);
    }
});
