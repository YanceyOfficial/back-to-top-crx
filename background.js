chrome.runtime.onInstalled.addListener(() => {
  let res = null
  chrome.storage.sync.get(['alloweds'], ({ alloweds }) => {
    res = alloweds
  })

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse(res)
  })
})
