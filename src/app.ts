import express from 'express'
import cors from 'cors';
import Result from './models/Result';
import User from './models/User';
import Task from './models/Task';

const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    SERVER_ERROR_500: 500,
    BAD_REQUEST_400: 400 
}
const app = express()


const jsonBodyMiddleware = express.json();

const corsOptions ={
    "origin":'*', 
    "credentials":true,
    "optionSuccessStatus":200
}

app.use(cors(corsOptions))
app.use(jsonBodyMiddleware)
app.use("/uploads",express.static("src/uploads"))


app.get('/api/members/', (req, res) => {
    res.send('Hello World!')
})


app.post('/api/user', async (req, res) => {
    try {
        const user = await User.find({email: req.body.email})
        if (user.length==0){
            res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
                message : "wrong email",
                done: false
            })
        } else {
            res.status(HTTP_STATUSES.OK_200).json({
                message : "OK",
                done: true,
                user: user
            })
        }    

    } catch (err) {
        res.status(HTTP_STATUSES.SERVER_ERROR_500).json({
            messege: "failed to load tasks"
        })
    }
})

app.post('/api/tasks/:group', async (req, res) => {
    try {
        
        //  if (new Date).getTime() >= 1716152400000     <- time revise
        
        const user = await User.findById(req.body._id)
        if (user){
            const tasks = await Task.find({
                group: req.params.group
            }, {
                answer: 0,
            })

            if (!user.started) {
                await User.findByIdAndUpdate(req.body._id,
                    {
                        started: true,
                        startedTime: (new Date()).getTime(),
                    }
                )
                res.status(HTTP_STATUSES.OK_200).json({
                    code:3,
                    message : "OK",
                    data: tasks
                })
            } else {
                res.status(HTTP_STATUSES.OK_200).json({
                    code: 2,
                    startedTime: user.startedTime,
                    data: tasks,
                    messege: "user already started"
                })
            }

        } else {
            res.status(HTTP_STATUSES.OK_200).json({
                code: 1,
                messege: "user unregistred"
            })
        }
    } catch (err) {
        res.status(HTTP_STATUSES.SERVER_ERROR_500).json({
            code: 0,
            messege: "failed to load tasks"
        })
    }
})

app.post('/api/results', async (req, res) => {
    try {
        let doc= new Result({
            userId : req.body.userId,
            data: req.body.data,
        })
        const result = await doc.save();
        res.status(HTTP_STATUSES.CREATED_201).json(result)
    } catch (err) {
        res.status(HTTP_STATUSES.SERVER_ERROR_500).json(
            "Не вдалось зарахувати ваші результати"
        )
    }
})

app.post('/api/tasks', async (req, res) => {
    try {
        let doc= new Task({
            condition: req.body.condition,
            answer: req.body.answer,
            group: req.body.group,
            mark: req.body.mark
        })
        const task = await doc.save();
        res.status(HTTP_STATUSES.CREATED_201).json(task)
    } catch (err) {
        res.status(HTTP_STATUSES.SERVER_ERROR_500).json(
            "Не вдалось добавити завдання"
        )
    }
})

app.post('/api/users', async (req, res) => {
    try {
        let doc= new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            category: req.body.category
        })
        const user = await doc.save();
        res.status(HTTP_STATUSES.CREATED_201).json(user)
    } catch (err) {
        console.log(err);
        
        res.status(HTTP_STATUSES.SERVER_ERROR_500).json(
            "Не вдалось добавити завдання"
        )
    }
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