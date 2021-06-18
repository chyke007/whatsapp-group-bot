chrome.storage.sync.clear();
let button = document.getElementById("status");
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


activateF = async ()=>{
    button.innerHTML="activating."; await sleep(500); 
    button.innerHTML="activating.."; await sleep(500);
    button.innerHTML="activating..."; await sleep(500);
    button.innerHTML="Activated!"; await sleep(1500);
    button.innerHTML="Deactivate";
}

clear = async(x,y) => {
    document.getElementById("values").value = "";
    document.getElementById("response").value = "";
}

deactivateF = async ()=>{
    button.innerHTML="deactivating."; await sleep(500); 
    button.innerHTML="deactivating.."; await sleep(500);
    button.innerHTML="deactivating..."; await sleep(500);
    button.innerHTML="Dectivated!"; await sleep(1500);
    button.innerHTML="Activate";
}

button.addEventListener("click", async ()=> {
    let values = document.getElementById("values").value;
    let response = document.getElementById("response").value;
    let chatFinal = select.value;
    let activate = true;
    if(!response){
        validation.innerHTML="Response cannot be empty!";
        validation.className = "show"; await sleep(2000);
        validation.className = validation.className.replace("show", "");
        return
    }
    if(!values){
        validation.innerHTML="Please enter value(s) to watch for!";
        validation.className = "show"; await sleep(2000);
        validation.className = validation.className.replace("show", "");
        return
    }

    else if(activate){
        validation.innerHTML="Active set to 1";
        validation.className = "show"; await sleep(3000);
        validation.className = validation.className.replace("show", "");
        activateF();
        clear()
    }
    else if(!activate){
        validation.innerHTML="Active set to 1";
        validation.className = "show"; await sleep(3000);
        validation.className = validation.className.replace("show", "");
        // deactivateF(); //stops timeinterval
    }

    chrome.storage.sync.set({"response": response});
    chrome.storage.sync.set({"values": values});  
    chrome.storage.sync.set({"chatFinal": chatFinal}); 
    chrome.runtime.sendMessage({"isActivated": true});
});