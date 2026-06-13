const apiUrl = "http://localhost:3000/tasks";

async function loadTasks() {
    try {
        const response = await fetch(apiUrl);
        const tasks = await response.json();

        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach(task => {

            const taskCard = document.createElement("div");
            taskCard.className = "task-card";

            const title = document.createElement("h3");
            title.textContent = task.title;

            const status = document.createElement("p");
            status.textContent = task.completed
                ? "Completed"
                : "Pending";

            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.onclick = function () {
                completeTask(task._id);
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = function () {
                deleteTask(task._id);
            };

            taskCard.appendChild(title);
            taskCard.appendChild(status);
            taskCard.appendChild(completeBtn);
            taskCard.appendChild(deleteBtn);

            taskList.appendChild(taskCard);
        });

    } catch (error) {
        console.log(error);
    }
}

async function addTask() {

    const title =
        document.getElementById("taskInput").value;

    if (title === "") {
        alert("Enter a task");
        return;
    }

    await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    });

    document.getElementById("taskInput").value = "";

    loadTasks();
}

async function completeTask(id) {

    await fetch(apiUrl + "/" + id, {
        method: "PUT"
    });

    loadTasks();
}

async function deleteTask(id) {

    await fetch(apiUrl + "/" + id, {
        method: "DELETE"
    });

    loadTasks();
}

document
    .getElementById("addBtn")
    .addEventListener("click", addTask);

loadTasks();