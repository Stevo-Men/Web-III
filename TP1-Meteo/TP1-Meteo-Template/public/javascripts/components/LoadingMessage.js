export function showLoading() {
    const loadingMessageDiv = document.getElementById('loading-message');
    loadingMessageDiv.classList.remove('d-none');  // Show loading message
}

export function hideLoading() {
    const loadingMessageDiv = document.getElementById('loading-message');
    loadingMessageDiv.classList.add('d-none');  // Hide loading message
}
