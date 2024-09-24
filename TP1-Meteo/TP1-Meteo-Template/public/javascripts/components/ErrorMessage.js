export function showError(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.querySelector('span').textContent = message;
    errorMessageDiv.classList.remove('d-none');
    
    setTimeout(() => {
        errorMessageDiv.classList.add('d-none');
    }, 5000);
}


