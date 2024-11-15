
function setTheme(theme) {
    document.documentElement.style.setProperty('--primary-color', theme);
    localStorage.setItem('cc-theme', theme);
}

setTheme(localStorage.getItem('cc-theme') || '#1A4B84');

const url = "https://api.openweathermap.org/data/2.5/";
const key = "60bbd59ec7556e88c0f6b5a2080aebaa";

// -------------------- DOM Elements ---------------
const searchInput = document.getElementById("search");

const outs = document.getElementById("outs");

const names = document.getElementById("name");
const dates = document.getElementById("date");
const temps = document.getElementById("temp");
const conditions = document.getElementById("condition");
// const wcode = document.getElementById("wcode");

const displayOne = document.getElementById("block1");
const displayTwo = document.getElementById("block2");

document.getElementById("rain").style.display="none";
document.getElementById("sky").style.display="none";
document.getElementById("cloud").style.display="none";
document.getElementById("thunder").style.display="none";
document.getElementById("snow").style.display="none";
document.getElementById("fog").style.display="none";

function showSVG(d){
    document.getElementById("rain").style.display="none";
    document.getElementById("sky").style.display="none";
    document.getElementById("cloud").style.display="none";
    document.getElementById("thunder").style.display="none";
    document.getElementById("snow").style.display="none";
    document.getElementById("fog").style.display="none";


    if(d === 800){
        document.getElementById("sky").style.display="block";
    }else if(d > 800 && d < 805){
        document.getElementById("cloud").style.display="block";
    }else if(d < 505 && d > 499){
        document.getElementById("rain").style.display="block";
    }else if(d < 233 && d > 199){
        document.getElementById("thunder").style.display="block";
    }else if(d > 599 && d < 623){
        document.getElementById("snow").style.display="block";
    }else{
        document.getElementById("fog").style.display="block";
    }

    console.log(d);
    
}




// https://api.openweathermap.org/data/2.5/weather?q=kakinada&units=metric&APPID=60bbd59ec7556e88c0f6b5a2080aebaa

// ---------------------- API Config WAY ONE -------------
    // function getData(){
    //     fetch(`${url}weather?q=${searchInput.value}&units=metric&APPID=${key}`)
    //     .then(resp => resp.json())
    //     .then(data => {
    //     if(data.message === "city not found"){
    //         displayOne.style.display="block";
    //         displayTwo.style.display="none";
    //         outs.innerText = "City Not Found";
    //     }else if(searchInput.value === ""){
    //         displayOne.style.display="none";
    //         displayTwo.style.display="none";
    //     }else{
    //         displayOne.style.display="none";
    //         displayTwo.style.display="block";
    //         names.innerText = `${data.name},${data.sys.country}`;
    //         dates.innerHTML = day[d.getDay()] + " " + d.getDate() + " " + year[d.getMonth()] + " " + d.getFullYear();
    //         temps.innerText = `${data.main.temp.toFixed(0)}` + "  ˚C";
    //         conditions.innerText = `${data.weather[0].main  }`;
            
    //     }

    //     });
    // }


    const day = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let d = new Date();

// ---------------------- API Config WAY TWO -------------
async function getInfo() {
    try{

    
        const data = await fetch(`${url}weather?q=${searchInput.value}&units=metric&APPID=${key}`)
        const info = await data.json();

        if(info.message === "city not found"){
            displayOne.style.display="block";
            displayTwo.style.display="none";
            outs.innerText = "City Not Found";
        }else if(searchInput.value === ""){
            displayOne.style.display="none";
            displayTwo.style.display="none";
        }else{
            displayOne.style.display="none";
            displayTwo.style.display="block";
            names.innerText = `${info.name},${info.sys.country}`;
            dates.innerHTML = day[d.getDay()] + " " + d.getDate() + " " + year[d.getMonth()] + " " + d.getFullYear();
            temps.innerText = `${info.main.temp.toFixed(0)}` + "  ˚C";
            conditions.innerText = `${info.weather[0].main  }` ;
            showSVG(info.weather[0].id);
            
        }
    }catch(error){
        console.log("there is error");
    }
}

// ---------------- Event Listeners ------------

searchInput.addEventListener('input', getInfo); // getinfo or getData both are same functions with different implementation
