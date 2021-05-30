let colorBtn = document.querySelectorAll(".option_color");
let screenContainer = document.querySelector(".screen_container");
let plusBtn = document.querySelector(".fa-plus");
let body = document.body;
let crossBtn = document.querySelector(".fa-times");
let deleteState = false;
let taskArr = [];

if (localStorage.getItem("allTask")) {
    taskArr = JSON.parse(localStorage.getItem("allTask"));
    for (let i = 0; i < taskArr.length; i++){
        let { id, color, task } = taskArr[i];
        createTask(color, task, false, id);
    }
}

for (let i = 0; i < colorBtn.length; i++){
    colorBtn[i].addEventListener("click", function (e) {
        let color = colorBtn[i].classList[1];
        screenContainer.style.backgroundColor = color;
    })
}

plusBtn.addEventListener("click", createCard);
crossBtn.addEventListener("click", setDeleteState);

function createCard() {

    let cardContainer = document.querySelector(".card_container");

    if (cardContainer == null) {
        cardContainer = document.createElement("div");
        cardContainer.setAttribute("class", "card_container");

        cardContainer.innerHTML = `
                <div class="input_container">
                    <textarea class="card_input" placeholder="Enter your task"></textarea>
                </div>
                <div class="card_option_container">
                    <div class="option yellow"></div>
                    <div class="option blue"></div>
                    <div class="option green"></div>
                    <div class="option coral"></div>
                </div>
        `;
        body.appendChild(cardContainer);
        handleCard(cardContainer);
    }
    let textarea = document.querySelector(".card_input");
    textarea.value = "";
}

function handleCard(cardContainer) {
    let cColor = "coral";
    let cardOptions = document.querySelectorAll(".card_option_container .option");

    cardOptions[3].classList.add("border");
    for (let i = 0; i < cardOptions.length; i++){
        cardOptions[i].addEventListener("click", function () {
            
            cardOptions.forEach((option) => {
                option.classList.remove("border");
            })
            cardOptions[i].classList.add("border");
            cColor = cardOptions[i].classList[1];
            console.log(cColor);

        })
    }

    let textArea = document.querySelector(".card_input");
    textArea.addEventListener("keydown", function (e) {
        if (e.key == "Enter" && textArea.value!="") {
            console.log(textArea.value, cColor);
            //remove card
            cardContainer.remove();
            //create taskbox
            createTask(cColor, textArea.value, true);
        }
    })
}

function createTask(color, task, flag, id) {
     
    let taskContainer = document.createElement("div");
    let uifn = new ShortUniqueId();
    let uid = id || uifn();
    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML= `<div class="task_option ${color}"></div>
        <div class="task_desc_container">
            <h3 class="uid">#${uid}</h3>
             <div class="task_desc" contenteditable="true">${task}</div>
        </div>`;
    screenContainer.appendChild(taskContainer);
    let taskOption = taskContainer.querySelector(".task_option");
    if (flag == true) {
        let obj = { "task": task, "id": uid, "color": color };
        taskArr.push(obj);
        let finalArr = JSON.stringify(taskArr);
        localStorage.setItem("allTask", finalArr);
    }
    
    taskOption.addEventListener("click", changePriority);
    taskContainer.addEventListener("click", deleteTask);
    let taskDesc = taskContainer.querySelector(".task_desc");
    taskDesc.addEventListener("keypress", editTask);
}

function changePriority(e) {
    let taskOption = e.currentTarget;
    let colors = ["yellow", "blue", "green", "coral"];
        let cColor = taskOption.classList[1];
        let idx = colors.indexOf(cColor);
        let newColorIdx = (idx + 1) % 4;
        taskOption.classList.remove(cColor);
        taskOption.classList.add(colors[newColorIdx]);


}

function setDeleteState(e) {
    let crossBtn = e.currentTarget;
    let parent = crossBtn.parentNode;
    if (deleteState == false) {
        parent.classList.add("active");
    } else {
        parent.classList.remove("active");
    }
    deleteState = !deleteState;
}

function deleteTask(e) {
    
    let taskContainer = e.currentTarget;
    if (deleteState) {
        let uidElem = document.querySelector(".uid");
        let uid = uidElem.innerText.split("#")[1];
        for (let i = 0; i < taskArr.length; i++){
            let { id } = taskArr[i];
            if (id == uid) {
                taskArr.splice(i, 1);
                let finalTaskArr = JSON.stringify(taskArr);
                localStorage.setItem("allTask", finalTaskArr);
                taskContainer.remove();
                break;
            }
        }
        
    }

}