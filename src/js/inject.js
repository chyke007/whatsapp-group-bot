//Functions
startTimer = async()=>{ setTimeout(inject, 200); } 

sleep = async (ms)=>{ return new Promise(resolve => setTimeout(resolve, ms)); }

eventFire = async(MyElement, ElementType)=>{ 
    let MyEvent = new MouseEvent(ElementType, {
        bubbles: true
    }); 
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
        let stable = Array.from(document.querySelectorAll('._21S-L'))
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

    let resolveChat = new Promise(function(resolve){
        chrome.storage.sync.get({"chatFinal": true}, function(options){ resolve(options.chatFinal); })
    });
    let chatFinal = await resolveChat; 
    
    if(!(chatFinal && !isNaN(parseInt(chatFinal)))) return
    eventFire(document.querySelectorAll('._21S-L')[chatFinal],'mousedown')

    await sleep(2000);
    let resolveValues = new Promise(function(resolve){
        chrome.storage.sync.get({"values": true}, function(options){ resolve(options.values); })
    });
    let resolveResponse = new Promise(function(resolve){
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

            chrome.storage.sync.get('collection', async (data) => {
                for(item of data.collection){
                
                    if(!checkInput(incoming,item.values.split(','))){
                        return
                    }else{
                        let responses = item.response.split(',');
                        for (i = 0; i < responses.length; i++) { 
                            await document.execCommand('insertText', false,responses[i]);
                            await sleep(1000) ;
                            if(responses[0].trim() && values.trim()){ 
                                document.querySelector('[data-testid="compose-btn-send"]').click()
                             }
                        }
                    }

                }
            })
            
        }  
        }()
            
        
    }
    startTimer2 = async()=>{ setInterval(monitorChats.bind(),200); } 
    startTimer2()
}
startTimer();
chat()
