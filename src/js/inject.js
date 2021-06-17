startTimer = async()=>{ setTimeout(inject, 2000); } 
eventFire = async(MyElement, ElementType)=>{ 
    // eventFire(document.querySelectorAll('._3Dr46')[3],"mousedown")
    let MyEvent = document.createEvent("MouseEvents"); 
    MyEvent.initMouseEvent(ElementType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
    MyElement.dispatchEvent(MyEvent); 
}
inject = async()=>{ 
    //enter chat
    let resolveChat = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"chat": true}, function(options){ resolve(options.chat); })
    });
    let chat = await resolveChat;
    eventFire(document.querySelectorAll('._3Dr46')[chat],'mousedown')


    let messageBox = document.querySelectorAll("[contenteditable='true']")[1]; 
    let resolveValues = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"values": true}, function(options){ resolve(options.values); })
    });
    let resolveResponse = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"response": true}, function(options){ resolve(options.response); })
    });
    let values = await resolveValues; let response = await resolveResponse;
    for (i = 0; i < response.split(',').length; i++) { 
        event = document.createEvent("UIEvents"); 
        messageBox.innerHTML = resizeBy; 
        event.initUIEvent("input", true, true, window, 1); 
        messageBox.dispatchEvent(event); 
        if(response && values){ eventFire(document.querySelector('span[data-icon="send"]'), 'click'); }
    } 
}
startTimer();