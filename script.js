document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput");
    const outputText = document.getElementById("outputText");
    const previewButton = document.getElementById("previewButton");
    const downloadButton = document.getElementById("downloadButton");
    const copyButton = document.getElementById("copyButton");
    const toggleCursor = document.getElementById("toggleCursor");
    const fontSelector = document.getElementById("fontSelector");
    const speedSlider = document.getElementById("speedSlider");
    const speedValue = document.getElementById("speedValue");
    const dropArea = document.getElementById("dropArea");
    const textContainer = document.querySelector(".text-container");
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:',.<>?";
    
    let revealSpeed = 50;  // Default speed

    function randomCharacter() {
        return characters.charAt(Math.floor(Math.random() * characters.length));
    }

    function revealText(targetText) {
        let index = 0;
        let currentText = "";

        function update() {
            if (index < targetText.length) {
                if (Math.random() < 0.5) {
                    outputText.textContent = currentText + randomCharacter();
                } else {
                    currentText += targetText[index];
                    index++;
                    outputText.textContent = currentText;
                }
                setTimeout(update, revealSpeed); // Adjust timing for speed and effect
            } else {
                outputText.textContent = targetText; // Ensure final text is correct
            }
        }

        update();
    }

    previewButton.addEventListener("click", () => {
        revealText(textInput.value);
    });

    toggleCursor.addEventListener("change", (event) => {
        if (event.target.checked) {
            textContainer.classList.remove("no-cursor");
        } else {
            textContainer.classList.add("no-cursor");
        }
    });

    fontSelector.addEventListener("change", (event) => {
        outputText.style.fontFamily = event.target.value;
    });

    speedSlider.addEventListener("input", (event) => {
        revealSpeed = parseInt(event.target.value, 10);
        speedValue.textContent = revealSpeed;
    });

    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropArea.classList.add('active');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('active');
    });

    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dropArea.classList.remove('active');
        
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const font = new FontFace('UploadedFont', `url(${e.target.result})`);
                document.fonts.add(font);
                font.load().then(() => {
                    outputText.style.fontFamily = 'UploadedFont';
                    fontSelector.innerHTML += `<option value="UploadedFont" selected>Uploaded Font</option>`;
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to download the text container as a GIF
downloadButton.addEventListener("click", () => {
    const gif = new GIF({
        workers: 2,
        quality: 10,
    });

    const textContainer = document.querySelector(".text-container");
    const frames = 10; // Number of frames for the GIF

    for (let i = 0; i < frames; i++) {
        const clonedTextContainer = textContainer.cloneNode(true);
        clonedTextContainer.style.animation = `glitch-typing ${(i + 1) / frames}s steps(40, end), blink-caret 0.75s step-end infinite`;
        gif.addFrame(clonedTextContainer, { delay: 100 });
    }

    gif.on("finished", (blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "text-animation.gif";
        link.click();
    });

    gif.render();
});


    // Function to copy the generated HTML code
    copyButton.addEventListener("click", () => {
        const code = `
            <span class="revealing-text">${textInput.value}</span>
            <style>
                .revealing-text {
                    border-right: 0.15em solid #fff;
                    padding-right: 5px;
                    animation: glitch-typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
                }
                @keyframes glitch-typing {
                    from { width: 0; }
                    to { width: 100%; }
                }
                @keyframes blink-caret {
                    from, to { border-color: transparent; }
                    50% { border-color: white; }
                }
            </style>
        `;
        navigator.clipboard.writeText(code).then(() => {
            alert("Code copied to clipboard!");
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const heart = document.getElementById("heart");

    // Change the text on hover
    heart.addEventListener("mouseenter", () => {
        heart.textContent = "ChatGPT ;)";
    });

    // Revert the text when the cursor leaves
    heart.addEventListener("mouseleave", () => {
        heart.textContent = "❤️";
    });
});
