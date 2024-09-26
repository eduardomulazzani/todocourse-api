const dbLocal = require("db-local");
const { Schema } = new dbLocal({ path: "./databases" });

class DBToDo {
    constructor() {
        console.log("DB: initing");

        this.ToDoList = Schema("ToDoList", {
            title: { type: String, default: "" },
            description: { type: String, default: "" }
        });
    }

    create(payload = {}) {
        const ToDoList = this.ToDoList.create(payload).save();

        return ToDoList;
    }

    findAll() {
        const finded = this.ToDoList.find();

        console.log(finded)

        return finded;
    }

    findById(id = "") {
        const finded = this.ToDoList.find({_id: id});

        return finded;
    }

    update(ToDo) {
        const id = ToDo._id;

        const updated = this.ToDoList.update({_id: id}, ToDo).save();

        return updated;
    }

    delete(id) {
        const removed = this.ToDoList.remove({_id: id});

        return removed;
    }
}

module.exports = new DBToDo();