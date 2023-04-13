const keys = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
}

export function encryptedText(text) {
    let encryptedText = ""
    for (let i = 0; i < text.length; i++) {
        const character = text.charAt(i)
        encryptedText += encryptedCharacter(character)
    }
    return encryptedText
}

function encryptedCharacter(character) {
    for (const key in keys) {
        if (key === character) {
            return keys[key];
        }
    }
    return character
}

export function decryptedText(text) {
    let decryptedText = text;
    for (const key in keys) {
        const value = keys[key];
        decryptedText = decryptedText.replaceAll(value, key)
        console.log(value, key, decryptedText)
    }
    return decryptedText
}