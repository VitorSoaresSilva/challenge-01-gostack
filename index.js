const express = require('express');
const app = express();
app.use(express.json())

var projects = []
var countRequest = 0

app.use((req,res,next)=>{
    countRequest++
    console.log("Total de requisições: " + countRequest);
    return next()
})
function checkUserExists(req,res,next) {
    const {id} = req.params
    const project = projects.find(proj => proj.id == id)
    if(!project){
        return res.status(400).json({erros:"Project not exists"})
    }
    return next()
}

app.post("/projects",(req,res)=>{
    const {id,title} = req.body;
    projects.push({id,title,"tasks":[]})
    return res.status(200).json(projects)
})
app.get("/projects",(req,res)=>{
    return res.status(200).json(projects)
})
app.put("/projects/:id",checkUserExists,(req,res)=>{
    const {body:{title},params:{id}} = req
    const project = projects.find(proj => proj.id == id)
    project.title = title;
    return res.status(200).json(project);
})
app.delete("/projects/:id",checkUserExists,(req,res)=>{
    const {id} = req.params;
    const index = projects.findIndex(proj => proj.id == id)
    projects.splice(index,1);
    return res.send()
})

app.post("/projects/:id/tasks",checkUserExists,(req,res)=>{
    const {body:{title},params:{id}} = req
    const project = projects.find(proj => proj.id == id)
    project.tasks.push(title);
    return res.status(200).json(project)
})

app.listen(3000, ()=>{
    console.log("Server listening on port 3000")
})
