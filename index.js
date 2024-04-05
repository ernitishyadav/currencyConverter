const Base_url =   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for (Curcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = Curcode;
        newOption.value=Curcode;
        
        if(select.name ==="from" && Curcode==="USD"){
           newOption.selected ="select";
        }
        else if(select.name==="to" && Curcode === "INR"){
            newOption.selected ="select";
        }
        select.append(newOption)
    }
     select.addEventListener("change",(event)=>{
         updateFlag(event.target);
     });
}

const updateFlag = (element)=>{
    let curCode = element.value;
    let countryCode = countryList[curCode];
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img =  element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async(evt)=>{
     evt.preventDefault();
     let amount = document.querySelector(".amount input");
     let amtVal = amount.value;
     if(amtVal ==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
        
        
     }
     const URL = `${Base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[toCurr.value.toLowerCase()];
        
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    
})

