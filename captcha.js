window.onload=function(){
    loadFunc()
}
const querries=["select all images contain apple","select all images contain cat","select all images contain dog"]
const img=["apple1.jpg","apple2.jpg","apple3.jpg","apple4.jpg","apple5.jpg","apple6.jpg","cat1.jpg","cat2.jpg","cat3.jpg","cat4.jpg","cat5.jpg","cat6.jpg","dog1.jpg","dog2.jpg","dog3.jpg","dog4.jpg","dog5.jpg","dog6.jpg"]
var qPointer=0
var score=[0,0,0]
let freq=0

function loadFunc(){
    let selected={}
    console.log("got the pointer",qPointer)
    let q=querries[qPointer]
    document.getElementById("qrry").innerHTML=q;
    let shuffeldImg=img.sort(()=>0.5-Math.random())
    freq=0
    for (let i=1;i<17;i++){
        document.getElementById(String(i)).src="./imgs/"+shuffeldImg[i];
        if (((qPointer==0)&&(shuffeldImg[i][0]=="a"))||((qPointer==1)&&(shuffeldImg[i][0]=="c"))||((qPointer==2)&&(shuffeldImg[i][0]=="d"))) {
            console.log(shuffeldImg[i])
            freq++;}
    }console.log("freqq",freq)

//***************************************************************************************************

document.querySelectorAll('.imgg').forEach(element => 
    element.addEventListener("click",event=> {
    event.stopImmediatePropagation();
    var tickElement=event.target.parentElement.getElementsByClassName("tick")
    tickElement[0].style.display="block"
    const imgId=event.target.id
    const imgSrc=event.target.src
    let regApple=/apple/i
    let regDog=/dog/i
    if (selected.hasOwnProperty(imgId)){
        delete selected[imgId]
        tickElement[0].style.display="none"
    }
    else{
    if (regApple.test(imgSrc)){
        selected[imgId]="apple"
    }
    else if (regDog.test(imgSrc)){
        selected[imgId]="dog"
    }
    else{
        selected[imgId]="cat"

    }
    
    console.log("updated >>>",selected)
    
    
    }
}
    
));

document.getElementById("button").addEventListener("click",event=>{
    event.stopImmediatePropagation();
    console.log(selected)
    console.log("check at qp1",(qPointer==1),(!(Object.values(selected).includes("dog")||Object.values(selected).includes("apple"))))
    console.log("check at qp2",(qPointer==2),(!(Object.values(selected).includes("cat")||Object.values(selected).includes("apple"))))
    console.log(Object.keys(selected).length,freq)
    if (Object.keys(selected).length==freq)
    {
    if ((qPointer==0)&&(!(Object.values(selected).includes("dog")||Object.values(selected).includes("cat")))){
        score[qPointer]=1
        console.log("at pointer 0")

    }
    else if((qPointer==1)&&(!(Object.values(selected).includes("dog")||Object.values(selected).includes("apple")))) {
        score[qPointer]=1
        console.log("at pointer 1")

    }
    else if((qPointer==2)&&(!(Object.values(selected).includes("cat")||Object.values(selected).includes("apple")))){
        score[qPointer]=1
        console.log("at pointer 2")
    }
    }   
    qPointer++
    console.log(qPointer,score)
    let sc=0

    score.forEach(e=>sc+=e)
    console.log("score",sc)
    if (sc>1){
        document.getElementById("gallery").innerHTML="<img src='./imgs/party.png' style='height:20%;margin:auto;'>"
        document.getElementById("qrry").innerHTML="congratulations..."
        document.getElementById("button").style.display="none"
    }
    else if ((qPointer==3)||((sc==0)&&(qPointer==2))){
        console.log("pointer with 3")
        document.getElementById("gallery").innerHTML="<img src='./imgs/sad.png' style='height:20%;margin:auto;'>"
        document.getElementById("qrry").innerHTML="Failed to enter..."
        document.getElementById("button").style.display="none"
    }
    else{
      
        document.querySelectorAll('.tick').forEach(tickEle=>{
            tickEle.style.display="none"
        })
        console.log("calling the loadFunc with qPointer",qPointer)
        selected={}
        console.log("bottom",selected)
        loadFunc()

    }


})

}

