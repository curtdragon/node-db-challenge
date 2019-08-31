const express = require("express");
const Projects = require("./project-model")
const router = express.Router();


//Get projects
router.get("/", (req, res) => {
    Projects.getProjects()
    .then(projects => {
        res.json(projects);
    })
    .catch (err => {
        res.status(500).json({
            message: "Unable to get projects"
        })
    });
});

//Get Project by ID
router.get("/:id", (req, res) => {
    const {id} = req.params;

    Projects.getProjectById(id)
    .then(project => {
        if (project) {
            res.json(project);
        } else {
            res.status(400).json({ 
                message: "Could not find project with given ID"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Failed to get the project"
        })
    });
});

//Add projects
router.post("/", (res, req) => {
    const projectData = req.body;

    Projects.addProject(projectData)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to create new project"
            })
        });
});

//Add resource

//Get resources

//Add tasks

//Get tasks

module.exports = router;