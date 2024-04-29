let executeIfBlock = true;
function editTask(id) {
  let h2 = document.getElementById("hideh2" + id);
  let input = document.getElementById("showInput" + id);
  h2.style.display = "none";
  input.style.display = "block";
}
document.addEventListener("DOMContentLoaded", function () {
  const checkAll = document.getElementById("ckbCheckAll");

  checkAll.addEventListener("click", function () {
    const taskData = JSON.parse(localStorage.getItem("task")) || [];

    if (executeIfBlock) {
      taskData.forEach((td) => {
        if (td.status == "active") {
          td.status = "completed";
        }
      });
      localStorage.setItem("task", JSON.stringify(taskData));
    } else {
      taskData.forEach((td) => {
        if (td.status == "completed") {
          td.status = "active";
        }
      });
      localStorage.setItem("task", JSON.stringify(taskData));
    }
    viewAllTask(["active", "completed"]);
    executeIfBlock = !executeIfBlock;
  });
});

function setActiveButton(selectedButtonId) {
  const buttonIds = ["all", "active", "completed"];

  buttonIds.forEach((id) => {
    const button = document.getElementById(id);

    if (id === selectedButtonId) {
      button.classList.add("btn-outline-secondary");
    } else {
      button.classList.remove("btn-outline-secondary");
    }
  });
}

function validate() {
  const task = document.getElementById("task").value;
  if (task == "") {
    alert("Please enter task");
    return false;
  }
  addTaskData();
}

function addTaskData() {
  let taskData = JSON.parse(localStorage.getItem("task")) || [];

  const task = document.getElementById("task").value;

  const newTask = {
    task,
    id: Math.round(Math.random() * 1000),
    status: "active",
  };

  taskData.push(newTask);

  localStorage.setItem("task", JSON.stringify(taskData));

  document.getElementById("task").value = "";
  viewAllTask(["active", "completed"]);
}

viewAllTask(["active", "completed"]);

function viewAllTask(value) {
  value.length == 2 ? setActiveButton("all") : setActiveButton(value[0]);
  const taskData = JSON.parse(localStorage.getItem("task")) || [];

  let html = "";
  let dataCount = 0;
  taskData.forEach((td) => {
    if (value.includes(td.status)) {
      dataCount++;
    }
  });
  if (dataCount == 0) {
    html += `<p class="form-control task-name p-0 m-0 ps-5 border-0 text-start fs-3">No Data Found</p>`;
  } else {
    html += `<div class="">`;

    taskData.forEach((td) => {
      if (value.includes(td.status)) {
        html += `
                <div class="p-2 tasks border taskCounter">
                    <div class="">
                        <form method="post" onsubmit="updateTaskValidate(${td.id})">
                            <div
                                class="input-group-text tasks-main p-0 border-0 d-flex align-items-center  ">
                                <input type="checkbox" class="checkBoxClass form-check-input" name="deleteall[]" value="${td.id}" onchange="editAsCompleted(${td.id})" ${td.status == "completed" ? "checked" : ""}>
                                <button id="hideh2${td.id}"
                                    class="form-control task-name p-0 m-0 ms-3 border-0 text-start fs-3 ${td.status}"
                                    ondblclick="editTask(${td.id})" type="button">${td.task}</button>
                                
                                <input id="showInput${td.id}"
                                    class="form-control task-name p-0 m-0 ms-3 border-0 text-start fs-3 updateInput"
                                    type="text" value="${td.task}">
                            </div>
                        </form>
                    </div>
                </div>
              `;
      }
    });

    html += `</div>`;
  }
  document.getElementById("view").innerHTML = html;
}

function editAsCompleted(id) {
  const taskData = JSON.parse(localStorage.getItem("task")) || [];
  taskData.forEach((td) => {
    if (td.id == id) {
      if (td.status == "active") {
        td.status = "completed";
      } else {
        td.status = "active";
      }
    }
  });
  localStorage.setItem("task", JSON.stringify(taskData));
  viewAllTask(["active", "completed"]);
}

function updateTaskValidate(id) {
  const task = document.getElementById("showInput" + id).value;
  if (task == "") {
    alert("Please enter task");
    return false;
  }
  updateTask(id);
}
function updateTask(id) {
  const getTask = document.getElementById("showInput" + id).value;
  const taskData = JSON.parse(localStorage.getItem("task")) || [];
  taskData.forEach((td) => {
    if (td.id == id) {
      td.task = getTask;
    }
  });
  localStorage.setItem("task", JSON.stringify(taskData));
  viewAllTask(["active", "completed"]);
}

function clearCompleted() {
  const taskData = JSON.parse(localStorage.getItem("task")) || [];
  const filteredTasks = taskData.filter((task) => task.status !== "completed");
  localStorage.setItem("task", JSON.stringify(filteredTasks));
  viewAllTask(["active", "completed"]);
}
