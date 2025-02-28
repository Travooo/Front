function togglePasswordVisibility(id) {
    let input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function togglePasswordIcon(input) {
    let icon = input.nextElementSibling.nextElementSibling;
    if (input.value.length > 0) {
        icon.style.display = 'inline';
    } else {
        icon.style.display = 'none';
    }
}

function hidePasswordIcon(input) {
    if (input.value.length === 0) {
        let icon = input.nextElementSibling.nextElementSibling;
        icon.style.display = 'none';
    }
}

function showPasswordIcon(input) {
    let icon = input.nextElementSibling.nextElementSibling;
    icon.style.display = 'inline';
}

function redirectToConfirmation() {
    window.location.href = "pg_validation.html"; 
}