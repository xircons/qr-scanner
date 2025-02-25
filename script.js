document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const charCount = document.getElementById('char-count');
    const resultElement = document.getElementById('result');

    if (file) {
        charCount.textContent = file.name;
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                const urlPattern = /^(https?:\/\/[^\s]+)/;
                if (urlPattern.test(code.data)) {
                    resultElement.innerHTML = `<a href="${code.data}" target="_blank">${code.data}</a>`;
                } else {
                    resultElement.textContent = code.data;
                }
            } else {
                resultElement.textContent = 'No QR code found.';
            }
        };
        img.src = URL.createObjectURL(file);
    } else {
        charCount.textContent = 'No file chosen';
    }
});

const fileUpload = document.querySelector('.file-upload');
const fileInput = document.getElementById('fileInput');

fileUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUpload.classList.add('dragover');
});

fileUpload.addEventListener('dragleave', (e) => {
    e.preventDefault();
    fileUpload.classList.remove('dragover');
});

fileUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUpload.classList.remove('dragover');
    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event('change'));
});