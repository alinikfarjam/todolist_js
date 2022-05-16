const inputValue = document.querySelector(".inputt");
const submit = document.querySelector(".submit");
const ul = document.querySelector("ul");
const icons = document.querySelector(".icons");
const select = document.querySelector("select");


submit.addEventListener("click", click);
ul.addEventListener("click", clickIcons);
select.addEventListener("click", filter);

function filter(e) {
    e.preventDefault();
    const todos = [...ul.childNodes];
    todos.shift()
    console.log(todos)

    todos.forEach(event => {
        switch (e.target.value) {
            case "all":
                event.style.display = "flex"
                break;
            case "completed":
                if (event.classList.contains("completed")) {
                    event.style.display = "flex";

                } else {
                    event.style.display = "none";

                }
                break;
            case "uncompleted":
                if (event.classList.contains("uncompleted")) {
                    event.style.display = "flex";
                } else {
                    event.style.display = "none";
                }
                break;


        }
    })

}
window.onload = function () {
    let data = [];
    console.log(1);
    if (localStorage.getItem("todo") !== null) {
        data = JSON.parse(localStorage.getItem("todo"))
        data.map(e => {
            const div = document.createElement("div");
            div.classList.add("li");
            div.classList.add("uncompleted")

            //create li
            const li = document.createElement("li");
            li.innerText = e;
            li.classList.add("lili");


            //create div icons
            const divicons = document.createElement("div");
            divicons.classList.add("icons");
            divicons.innerHTML = '<i class="fa-solid fa-check"></i> <i class="fa-solid fa-trash"></i>';

            //append to div
            div.appendChild(li);
            div.appendChild(divicons);
            ul.appendChild(div);

        })
        // ul.appendChild(li)

    }

};


function clickIcons(e) {
    if (e.target.classList[1] == 'fa-check') {
        e.target.parentElement.parentElement.classList.toggle("completed");
        e.target.parentElement.parentElement.classList.toggle("uncompleted");
        e.target.parentElement.parentElement.classList.toggle("opacity");
        e.target.parentElement.parentElement.firstChild.classList.toggle("agree");
        // console.log(e.target.parentElement.parentElement)
    }
    if (e.target.classList[1] == 'fa-trash') {
        e.target.parentElement.parentElement.remove();
        removeItemLocalStorage(e.target.parentElement.parentElement.firstChild.innerText)
        // console.log(e.target.parentElement.parentElement.firstChild.innerText);
    }
}



function click(e) {
    e.preventDefault();
    const value = inputValue.value;

    //create div
    const div = document.createElement("div");
    div.classList.add("li");
    div.classList.add("uncompleted")
    //save local storage
    saveLocalStorage(inputValue.value);

    //create li
    const li = document.createElement("li");
    li.innerText = value;
    li.classList.add("lili");


    //create div icons
    const divicons = document.createElement("div");
    divicons.classList.add("icons");
    divicons.innerHTML = '<i class="fa-solid fa-check"></i> <i class="fa-solid fa-trash"></i>';

    //append to div
    div.appendChild(li);
    div.appendChild(divicons);
    ul.appendChild(div);

    //empty input
    inputValue.value = '';
}

function saveLocalStorage(value) {
    let data;
    if (localStorage.getItem("todo") === null) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem("todo"))

    }
    data.push(value)

    localStorage.setItem("todo", JSON.stringify(data))
}
function removeItemLocalStorage(value) {
    let data;
    if (localStorage.getItem("todo") === null) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem("todo"))
    }
    const name = element => element == value;
    const index = data.findIndex(name)
    data.splice(index, 1)

    localStorage.setItem("todo", JSON.stringify(data))
}