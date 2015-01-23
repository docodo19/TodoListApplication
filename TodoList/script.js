/*
 * removeAll functionality added to Array as Prototype
 */
Array.prototype.removeAll = function () {
    this.splice(0);
}

/*
 * Create todo object.  Todo object contains everything about the Todolist Application
 */
var todo = {};

/*
 * Arrays of task objects. Stores all task data.
 */
todo.taskArray = [];

/*
 * Edit mode toggle
 */
todo.editMode = {
    isOn: false,
    index: null,
}

/*
 * Assignment of document.getElementById into a variable
 */
todo.taskTitleId = document.getElementById("taskTitle");
todo.taskDescriptionId = document.getElementById("taskDescription");
todo.taskDeadline = document.getElementById("taskDeadline");
todo.displayTasksId = document.getElementById("displayTasks");
todo.completedTaskId = document.getElementById("completedTask");
todo.titleDivId = document.getElementById("titleDiv");
todo.titleDivId.innerHTML = "<h1>I have nothing to do...</h1>";

/*
 * Task object constructor
 */
todo.taskObj = function (title, description, deadline) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.completed = false;
    this.setCompleted = function () {
        this.completed = true;
        todo.displayTasks();
    }
}

/*
 * Resets the taskArray
 */
todo.reset = function () {
    todo.taskArray.removeAll();
    todo.displayTasks();
}

/*
 * Displays main title and task box for both complete and incomplete tasks
 */
todo.displayTasks = function () {
    var h = "";
    var hh = "";
    var taskCount = 0;

    for (var i = 0; i < todo.taskArray.length; i++) {
        if (!todo.taskArray[i].completed) {
            taskCount++;
            h += todo.taskView(todo.taskArray, i, todo.taskArray[i].completed);
        } else {
            hh += todo.taskView(todo.taskArray, i, todo.taskArray[i].completed);
        }
    }

    if (taskCount > 1) {
        todo.titleDivId.innerHTML = "<h1>I have " + taskCount + " things to do!</h1>";
    } else if (taskCount == 1) {
        todo.titleDivId.innerHTML = "<h1>I have a task to do!</h1>";
    } else
    {
        todo.titleDivId.innerHTML = "<h1>I have nothing to do...</h1>";
    }


    todo.displayTasksId.innerHTML = h;
    todo.completedTaskId.innerHTML = hh;
}

/*
 * Task box script generator
 */
todo.taskView = function (arrayData, i, completed) {
    var h = "";
    h += "<div class='taskBox'>";
    h += "<h3>" + arrayData[i].title + "</h3>";
    if (!completed) {
        h += "<p>" + arrayData[i].description + "</p>";
        h += "<p>Deadline: " + arrayData[i].deadline + "</p>";
        h += "<button class='btn btn-success' onclick='todo.taskArray[" + i + "].setCompleted()'>Done</button>&nbsp;";
        h += "<button class='btn btn-warning' onclick='todo.taskEdit(" + i + ")'>Edit</button>";
    }
    h += "</div>";

    return h;
}


/*
 * Create task. Takes the value from the input field to instantiate an object. 
 */
todo.createTask = function () {
    var newTask = new todo.taskObj(todo.taskTitleId.value, todo.taskDescriptionId.value, todo.taskDeadline.value);

    if (todo.editMode.isOn) {
        todo.taskArray[todo.editMode.index] = newTask;
        todo.editMode.isOn = false;
    } else {
        todo.taskArray.push(newTask);
    }

    todo.displayTasks();
    todo.taskTitleId.value = null;
    todo.taskDescriptionId.value = null;
    todo.taskDeadline.value = null;
}

/*
 * Edit task. This sends the data back to the input fields.
 */
todo.taskEdit = function (i) {
    todo.taskTitleId.value = todo.taskArray[i].title;
    todo.taskDescriptionId.value = todo.taskArray[i].description;
    todo.editMode.isOn = true;
    todo.editMode.index = i;
}

/*
 * Shows taskArray into console
 */
todo.showTaskArray = function () {
    console.log(todo.taskArray);
}