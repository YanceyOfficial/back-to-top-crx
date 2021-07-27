chrome.runtime.onInstalled.addListener(() => {
  let res = null

  chrome.storage.sync.get(['allowList'], ({ allowList }) => {
    res = allowList
  })

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse(res)
  })
})
