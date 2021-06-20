//Functions
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

checkInput = (input, words) => {
    return words.some(word => input.toLowerCase().includes(word.toLowerCase()));
   }

var killId = setTimeout(function() {
    for (var i = killId; i > 0; i--) clearInterval(i)
  }, 3000);

inject = async() => { 
   
    let resolveKill = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"kill": false}, function(options){ resolve(options.kill); })
    });
    let kill = await resolveKill; 


    var killId = setTimeout(function() {
        for (var i = killId; i > 0; i--) clearInterval(i)
      }, 3000);

    if(kill){
        chrome.storage.sync.set({"collection": []});
       return
    }

    //Clear all running intervals

    let resolveChat = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"chatFinal": true}, function(options){ resolve(options.chatFinal); })
    });
    let chatFinal = await resolveChat; 
    
    if(!(chatFinal && !isNaN(parseInt(chatFinal)))) return
    eventFire(document.querySelectorAll('._3Dr46')[chatFinal],'mousedown')

    await sleep(2000);
    let messageBox = document.querySelectorAll("[contenteditable='true']")[1]; 
    let resolveValues = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"values": true}, function(options){ resolve(options.values); })
    });
    let resolveResponse = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"response": true}, function(options){ resolve(options.response); })
    });
    let values = await resolveValues; let response = await resolveResponse;
    
    //Update db of values and responses
    await chrome.storage.sync.get('collection', (data) => {
        let newValueInCollection = {
            values: values,
            response: response
        }

        data.collection.push(newValueInCollection)
        chrome.storage.sync.set({"collection": data.collection});
        return true
    })
    //these stage are inside interval

    let count = null;
    let len = null;
    let iniLen = null;
    let incoming  = null;
    let monitorChats = async function(){
        

        return function(){
        len = document.querySelectorAll(".selectable-text.copyable-text span").length;
        if(!count){
            iniLen = len;
        }
        count = len === 0 ? 0  : len-1
        if(len!=iniLen){
            incoming = document.querySelectorAll(".selectable-text.copyable-text span")[count].textContent;
            
            iniLen = len

            //loop through all responses and values and check

            chrome.storage.sync.get('collection', (data) => {
                data.collection.forEach((e) => {
              
                    if(!checkInput(incoming,e.values.split(','))){
                        return
                    }else{
                        let responses = e.response.split(',');
            
                        for (i = 0; i < responses.length; i++) { 
                            let stroke = document.createEvent("UIEvents"); 
                            messageBox.innerHTML = responses[i]; 
                            stroke.initUIEvent("input", true, true, window, 1); 
                            messageBox.dispatchEvent(stroke); 
                            console.log("sending..")
                            if(responses[0].trim() && values.trim()){ eventFire(document.querySelector('span[data-icon="send"]'), 'click'); }
                        }
                    }

                })
            })
            
        }  
        }()
            
        
    }
    startTimer2 = async()=>{ setInterval(monitorChats.bind(),200); } 
    startTimer2()
}
startTimer();
chat()