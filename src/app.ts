import express from 'express'
const app = express()


const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,

}

let db = {
    tasks: [
        {
            condition: "1+2",
            answer: "3",
            group: "1",
        }
    ]
}

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware)

app.get('/', (req, res) => {
    res.sendFile("C:\\Users\\vovao\\OneDrive\\Documents\\Lyceum\\FAMiCO\\contest_lucky_shapes\\website\\famico\\public\\index.html")
})

app.get('/api/members/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/tasks', (req, res) => {
    let tasks=db.tasks.map( (task)=>({
        condition: task.condition,
        group:task.group,
    }))
    if (req.query.group){
        tasks=tasks.filter((task)=>task.group===req.query.group)
    }
    res
        .json(tasks)
        .sendStatus(HTTP_STATUSES.OK_200)
})

app.post('/api/tasks',(req, res) => {
    let newTask={
        condition: req.body.condition,
        answer: req.body.answer,
        group: req.body.group,
    }
    db.tasks.push(newTask);
    res
        .json(newTask)
        .sendStatus(HTTP_STATUSES.CREATED_201)
})

/*   POST
fetch("http://localhost:3000/api/tasks", {
    method:"POST",
    body : JSON.stringify({ condition :"2+5", answer :"7", group :"2" }),
    headers: {
        'content-type':'application/json'
    }
})
.then(res=>res.json())
.then(json=>console.log(json))
*/
export default app;