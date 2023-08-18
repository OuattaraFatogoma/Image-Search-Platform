const accessKey= "cwyN66tLLqFbO9sWT-f_WT8630JfJMoNGXZr2lGfQpo"

const formEl= document.querySelector("form")
const searchEl= document.querySelector("#searchInput")
const searchResults = document.querySelector(".searchResults")
const showMore= document.querySelector(".more")

let inputData = ""
let page = 1

async function Search_Image(){
    inputData = searchEl.value;
    let url= `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()
    const results = data.results

    if(page === 1){
        searchResults.innerHTML=""
    }

    results.map((result) => {

        const imageContainer= document.createElement("div");
        imageContainer.classList.add("searchResult");

        const imageDis= document.createElement("img");
        imageDis.src= result.urls.small;
        imageDis.alt= result.alt_description;

        const imageLink=document.createElement("a");
        imageLink.href= result.links.html;
        imageLink.target= "_blank";
        imageLink.textContent= result.alt_description;

        imageContainer.appendChild(imageDis);
        imageContainer.appendChild(imageLink);
        searchResults.appendChild(imageContainer);
    });

    page++

    if(page >1 ){
        showMore.style.display= "block";
    }
}

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    page=1;
    Search_Image();
});

showMore.addEventListener("click", ()=>{
    Search_Image();
});
