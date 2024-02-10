//adding event listener
document.getElementById("searchBar").addEventListener("keydown",(event)=>{
    if (event.key=="Enter"){
        fetchMovie();
    }
})
document.getElementById("searchBtn").addEventListener("click",fetchMovie)
//function declaration
async function fetchMovie(){
    //accesing input elements value
    let movieName=document.getElementById("searchBar").value;
    movieName=movieName.replaceAll(" ","-");
    console.log(movieName);
    document.querySelector(".display").innerHTML="";
    let loaderDiv=document.createElement("div");
    loaderDiv.classList.add("lds-dual-ring");
    document.querySelector(".display").appendChild(loaderDiv);
    //fetch data
    
    const data=await phpFetch(movieName);
    console.log(data);
    //selecting each result
    if(data!="error"){
        document.querySelector(".display").removeChild(loaderDiv);
                let card=document.createElement("div");
                let title=document.createElement("div");
                let year=document.createElement("div");
                let poster=document.createElement("img");
                //adding class
                card.classList.add("card");
                title.classList.add("title");
                year.classList.add("year")
                poster.classList.add("poster");
                //adding data to the elements
                title.textContent=data["title"];
                year.textContent=data["year"];
                poster.src=`${data["poster"]}`;
                //appending text to elements
                card.appendChild(title);
                card.appendChild(year);
                card.appendChild(poster);
                document.querySelector(".display").appendChild(card);
    }
    else{
        const invalidDisplay=document.createElement("h1");
        invalidDisplay.classList.add("invalidText");
        invalidDisplay.innerHTML="Invalid Movie Name!<br> Please try again.";
        document.querySelector(".display").removeChild(loaderDiv);
        document.querySelector(".display").appendChild(invalidDisplay)
    }
}
async function phpFetch(title){
    const response=await fetch(`select.php?title=${title}`);
    const data=await response.json();
    console.log(data);
    if( data.length==0){
        const success=await phpInsert(title);
        if(!success["success"]){
            return "error";
        }
        return await phpFetch(title);
    }
    return data[0];
}
async function  phpInsert(title){
    const response=await fetch(`insert.php?title=${title}`);
    const data=await response.json();
    console.log(data);

    return data;
}