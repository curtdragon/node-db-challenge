const express = require('express');
const helmet = require('helmet');
const db = require("./data/db-config")
// const ProjectRouter = require('./projects/project-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

// server.use('/api/projects', ProjectRouter);

//Get projects
server.get("/api/projects", (req, res) => {
    db("projects")
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

//Add project
server.post("/api/projects", (req, res) => {
    db("projects").insert(req.body)
    .then(ids => {
        const id = ids[0];
        db("projects")
            .where({id})
            .first()
        .then(project => {
            res.status(201).json(project);
        });
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

//Get resources
server.get("/api/resources", (req, res) => {
    db("resources")
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

//Add resource
server.post("/api/resources", (req, res) => {
    db("resources").insert(req.body)
        .then(ids => {
            const id = ids[0];
            db("resources")
                .where({ id })
                .first()
                .then(resource => {
                    res.status(201).json(resource);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

//Add tasks
server.post("/api/tasks", (req, res) => {
    db("tasks").insert(req.body)
        .then(ids => {
            const id = ids[0];
            db("tasks")
                .where({ id })
                .first()
                .then(task => {
                    res.status(201).json(task);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


//Get tasks includes project name and description 
server.get("/api/tasks", (req, res) => {
    db("tasks as t")
        .leftJoin("projects as p", "p.name", "t.project_id")
        .select("t.id", "t.description", "t.name")
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


module.exports = server;