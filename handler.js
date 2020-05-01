const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: "todos"
  });

app.get("/todos", function (request, response) {
	console.log("received request for get/todos");
	connection.query("SELECT * FROM Task", function (err, data) {
		if (err) {
			response.status(500).json({
				error: err

			})
		} else {
			response.status(200).json({
				todos: data
			});
		}
	})
});

//put task

app.put("/todos/:id", (request, response) => {

	const updatedTask = request.body;
	const id = request.params.id;

	connection.query("UPDATE Task SET Completed = ? taskitem = ? duedt = ?  userid = ? WHERE id = ?", [updatedTask, id],
		function (err) {
			if (err) {
				response.status(500).json({ error: err });
			} else {
				response.status(200).json({
					message: "Successfully updated task"
				});
			}
		})
});


app.post("/todos/:id", (request, response) => {
	const addedTask = request.body;

	connection.query("INSERT INTO Task SET ?", [addedTask], function (err) {
		if (err) {
			response.status(500).json({ error: err });
		} else {
			response.status(201).json({
				message: `Successfully added a task {id}`
			})
		}
	})
});

// //DELETE /tasks

app.delete("/todos/:id", (request, response) => {
	const id = request.params.id;
	connection.query("DELETE FROM Task WHERE id = ?", [id], function (err) {
		if (err) {
			response.status(500).json({ error: err });
		} else {
			response.status(200).json({
				message: "You issued a delete request"
			})
		}
	})
});



module.exports.app = serverlessHttp(app);
