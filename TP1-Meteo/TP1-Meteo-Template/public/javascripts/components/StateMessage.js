export function showLoading() {
    const loadingMessageDiv = document.getElementById('loading-message');
    loadingMessageDiv.classList.remove('d-none');  // Show loading message
}

export function hideLoading() {
    const loadingMessageDiv = document.getElementById('loading-message');
    loadingMessageDiv.classList.add('d-none');  // Hide loading message
}

export function showError(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.querySelector('span').textContent = message;
    errorMessageDiv.classList.remove('d-none');
    
    setTimeout(() => {
        errorMessageDiv.classList.add('d-none');
    }, 5000);
}

