const $editorEl = document.getElementById('editor')
const $saveBtn = document.getElementById('saveBtn')

$saveBtn.addEventListener('click', () => {
  const allowList = $editorEl.value.split('\n')
  chrome.storage.sync.set({ allowList })
})

chrome.storage.sync.get(['allowList'], ({ allowList }) => {
  $editorEl.innerHTML = allowList.join('\n')
})
