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
    if(!projects){
        return res.status(400).json({erros:"Project not exists"})
    }
    return next()
}

app.post("/projects",(req,res)=>{
    const {id,title} = req.body;
    projects.push({"id":id,"title":title,"tasks":[]})
    return res.status(200).json(projects)
})
app.get("/projects",(req,res)=>{
    return res.status(200).json(projects)
})
app.put("/projects/:id",checkUserExists,(req,res)=>{
    const {title} = req.body;
    const {id} = req.params;
    projects[id].title = title;
    return res.status(200).json(projects[id]);
})
app.delete("/projects/:id",checkUserExists,(req,res)=>{
    const {id} = req.params;
    projects.splice(id,1);
    return res.send()
})

app.post("/projects/:id/tasks",checkUserExists,(req,res)=>{
    const {id} = req.params;
    const {title} = req.body;
    projects[id].tasks.push(title);
    return res.status(200).json(projects[id])
})

app.listen(3000, ()=>{
    console.log("Server listening on port 3000")
})
