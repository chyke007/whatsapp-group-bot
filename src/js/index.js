chrome.storage.sync.clear();
let button = document.getElementById("status");
let validation = document.getElementById("validation");
let select = document.getElementById("group_name");
let all = document.querySelectorAll('._3Dr46');
all.forEach((e,i) => {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = e.innerText;
    select.appendChild(opt);
})
// document.querySelectorAll('._3Dr46')[3].innerText
sleep = async (ms)=>{ return new Promise(resolve => setTimeout(resolve, ms)); }

activate = async ()=>{
    button.innerHTML="activating."; await sleep(500); 
    button.innerHTML="activating.."; await sleep(500);
    button.innerHTML="activating..."; await sleep(500);
    button.innerHTML="Activated!"; await sleep(1500);
    button.innerHTML="Deactivate";
}

deactivate = async ()=>{
    button.innerHTML="deactivating."; await sleep(500); 
    button.innerHTML="deactivating.."; await sleep(500);
    button.innerHTML="deactivating..."; await sleep(500);
    button.innerHTML="Dectivated!"; await sleep(1500);
    button.innerHTML="Activate";
}

button.addEventListener("click", async ()=> {
    let values = document.getElementById("values").value;
    let response = document.getElementById("response").value;
    let chat = document.getElementById("chat").value;
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

    else if(active){
        validation.innerHTML="Count Limit set to 1";
        validation.className = "show"; await sleep(3000);
        validation.className = validation.className.replace("show", "");
        count=1;
        activate();
    }
    else if(!active){
        validation.innerHTML="Count Limit set to 1";
        validation.className = "show"; await sleep(3000);
        validation.className = validation.className.replace("show", "");
        count=1;
        deactivate();
    }
    chrome.storage.sync.set({"response": response});
    chrome.storage.sync.set({"values": values});  
    chrome.storage.sync.set({"chat": chat}); 
    chrome.runtime.sendMessage({"isActivated": true});
});