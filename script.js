window.addEventListener("load",function(){
var form = document.getElementById("form");
var er = document.getElementById("error");
form.addEventListener('submit',function(e){
    e.preventDefault();
    var s = document.getElementById("search").value;
    fetch('https://api.github.com/users/'+s)
    .then(response => {
        if(!response.ok){
            er.innerHTML = "Not Found!";
            document.getElementById("details").textContent = "";
            document.getElementById("image").src = "";
            document.getElementById("name").textContent = ""
            document.getElementById('followers').textContent = ""
            document.getElementById("following").textContent = ""
        }
        else{
            return response.json()
        }
    })
    .then(data=>{
        var name;
        if(!data.name){
            name="null";
        }
        document.getElementById("details").style.display="initial";
        document.getElementById("image").src = data.avatar_url;
        document.getElementById("name").innerHTML = data.name || name;
        document.getElementById('followers').innerHTML = data.followers;
        document.getElementById("following").innerHTML = data.following;
    })
    fetch('https://api.github.com/users/'+s+'/repos')
    .then(response => response.json())
    .then(data=>{
        if(data[0]){
            document.getElementById("r1").innerHTML = data[0].name;}
        else{
            document.getElementById("r1").textContent = "";
        }
        if(data[1]){
            document.getElementById("r2").innerHTML = data[1].name;}
        else{
            document.getElementById("r2").textContent = "";
        }
        if(data[2]){
            document.getElementById("r3").innerHTML = data[2].name;}
        else{
            document.getElementById("r3").textContent = "";
        }
        if(data[3]){
            document.getElementById("r4").innerHTML = data[3].name;}
        else{
            document.getElementById("r4").textContent = "";
        }
        if(data[4]){
            document.getElementById("r5").innerHTML = data[4].name;}
        else{
            document.getElementById("r5").textContent = "";
        }
    })
})
},false)
