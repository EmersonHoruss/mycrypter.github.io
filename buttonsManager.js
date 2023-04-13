import { encryptedText, decryptedText } from "./myCrypter.js"

export function buttonsManager() {
    enableEncryptButton()
    enableDecryptButton()
    enableCopyButton()
}

function enableEncryptButton() {
    document.getElementById("encrypt").addEventListener("click", e => {
        const input = getInput()
        const output = getOutput()

        if (input && output) {
            output.value = encryptedText(input.value)
        }
    })
}

function getInput() {
    return document.querySelector(".side-text textarea")
}

function getOutput() {
    return document.querySelector(".side-content-message textarea")
}

function enableDecryptButton() {
    document.getElementById("decrypt").addEventListener("click", e => {
        const input = getInput()
        const output = getOutput()

        if (input && output) {
            output.value = decryptedText(input.value)
        }
    })
}

export function enableCopyButton() {
    const copyButton = document.getElementById("copy")
    if (copyButton) {
        copyButton.addEventListener("click", e => {
            const output = getOutput()
            var clipboardItem = new ClipboardItem({ "text/plain": new Blob([output.value], { type: "text/plain" }) });
            navigator.clipboard.write([clipboardItem])
        })
    }
}