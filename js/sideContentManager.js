import { isDesktop } from "./utils.js"
import { enableCopyButton } from "./buttonsManager.js"

const sideContentNoMessageMobile = `
<div class="side-content side-content-no-message">
  <div class="form-item">
    <label for="texto" class="text-label">Resultado</label>
    <div class="input input-shadow text-general">
      <div class="text-result">
        <p class="text-result-title">Ningún mensaje fue encontrado</p>
        <p class="text-result-description">
          Ingrese el texto que desea encryptar o desencryptar.
        </p>
      </div>
    </div>
  </div>
</div>
`

const sideContentNoMessageDesktop = `
<div class="side-content side-content-no-message">
  <div class="form-item">
    <label for="texto" class="text-label">Resultado</label>
    <div class="input input-shadow text-general">
      <img src="./assets/doll.svg" alt="muñeco" class="doll" />
      <div class="text-result">
        <p class="text-result-title">Ningún mensaje fue encontrado</p>
        <p class="text-result-description">
          Ingrese el texto que desea encryptar o desencryptar.
        </p>
      </div>
    </div>
  </div>
</div>`

const sideContentMessage = `
<div class="side-content side-content-message">
  <div class="form-item">
    <label for="texto" class="text-label">Resultado</label>
    <textarea
      name="text"
      id="texto"
      class="input input-shadow text-general"
      disabled
    ></textarea>
  </div>

  <div class="buttons">
    <button id="copy" class="button button-dark">Copiar</button>
  </div>
</div>
`

export function sideContentManager() {
  let text = ""
  document.getElementById("text").addEventListener("input", e => {
    const currentText = e.target.value
    if (shouldSwitchSideContent(text, currentText)) {
      changeSideContent(currentText)
    }
    text = currentText
  })

  window.addEventListener('resize', e => sideContentNoMessageManager(text));

  window.addEventListener("load", e => sideContentNoMessageManager(text))
}

function shouldSwitchSideContent(beforeText, currentText) {
  return !shouldKeepShowingSideContentMessage(beforeText, currentText)
    && !shouldKeepShowingSideContentNoMessage(beforeText, currentText)
}

function shouldKeepShowingSideContentMessage(beforeText, currentText) {
  return beforeText.length > 0 && currentText.length > 0
}

function shouldKeepShowingSideContentNoMessage(beforeText, currentText) {
  return beforeText.length === 0 && currentText.length === 0
}

function changeSideContent(currentText) {
  removeSideContent()
  if (currentText.length) {
    addSideContent(sideContentMessage)
  } else {
    sideContentNoMessageManager(currentText)
  }
}

function removeSideContent() {
  const sideContent = document.getElementsByClassName("side-content")[0]
  if (sideContent) {
    sideContent.remove()
  }
}

function addSideContent(sideContent) {
  document.getElementsByTagName("main")[0].insertAdjacentHTML("beforeend", sideContent)

  if (sideContent.includes("side-content-message")) {
    enableCopyButton()
  }
}

function sideContentNoMessageManager(text) {
  if (!text.length) {
    removeSideContent()
    const sideContent = isDesktop() ? sideContentNoMessageDesktop : sideContentNoMessageMobile
    addSideContent(sideContent)
  }
}
