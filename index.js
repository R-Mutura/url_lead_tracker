
const saveEl=document.getElementById('save_el');
const inputEl=document.getElementById("input_el");
let myLeads=[];
let userInputData = document.getElementById("input_el");
let ulEl = document.getElementById("ul_el");
const deleteEl=document.getElementById("delete_el");
const myleadstring=JSON.parse(localStorage.getItem("myLeads"));
const saveTab=document.getElementById("save-tab-el");

if(myleadstring){
	myLeads=myleadstring;
	renderLeads(myLeads);
}
console.log(myleadstring);

function renderLeads(leads){
	let listItems= "";
	ulEl.innerHTML="";
	for (var i=0 ; i<leads.length; i++) {

	listItems += "<li> <a target='_blank' href ='" + myLeads[i] +"'>"  + myLeads[i] + "</a></li>" 
	}  

	ulEl.innerHTML +=listItems;

}
saveTab.addEventListener("click", function(){
	console.log("Saving current Tab ");
	//write the function to get the current tab url
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    myLeads.push(url);
	//save it to the local storage
	localStorage.setItem("myLeads", JSON.stringify(myLeads));

   renderLeads(myLeads);
});
	

});

/*get input from the input field in the HTML*/
saveEl.addEventListener("click", function(){
   
    
	console.log("hello");
	//GET THE CURRENT MYLEADS STRING AND STORE IT IN MYLEADS SO THAT WE CAN ADD TO IT THE NEW DATA
	
	if(userInputData.value){
	myLeads.push(userInputData.value);
}
    //SAVE THE NEW DATA TO MY LEADS STRING THUS ADDING ON TO THE ORIGINAL DATA
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
	userInputData.value="";
	renderLeads(myLeads);
  
});


/*to store data such that it persist several refresh we will use local storage method*/

//delete function
deleteEl.addEventListener("dblclick", function(){
	console.log("DELETING");
	localStorage.clear();
	myLeads=[]
	renderLeads(myLeads);

})

/*
//log out the array content
for (var i=0 ; i<myLeads.length; i++) {

listItems += "<li>" + myLeads[i];"</li>"
//alternative use of innerHTML we use append
const li=document.createElement("li") 
li.textContent=myLeads[i];
ulEl.append(li);


}*/
//ulEl.innerHTML +=listItems;