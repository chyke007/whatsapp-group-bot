chrome.storage.sync.clear();
let button = document.getElementById("status");
let validation = document.getElementById("validation");
sleep = async (ms)=>{ return new Promise(resolve => setTimeout(resolve, ms)); }
sending = async ()=>{
    button.innerHTML="sending."; await sleep(500); 
    button.innerHTML="sending.."; await sleep(500);
    button.innerHTML="sending..."; await sleep(500);
    button.innerHTML="Mischief Managed!"; await sleep(1500);
    button.innerHTML="send";
}
button.addEventListener("click", async ()=> {
    let message = document.getElementById("message").value;
    let count = document.getElementById("count").value;
    if(!message || !count){
        validation.innerHTML="Some fields are Empty!";
        validation.className = "show"; await sleep(2000);
        validation.className = validation.className.replace("show", "");
    }
    else if(count>200){
        validation.innerHTML="Count Limit 200";
        validation.className = "show"; await sleep(3000);
        validation.className = validation.className.replace("show", "");
        count=2;
        sending();
    }
    else if(count<1){
        validation.innerHTML="Count Limit set to 1";
        validation.className = "show"; await sleep(3000);
        validation.className = validation.className.replace("show", "");
        count=1;
        sending();
    }
    chrome.storage.sync.set({"message": message});
    chrome.storage.sync.set({"count": count});  
    chrome.runtime.sendMessage({"isActivated": true});
});