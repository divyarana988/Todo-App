let input = document.querySelector(".input_box");
let ul = document.querySelector(".task_list");
let arr = [];

if (localStorage.getItem("allTask")) {
    
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

input.addEventListener("keydown", function (e) {
    
    if (e.key == 'Enter') {
        let task = input.value;
        console.log(task);
        let li = document.createElement("li");
        li.innerText = task;

        if (localStorage.getItem("allTask")) {
    
            let stringArr = localStorage.getItem("allTask");
            arr = JSON.parse(stringArr);
        }
        arr.push(task);

        //convert to string 
        let stringArr = JSON.stringify(arr);

        //always store valye in string form
        localStorage.setItem("allTask", stringArr);
        li.addEventListener("dblclick", function (e) {
            li.remove();
        })
        li.setAttribute("class", "task");
        ul.appendChild(li);
        input.value = "";

    }
})