'use strict';
let colorBtn = document.querySelectorAll(".color");
let mainContainer = document.querySelector(".main_container");
let body = document.body;
let plus = document.querySelector(".fa-plus");
let cross = document.querySelector(".fa-times");
let deleteState = false;
let taskArr = [];
if (localStorage.getItem("allTask")) {
    taskArr = JSON.parse(localStorage.getItem("allTask"));
    for (let i = 0; i < taskArr.length; i++){
        let { id, color, task } = taskArr[i];
        createTask(color, task, false, id);
    }
}


/*for (let i = 0; i < colorBtn.length; i++) {
    colorBtn[i].addEventListener("click", function (e) {
        let color = colorBtn[i].classList[1];
        mainContainer.style.backgroundColor = color;
    })
}*/
plus.addEventListener("click", createBox);
cross.addEventListener("click", setDeleteState);

function createBox() {
    // create modal
    let boxContainer = document.querySelector(".box_container");
    
    
    if (boxContainer == null) {
        
     boxContainer = document.createElement("div");
        boxContainer.setAttribute("class", "box_container");
        boxContainer.innerHTML = `
    <div class="input_container">
    <textarea class="box_input" 
    placeholder="Enter Your text"></textarea>
    </div>
    <div class="box_color_container">
    <div class="circle pink"></div>
    <div class="circle green"></div>
    <div class="circle orange"></div>
    <div class="circle electricBlue"></div>
    </div>
    `;
    body.appendChild(boxContainer);
    //  event listner 
    handleBox(boxContainer);
    }

    let textarea = boxContainer.querySelector(".box_input");
    textarea.value = "";
    


}

function handleBox(box_container) {
    let cColor = "black";
    let boxColors = document.querySelectorAll(".box_color_container .circle");
    // /remove previous attr new attrs
    // modalFilters[3].setAttribute("class", "border");
    // border -> black
    boxColors[3].classList.add("border");
    for (let i = 0; i < boxColors.length; i++) {
        boxColors[i].addEventListener("click", function () {
            //    remove broder from elements
            boxColors.forEach((color) => {
                color.classList.remove("border");
            })
            //  add
            boxColors[i].classList.add("border")
            // modalFilters[i].classList
            //  color 
            cColor = boxColors[i].classList[1];
            console.log("current color of task", cColor);

        })
    }
    let textArea = document.querySelector(".box_input");
    textArea.addEventListener("keydown", function (e) {
        if (e.key == "Enter" && textArea.value!="") {
            console.log("Task ", textArea.value, "color ", cColor);
            //  remove modal
            box_container.remove();
            // create taskBox
            createTask(cColor, textArea.value, true);
        }
    })


}
function createTask(color, task, flag, id) {

    let taskContainer = document.createElement("div");
    
    let uiFn = new ShortUniqueId();
    let uid = id || uiFn;

    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML = `
        <div class="task_filter ${color}"></div>
        <div class="task_desc_container">
            <h3 class="uid">#${uid}</h3>
            <div class="task_desc" contenteditable ="true">${task}</div>
        </div>
        </div >
    `;
    mainContainer.appendChild(taskContainer);

    let taskFilter = taskContainer.querySelector(".task_filter");
    /*
    taskFilter.addEventListener("click", function () {
        let cColor = taskFilter.classList[1];
        let idx = colors.indexOf(cColor);
        let newColorIdx = (idx + 1) % 4;
        taskFilter.classList.remove(cColor);
        taskFilter.classList.add(colors[newColorIdx]);
    })
    */
    
    if (flag == true) {
        console.log(uid);
        let obj = { "task": task, "id": `${uid}`, "color": color };
        taskArr.push(obj);
        let finalArr = JSON.stringify(taskArr);
        localStorage.setItem("allTask", finalArr);
    }

    taskFilter.addEventListener("click", changeColor);
    taskFilter.addEventListener("click", deleteTask);

    let taskDesc = taskContainer.querySelector(".task_desc");
    taskDesc.addEventListener("keypress", editTask);

}

function changeColor(e) {
    let taskFilter = e.currentTarget;
    let colors = ["pink", "green", "orange", "electricBlue"];
    let cColor = taskFilter.classList[1];
    let idx = colors.indexOf(cColor);
    let newColorIdx = (idx + 1) % 4;
    taskFilter.classList.remove(cColor);
    taskFilter.classList.add(colors[newColorIdx]);
}

function setDeleteState(e) {
    let cross = e.currentTarget;
    let parent = cross.parentNode;

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
        let uidElem = taskContainer.querySelector(".uid");
        let uid = uidElem.innerText;
        for (let i = 0; i < taskArr.length; i++){
            let { id } = taskArr[i];
            console.log(id, uid);
            if (id == uid) {
                taskArr.splice(i, 1);
                let finalTaskArr = JSON.stringify(taskArr);
                localStorage.setITem("allTask", finalTaskArr);
                taskContainer.remove();
                break;
            }
        }
    }
}

function editTask(e) {
    let taskDesc = e.currentTarget;
    let uidElem = taskDesc.parentNode.children[0];
    let uid = uidElem.innerText;
    for (let i = 0; i < taskArr.length; i++){
        let { id } = taskArr[i];
        console.log(id, uid);
        if (id == uid) {
            taskArr[i].task = taskDesc.innerText;
            let finalTaskArr = JSON.stringify(taskArr);
            localStorage.setItem("allTask", finalTaskArr);

            break;
        }
    }
}