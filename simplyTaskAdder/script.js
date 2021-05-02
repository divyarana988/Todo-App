let input = document.querySelector(".input_box");
let ul = document.querySelector(".task-list");
let arr = [];

if (localStorage.getItem("allTask")){
    let stringArr = localStorage.getItem("allTask");
    arr = JSON.parse(stringArr);

    for (let i = 0; i < arr.length; i++){
        let li = document.createElement("li");
        li.innerText = arr[i];
        li.addEventListener("dblclick", function (e) {
            li.remove();
        })
        li.setAttribute("class", "task");
        ul.appendChild(li);
    }
}

/*
this if will run whenever this app is opened nd if previously there was something add it will display it.
*/

input.addEventListener("keydown", function (e) {
    ///e object -> describe -> event
    //console.log("some key was pressed");
    console.log("event object", e);
    if (e.key == "Enter") {
        //console.log("user want to enter a task");
        let task = input.value;
        console.log(task);
        //create any html tag
        let li = document.createElement("li");
        li.innerText = task;
        
        if (localStorage.getItem("allTask")) {
            let stringArr = localStorage.getItem("allTask");
            arr = JSON.parse(stringArr);
        }
        arr.push(task);
        
        let stringArr = JSON.stringify(arr);
        localStorage.setItem("allTask", stringArr);
        li.addEventListener("dblclick", function (e) {
            li.remove();
        })

        li.setAttribute("class", "task");
        ul.appendChild(li);
        input.value = "";
    }
});