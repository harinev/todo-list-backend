const express = require("express");
const cors= require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");


const app=express();
app.use(cors());
app.use(bodyParser.json())

app.get("/tasks", function (request, response){
	console.log(request);

	response.status(200).json({
		Task: [
			{
			  id: 1,
			  taskitem: "Pay Insurance",
			  duedt: "2019/12/15",
			  Completed: false
			},
	  
			{
			  id: 2,
			  taskitem: "Pack the luggage",
			  duedt: "2019/12/10",
			  Completed: true
			},
			{
			  id: 3,
			  taskitem: "Do Shopping",
			  duedt: "2019/12/14",
			  Completed: false
			},
			{
			  id: 4,
			  taskitem: "Book Tickets for travel",
			  duedt: "2019/08/15",
			  Completed: true
			},
			{
			  id: 5,
			  taskitem: "New Year Party 2020",
			  duedt: "2019/12/30",
			  Completed: false
			}
		  ]
	})
})
// const mysql = require("mysql")

// const connection = mysql.createConnection({
// 	host: process.env.DB_HOST,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	database: "tasks"
// })
// app.get("/tasks", function(request, response){
//     connection.query("SELECT * FROM Task", function (err, data){
//         if(err){
//             response.status(500).json({
//                 error: err
                
//             })
//         } else {
//             response.status(200).json({
//                 tasks: data
//             });
//         }
//     })
// });

//put task

app.put("/tasks/:id", (request, response) => {

	const updatedTask = request.body;
	const id = request.params.id;

	connection.query("UPDATE Task SET Completed = ? taskitem = ? duedt = ?  userid = ? WHERE id = ?", [updatedTask.Completed, updatedTask.duedt, updatedTask.taskitem, updatedTask.userid, id],
		function (err) {
			if (err) {
				response.status(500).json({ error: err });
			} else {
				response.status(200).json({
					message: `Successfully updated task`
				});
			}
		})
});


app.post("/tasks/:id", (request, response) =>{
	const addedTask = request.body;

	connection.query("INSERT INTO Task SET ?", [addedTask], function (err) {
		if (err) {
			response.status(500).json({ error: err });
		} else {
			response.status(201).json({
				message: `Successfully added a task`
			})
		}
	})
});

//DELETE /tasks

app.delete("/tasks/:id", (request, response) => {
	const id = request.params.id;
	connection.query("DELETE FROM Task WHERE taskId = ?", [id], function (err) {
		if (err) {
			response.status(500).json({error: err});
		} else {
			response.status(200).json({
				message: "You issued a delete request"
			})
		}
	})
});




module.exports.tasks = serverlessHttp(app);