var clicks = 0;
let [milli,sec,min] = [0,0,0];
var ti=null;
var d={};
window.addEventListener("load",function(){
    var l1 = Math.random() * 80;
    var l2 = Math.random() * 60 + 10;
    document.getElementById("a").style.marginLeft = l1+"vw";
    document.getElementById("a").style.marginTop = l2+"vh";
    pe = prompt("Please Enter Your Name (if not then score will not be saved):");
    if(ti!=null){
        clearInterval(ti);
    }
    ti=setInterval(timer,10);
})
function change(){
    clicks+=1;
    var value1 = Math.random() * 80;
    var value2 = Math.random() * 60 + 10;
    document.getElementById("a").style.marginLeft = value1+"vw";
    document.getElementById("a").style.marginTop = value2+"vh";
    document.getElementById("c").innerHTML = "Remaining: " + (20-clicks);
    if(clicks==20){
        document.getElementById("a").style.display = "none";
        clearInterval(ti);
        document.getElementById("a").style.pointerEvents = "none";
        document.getElementById("win").style.display = "initial";
        if(pe!=null&&pe!=""){
            localStorage.setItem(pe,Math.floor((sec)));}
          for (var i = 0; i < localStorage.length; i++){
            d[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
          }
          var arr = Object.keys(d).map(function(key) {
            return [key, d[key]];
          });
          arr.sort(function(first, second) {
            return second[1] - first[1];
          });
          for(var j in arr.slice(0,5)){
            var te = parseInt(j) + 1;
            var n = "p"+(te).toString();
            var s = "s"+(te).toString();
            var sv = document.getElementById(s);
            var nm = document.getElementById(n);
            nm.innerHTML = arr[j][0];
            sv.innerHTML = arr[j][1];
          }
        document.getElementById("score").innerHTML = Math.floor((sec))
    }
}
function timer(){
    milli+=10;
    if(milli==1000){
        milli=0;
        sec++;
        if(sec==60){
            sec=0;
            min++;}
    }

}
function display(){
    document.getElementById("scoreboard").style.display="initial";
}

function stopdisplay(){
    i = document.getElementById("scoreboard");
    i.style.display = "none";
  }