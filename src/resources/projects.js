const express = require("express");
const fs = require("fs");

const router = express.Router();
const projects = require("../data/projects.json");

router.get("/getAll", (req, res) => {
  res.send(projects);
});

router.post("/add", (req, res) => {
  const projectsData = req.body;
  projects.push(projectsData);
  fs.writeFile("src/data/projects.json", JSON.stringify(projects), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Project created");
    }
  });
});

// router.get("/getByName", (req, res) => {
//   const projectName = req.query.project_name;
//   const project = projects.find((project) => project.project_name === projectName);

//   if (project) {
//     res.send(project);
//   } else {
//     res.send("Project not found");
//   }
// });

module.exports = router;
