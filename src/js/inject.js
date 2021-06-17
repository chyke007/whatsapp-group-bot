startTimer = async()=>{ setTimeout(inject, 2000); } 
eventFire = async(MyElement, ElementType)=>{ 
    // eventFire(document.querySelectorAll('._3Dr46')[3],"click")
    let MyEvent = document.createEvent("MouseEvents"); 
    MyEvent.initMouseEvent(ElementType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
    MyElement.dispatchEvent(MyEvent); 
}
inject = async()=>{ 
    let messageBox = document.querySelectorAll("[contenteditable='true']")[1]; 
    let resolveCount = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"count": true}, function(options){ resolve(options.count); })
    });
    let resolveMessage = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"message": true}, function(options){ resolve(options.message); })
    });
    let counter = await resolveCount; let message = await resolveMessage;
    for (i = 0; i < counter; i++) { 
        event = document.createEvent("UIEvents"); 
        messageBox.innerHTML = message; 
        event.initUIEvent("input", true, true, window, 1); 
        messageBox.dispatchEvent(event); 
        if(message && counter){ eventFire(document.querySelector('span[data-icon="send"]'), 'click'); }
    } 
}
startTimer();