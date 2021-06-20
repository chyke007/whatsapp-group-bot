chrome.storage.sync.clear();
let button = document.getElementById("status");
let killButton = document.getElementById("kill");
let validation = document.getElementById("validation");
let show = document.getElementById("show");
let allActive = document.getElementById("all_active");
let allActiveTbody = allActive.getElementsByTagName('tbody')[0]
let select = document.getElementById("group_name");
sleep = async (ms)=>{ return new Promise(resolve => setTimeout(resolve, ms)); }

show.addEventListener("click", async() => {
    if(allActive.className == "show") {
        allActive.className = allActive.className.replace("show", "");
        show.innerText = "Show Active"
        return;
    }
    allActive.className = "show"
    show.innerText = "Hide Active"
})


chrome.storage.sync.set({"chat": true});
chrome.storage.sync.set({"collection": []});

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

 function updateActiveView()  {
    chrome.storage.sync.get('collection', (data) => {
        allActiveTbody.innerHTML = ''
        let appendMe = ''
        data.collection.forEach((e,i) => {
            appendMe=`
            <td>${i+1}</td>
            <td>${e.values}</td>
            <td>${e.response}</td>
            `;
            allActiveTbody.insertRow().innerHTML = appendMe
        })
    });
}

setInterval(updateActiveView,2000)

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
    select.disabled  = false;
    select.style.cursor = "pointer"
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

        //
        select.disabled  = true
        select.title  = "You need to kill all trackings to change chat"
        select.style.cursor = "not-allowed"

    }
});

killButton.addEventListener("click", async ()=> {
    killF();
    chrome.storage.sync.set({"kill": 1});
    chrome.runtime.sendMessage({"isActivated": true});
})

