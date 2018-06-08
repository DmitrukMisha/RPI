var update=false;

function START(){
document.getElementById('results').innerHTML="";
pagetoken="";
search();
}

function Connect() {
    gapi.client.setApiKey('AIzaSyD2Pos3mQVMmamMeWNo9SRztfN0hk-EG0w');
    gapi.client.load('youtube', 'v3');
}
var pagetoken;
function search() {
    var query = document.getElementById('value').value;
    var request; 
    request= gapi.client.youtube.search.list({
        maxResults:"20",
        pageToken:pagetoken,
        type:"video",
        part: 'snippet',
        q:query
    }); 
   
    request.execute(MakeJSON);
}
function MakeJSON(str) {
    var newStr = JSON.stringify(str, '', 2);
    MakeCode(newStr);
    update=true;
}

function MakeCode(string){
var code="";
var parsedstring= JSON.parse(string);
pagetoken=parsedstring.nextPageToken;

parsedstring.items.forEach(function(item, i, parsedstring) {
code+='<a class="item" " href="https://www.youtube.com/watch?v='+item.id.videoId+'" target="_blank">'+'<h1 align=center>Name: '+item.snippet.title+'</h1>'+'<img src="'+item.snippet.thumbnails.high.url+'">'+'<p id="chanel">Channel: '+item.snippet.channelTitle+'</p>'+'<p align=center>Description: '+item.snippet.description+'</p>'+'</a>';
});
document.getElementById('results').innerHTML+=code;
}
var scrol=false;
var x;

document.onmousedown=()=>
{ scrol=true; x=event.clientX;}

document.onmouseup=()=> 
{ scrol = false;  }

document.onmousemove=()=> 
{ if(scrol){
  window.scrollBy((x-event.clientX)/30,0);  
 }
}
    
document.onscroll = ()=> {
  let clientWidth=document.documentElement.clientWidth;
  let scrollWidth=document.documentElement.scrollWidth;
  let xx=window.pageXOffset;
   
  if(xx>(scrollWidth-clientWidth*1.5)&&update){
        update=false;
        search();

  }

}