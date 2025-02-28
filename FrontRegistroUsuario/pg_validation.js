function moveToNext(input, index) {
    const inputs = document.querySelectorAll(".code-input");
    
    // Move para o próximo input se tiver preenchido
    if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
    }

    // Verifica se todos os campos foram preenchidos
    let codeComplete = Array.from(inputs).every(input => input.value.length === 1);
    
    if (codeComplete) {
        document.getElementById("confirmation-message").classList.remove("hidden");
    }
}
