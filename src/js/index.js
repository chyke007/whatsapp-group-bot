chrome.storage.sync.clear();
let button = document.getElementById("status");
let killButton = document.getElementById("kill");
let validation = document.getElementById("validation");
let select = document.getElementById("group_name");
sleep = async (ms)=>{ return new Promise(resolve => setTimeout(resolve, ms)); }

chrome.storage.sync.set({"chat": true});

chrome.runtime.sendMessage({"isActivated": true});

start = async() => {
    
    await sleep(2000)
    select.disabled  = false
    select.innerHTML = ''

    chrome.storage.sync.get('chatt', (data) => {
        data.chatt.forEach((e) => {
            let opt = document.createElement('option');
            opt.value = e.value;
            opt.innerHTML = e.innerText;
            select.appendChild(opt);
        })
      });
}
start()


clear = async(x,y) => {
    document.getElementById("values").value = "";
    document.getElementById("response").value = "";
}

activateF = async ()=>{
    button.innerHTML="activating."; await sleep(500); 
    button.innerHTML="activating.."; await sleep(500);
    button.innerHTML="activating..."; await sleep(500);
    button.innerHTML="Activated!";
    button.innerHTML="Activate";
}

killF = async ()=>{
    killButton.innerHTML="killing."; await sleep(500); 
    killButton.innerHTML="killing.."; await sleep(500);
    killButton.innerHTML="killing..."; await sleep(500);
    killButton.innerHTML="Killed!"; await sleep(1500);
    killButton.innerHTML="Kill All";
}

button.addEventListener("click", async ()=> {
    let values = document.getElementById("values").value;
    let response = document.getElementById("response").value;
    let chatFinal = select.value;
    let activate = true;
    
    if(!values){
        validation.innerHTML="Please enter value(s) to watch for!";
        validation.className = "show"; await sleep(2000);
        validation.className = validation.className.replace("show", "");
        return
    }

    if(!response){
        validation.innerHTML="Response cannot be empty!";
        validation.className = "show"; await sleep(2000);
        validation.className = validation.className.replace("show", "");
        return
    }

    else if(activate){
        activateF();
        setTimeout(clear(),1000);
        

        chrome.storage.sync.set({"response": response});
        chrome.storage.sync.set({"values": values});  
        chrome.storage.sync.set({"chatFinal": chatFinal}); 
        chrome.storage.sync.set({"kill": false});
        chrome.runtime.sendMessage({"isActivated": true});

    }
});

killButton.addEventListener("click", async ()=> {
    killF();
    chrome.storage.sync.set({"kill": 1});
    chrome.runtime.sendMessage({"isActivated": true});
})
