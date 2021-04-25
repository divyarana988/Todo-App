let input = document.querySelector(".input_box");
let ul = document.querySelector(".task-list");
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
        li.addEventListener("dblclick", function (e) {
            console.log("e", e);
            li.remove();
        })
        li.setAttribute("class", "task");
        ul.appendChild(li);
        input.value = "";
    }
});