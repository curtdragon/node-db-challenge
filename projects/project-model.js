const db = require("../data/db-config")

module.exports = {
    addResource,
    getResources,
    addProject,
    getProjects,
    getProjectById,
    addTask,
    getTasks
};

function getProjects() {
    return db("projects");
}

function getProjectById(id) {
    return db("projects").where({id}).first();
}

function addProject(project) {
    return db("projects").insert(project)
    .then(ids => {
        return getProjectById(ids[0]);
    })
}

function addResource() {
}

function getResources() {
}

function addTask() {

}

function getTasks() {

}