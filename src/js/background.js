chrome.runtime.onMessage.addListener(async(message, sender)=> {
	if(!message.isActivated) return;
	else{
		chrome.scripting.executeScript({
		target: {tabId: (await getCurrentTab()).id, allFrames: true},
    	files: ['src/js/inject.js'],
	}); }
});

async function getCurrentTab() {
	let queryOptions = { active: true, lastFocusedWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
  }