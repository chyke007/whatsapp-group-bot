chrome.runtime.onMessage.addListener((message, sender)=> {
	if(!message.isActivated) return;
	else{chrome.tabs.executeScript({
		file: 'src/js/inject.js'
	}); }
});