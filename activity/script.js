let colorBtn = document.querySelectorAll(".color");
let mainContainer = document.querySelector(".main_container");
let body = document.body;
let plus = document.querySelector(".fa-plus");


for (let i = 0; i < colorBtn.length; i++) {
    colorBtn[i].addEventListener("click", function (e) {
        let color = colorBtn[i].classList[1];
        mainContainer.style.backgroundColor = color;
    })
}
plus.addEventListener("click", createBox);

function createBox() {
    // create modal
    let box_container = document.createElement("div");
    box_container.setAttribute("class", "box_container");
    box_container.innerHTML = `
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
    body.appendChild(box_container);
    //  event listner 
    handleBox(box_container);


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
            createTask(cColor, textArea.value);
        }
    })


}
function createTask(color, task) {
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML = `
        <div class="task_filter ${color}"></div>
        <div class="task_desc_container">
            <h3 class="uid">#example</h3>
            <div class="task_desc contenteditable ="true">${task}</div>
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
    taskFilter.addEventListener("click", changeColor);

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
