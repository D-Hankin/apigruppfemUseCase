const body = document.getElementById("body");
const picDiv = document.getElementById("picDiv");
const overlayDiv = document.getElementById("overlayDiv");
const guessDiv = document.getElementById("guessDiv");
const headerDiv = document.getElementById("headerDiv");
const infoDiv = document.getElementById("infoDiv");
const getCityBtn = document.getElementById("getCityBtn");

let clickCounter = 0;

fetch("http://localhost:8080/api/city/9e50b8c3-7841-4d0e-bcf5-700e1cd02285/random-city")
.then(res => res.json())
.then(data => {

    createPage(data);
    
})

function createPage(data) {
    let image = document.createElement("img");
    image.src = data[0].imageUrl;
    image.style.border = "2px solid red";
    image.style.maxWidth = "90%";
    image.style.maxHeight = "90vh";
    picDiv.appendChild(image);
    
    let cityNameHeader = document.createElement("h1");
    cityNameHeader.innerText = data[0].cityName;
    infoDiv.appendChild(cityNameHeader);
    let infoTable = document.createElement("table");
    let infoRow = document.createElement("tr");
    let infoCellOne = document.createElement("td");
    let infoCellTwo = document.createElement("td");
    infoCellOne.innerText = "Country:";
    infoCellTwo.innerText = data[0].country;
    infoRow.append(infoCellOne, infoCellTwo);

    let infoRow2 = document.createElement("tr");
    let infoCellThree = document.createElement("td");
    let infoCellFour = document.createElement("td");
    infoCellThree.innerText = "Population:";
    infoCellFour.innerText = data[0].population;
    infoRow2.append(infoCellThree, infoCellFour);
    
    let infoRow3 = document.createElement("tr");
    let infoCellFive = document.createElement("td");
    let infoCellSix = document.createElement("td");
    infoCellFive.innerText = "Description:";
    infoCellSix.innerText = data[0].description;
    infoRow3.append(infoCellFive, infoCellSix);

    infoTable.append(infoRow, infoRow2, infoRow3);

    infoDiv.appendChild(infoTable);

    getCityBtn.addEventListener("click", () => getCityBtnEventListener())
}

function getCityBtnEventListener() {

    picDiv.innerHTML = "";
    infoDiv.innerHTML = "";
    guessDiv.innerHTML = "";
    overlayDiv.innerHTML = "";
    clickCounter = 0;

    fetch("http://localhost:8080/api/city/9e50b8c3-7841-4d0e-bcf5-700e1cd02285/random-city")
    .then(res => res.json())
    .then(data => {
        
        let image = document.createElement("img");
        image.src = data[0].imageUrl;
        image.style.border = "2px solid red";
        image.style.maxWidth = "90%";
        image.style.maxHeight = "90vh";
        picDiv.appendChild(image);
        let guessBtn = document.createElement("button");
        guessBtn.style.padding = "5px";
        guessBtn.innerText = "Guess";
        let guessInput = document.createElement("input");
        guessInput.style.padding = "5px";
        guessDiv.append(guessInput, guessBtn);
        guessDiv.style.margin = "1% 0 1% 0";
        guessDiv.style.zIndex = "4";
        guessBtn.addEventListener("click", () => {
        
            if (guessInput.value.toUpperCase() == data[0].cityName.toUpperCase()) {
                alert("You guessed correctly! It took you " + clickCounter + " squares.")
                revealCity(data)
            } else {
                alert("Try again!");
            }
        })
        const rows = 5;
        const columns = 5;
        
        image.onload = function() {
            getImageDimensions(rows, columns, image);
        };
    })
}

function getImageDimensions(rows, columns, image) {

    let picWidth = image.width;
    let picHeight = image.height;

    let squareWidth = picWidth / columns;
    let squareHeight = picHeight / rows;

    createGrid(rows, columns, squareWidth, squareHeight);
    window.scrollTo(0, 0);

    picDiv.style.position = "relative";
    picDiv.style.maxWidth = "95vw";
    picDiv.style.zIndex = "1";
    overlayDiv.style.position = "absolute";
    overlayDiv.style.width = "100%"; 
    overlayDiv.style.height = "100%"; 
    overlayDiv.style.width = "fit-content";
    overlayDiv.style.height = "fit-content";
    let picPosition = image.getBoundingClientRect();
    overlayDiv.style.top = picPosition.top + "px";
    overlayDiv.style.left = picPosition.left + "px";
    overlayDiv.style.textAlign = "center"; 
    overlayDiv.style.zIndex = "2";
}

function createGrid(rows, columns, squareWidth, squareHeight) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const div = document.createElement("div");
            assignToDiv(div, col * squareWidth, row * squareHeight, squareWidth, squareHeight, rows, columns);
        }
    }
}

function assignToDiv(div, left, top, width, height, rows, columns) {
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.style.backgroundColor = getRandomColor();
    div.style.position = "absolute";
    div.style.left = left + "px";
    div.style.top = top + "px";
    overlayDiv.appendChild(div);
    div.addEventListener("click", () => divEventListener(div, rows, columns));
}

function divEventListener(div, rows, columns) {
    div.style.backgroundColor = "";
    clickCounter++;

    if (clickCounter == rows*columns) {
        alert("Nevermind! The city is....")
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function revealCity(data) {
    overlayDiv.innerHTML="";
    guessDiv.innerHTML="";

    let cityNameHeader = document.createElement("h1");
    cityNameHeader.innerText = data[0].cityName;
    infoDiv.appendChild(cityNameHeader);
    let infoTable = document.createElement("table");
    let infoRow = document.createElement("tr");
    let infoCellOne = document.createElement("td");
    let infoCellTwo = document.createElement("td");
    infoCellOne.innerText = "Country:";
    infoCellTwo.innerText = data[0].country;
    infoRow.append(infoCellOne, infoCellTwo);

    let infoRow2 = document.createElement("tr");
    let infoCellThree = document.createElement("td");
    let infoCellFour = document.createElement("td");
    infoCellThree.innerText = "Population:";
    infoCellFour.innerText = data[0].population;
    infoRow2.append(infoCellThree, infoCellFour);
    
    let infoRow3 = document.createElement("tr");
    let infoCellFive = document.createElement("td");
    let infoCellSix = document.createElement("td");
    infoCellFive.innerText = "Description:";
    infoCellSix.innerText = data[0].description;
    infoRow3.append(infoCellFive, infoCellSix);

    infoTable.append(infoRow, infoRow2, infoRow3);

    infoDiv.appendChild(infoTable);
    infoDiv.style.textAlign = "center";
}

picDiv.style.maxWidth = "95vw";
overlayDiv.style.width = "100vw";