const testImages = [
    "images/D1.jpg",
    "images/D2.jpg",
    "images/D3.jpg",
]

let result = 0;
let cells = [];
let selections = [];
let runningBatch;
console.log(cells);

buildGrids(4, 4); // populates the  cells array with cells of the memory grid
addEventListenersForcells();






const startbtn = document.getElementById("startbtn");
startbtn.addEventListener("click", runBatch);


function addEventListenersForcells() {
    for (cell of cells) {
        cell.addEventListener("click", event => {
            if (runningBatch == true) {
                console.log("returnning");
                return
            } else if (runningBatch == false) {
                console.log(event);
                let cellId = event.srcElement.id;
                let nextSelection = selections.shift();
                console.log(selections);
                if (!selections.length) {
                    if (cellId == nextSelection[0] + 1) {
                        swapImages(testImages[nextSelection[1]], cellId - 1);
                        setTimeout(() => {
                            swapImages("images/LOGO.jpg", cellId - 1);

                        }, 1500);
                        alert('You got It !!! press the start button  to continue.');
                        runningBatch = true;
                        result += 3;
                        updateresult(result)
                    } else {
                        swapImages("images/WrongSelection.jpg", cellId - 1);
                        setTimeout(() => {
                            swapImages("images/LOGO.jpg", cellId - 1);

                        }, 1500);
                        alert("You got the sequence wrong. press statrt to try again")
                        result = 0;
                        updateresult(result)
                        runningBatch = true;
                    }
                } else {
                    if (cellId == nextSelection[0] + 1) {
                        swapImages(testImages[nextSelection[1]], cellId - 1);
                        setTimeout(() => {
                            swapImages("images/LOGO.jpg", cellId - 1);

                        }, 1500);
                    } else {
                        swapImages("images/WrongSelection.jpg", cellId - 1);
                        setTimeout(() => {
                            swapImages("images/LOGO.jpg", cellId - 1);

                        }, 1500);
                        alert("You got the sequence wrong. press statrt to try again")
                        result = 0;
                        updateresult(result)
                        runningBatch = true;
                    }

                }

            }

        });

    }
}



function updateresult(result) {
    let resultElement = document.getElementById("Result");
    resultElement.innerText = result;

}


async function runBatch() {
    runningBatch = true;
    const firstPick = await pickRandomAndSwap();
    const secondPick = await pickRandomAndSwap();
    const thirdPick = await pickRandomAndSwap();
    selections.push(firstPick);
    selections.push(secondPick);
    selections.push(thirdPick);
    console.log(selections);
    runningBatch = false;

}


function pickRandomAndSwap() {
    return new Promise((resolve, reject) => {
        let random = Math.floor(Math.random() * 16);
        let random2 = Math.floor(Math.random() * 3);
        swapImages(testImages[random2], random);
        setTimeout(() => {
            swapImages("images/LOGO.jpg", random);
            resolve(
                [random, random2]
            )
        }, 1500);
    })
}


function swapImages(imgToreplace, indexOfreplaced) {
    let cellImage = document.createElement("img");
    cellImage.setAttribute("src", imgToreplace);
    cellImage.setAttribute("class", "img-fluid");
    cellImage.setAttribute("id", indexOfreplaced + 1)
    let previosImage = document.getElementById(indexOfreplaced + 1)
    cells[indexOfreplaced].replaceChild(cellImage, previosImage)
        // console.log(imgToreplace);
}




function buildGrids(rows, cols) {
    for (let i = 0; i < rows; i++) {
        let rowContainer = document.createElement("div");
        rowContainer.setAttribute("class", "row g-0 ");
        let mainContainer = document.getElementById("mainContainer");

        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("div");
            cell.setAttribute("class", "col-3 col-lg-2 px-0 border border-primary");
            cells.push(cell);
            let cellImage = document.createElement("img");
            cellImage.setAttribute("src", "images/LOGO.jpg");
            cellImage.setAttribute("class", "img-fluid");
            cellImage.setAttribute("id", (cells.length))
            cell.appendChild(cellImage);
            rowContainer.appendChild(cell);

            mainContainer.appendChild(rowContainer);
        }
    }
}