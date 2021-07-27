const $editorEl = document.getElementById('editor')
const $saveBtn = document.getElementById('saveBtn')

$saveBtn.addEventListener('click', () => {
  const alloweds = $editorEl.value.split('\n')
  chrome.storage.sync.set({ alloweds })
})

chrome.storage.sync.get(['alloweds'], ({ alloweds }) => {
  $editorEl.innerHTML = alloweds.join('\n')
})
