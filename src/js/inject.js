startTimer = async()=>{ setTimeout(inject, 200); } 
sleep = async (ms)=>{ return new Promise(resolve => setTimeout(resolve, ms)); }
eventFire = async(MyElement, ElementType)=>{ 
    let MyEvent = document.createEvent("MouseEvents"); 
    MyEvent.initMouseEvent(ElementType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
    MyElement.dispatchEvent(MyEvent); 
}
chat = async() => {
    let resolveChat = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"chat": true}, function(options){ resolve(options.chat); })
    });
     //enter chat
   
     let chat = await resolveChat;
     if(chat){
        let newList = []
        let stable = Array.from(document.querySelectorAll('._3Dr46'))
        stable.forEach((element,i) => {
            let obj={}
            obj.value =  i 
            obj.innerText = element.innerText
           newList.push(obj)
        });
        
        chrome.storage.sync.set({"chatt": newList});
     }
}
inject = async() => { 
   
    let resolveChat = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"chatFinal": true}, function(options){ resolve(options.chatFinal); })
    });
    let chatFinal = await resolveChat; 
    
    if(!(chatFinal && !isNaN(parseInt(chatFinal)))) return
    if(chatFinal && !isNaN(parseInt(chatFinal))) eventFire(document.querySelectorAll('._3Dr46')[chatFinal],'mousedown')

    await sleep(2000);
    let messageBox = document.querySelectorAll("[contenteditable='true']")[1]; 
    let resolveValues = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"values": true}, function(options){ resolve(options.values); })
    });
    let resolveResponse = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"response": true}, function(options){ resolve(options.response); })
    });
    let values = await resolveValues; let response = await resolveResponse;
    let responses = response.split(',');

    for (i = 0; i < responses.length; i++) { 
        event = document.createEvent("UIEvents"); 
        messageBox.innerHTML = responses[i]; 
        event.initUIEvent("input", true, true, window, 1); 
        messageBox.dispatchEvent(event); 
        if(responses[0].trim() && values){ eventFire(document.querySelector('span[data-icon="send"]'), 'click'); }
    } 
}
startTimer();
chat()