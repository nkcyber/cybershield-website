/**
 * NKCyber
 * 2025-03-08
 */

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""); // convert bytes to hex string
    return hashHex;
}

async function win() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}

/**
 * Checks if expected hash is right. Wins if it is, errors if it doesn't.
 * @param {string} expectedHash 
 */
async function expect(expectedHash) {
    // 'this' now refers to the specific form element.
    const flagInput = this.querySelector('input[name="flag"]').value.trim();
    const computedHash = await digestMessage(flagInput);

    const errorContainer = this.querySelector('.error-message');

    function sayMessage(message, color) {
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.style.color = color;
        } else {
            alert(message);
        }
    }

    if (computedHash === expectedHash) {
        sayMessage("Correct!", "green");
        win();
    } else {
        sayMessage("Error: The flag you entered is incorrect. Please try again!", "red");
    }
}
