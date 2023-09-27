import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "./MyContext";

function Task() {
  const { id, setId } = useContext(MyContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setdueDate] = useState("");

  const handleTitle = (title) => {
    setTitle(title);
  };
  const handleDescription = (description) => {
    setDescription(description);
  };
  const handledueDate = (dueDate) => {
    setdueDate(dueDate);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/task/addtask/", {
        title: title,
        description: description,
        dueDate: dueDate,
        createdBy: id,
      });

      // Assuming the response contains a 'data' property with the added task details
      const addedTask = response.data;

      // Clear the input fields after the task is successfully added
      setTitle("");
      setDescription("");
      setdueDate("");

      // You can also do something with the added task, if needed
      console.log("Task added:", addedTask);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const [show, setShow] = useState([]);

  const handleDelete = async (id) => {
    console.log(id);
    console.log("delete icon clicked");
    await axios
      .delete("http://localhost:8080/task/deletetask/", { data: { id: id } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getDate(str) {
    str = JSON.stringify(str);
    return str.slice(1, 11);
  }

  useEffect(() => {
    try {
      // Use async/await to make the Axios GET request
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/task/getalltask",
            {
              params: { authId: id },
            }
          );

          // Assuming the response contains a 'data' property with the data you want
          const data = response.data;

          // Update the state with the fetched data
          setShow(data);
        } catch (error) {
          console.error("Error in axios call", error);
        }
      };

      fetchData();
    } catch (error) {
      console.error("Error in useEffect", error);
    }
  }, [handleDelete, title, id]);

  var i = 1;
  return (
    <>
      <form className="m-auto" style={{ maxWidth: 444 }}>
        <div className="form-group m-3">
          <label htmlFor="exampleInputTask">Task Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputTask"
            aria-describedby="taskHelp"
            autoComplete="off"
            placeholder="Enter Task"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div className="form-group m-3">
          <label htmlFor="Description">Description</label>
          <textarea
            className="form-control"
            id="Description"
            rows="3"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="form-group m-3">
          <label htmlFor="date">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            aria-describedby="taskHelp"
            autoComplete="off"
            placeholder="Enter Task"
            value={dueDate}
            onChange={(e) => {
              setdueDate(e.target.value);
            }}
          ></input>
        </div>
        <button
          type="submit"
          className="btn btn-primary m-3"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </form>
      <table className="container table table-striped pb-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Description</th>
            <th scope="col">Due Date</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {show.map((itemObj) => (
            <tr key={itemObj._id}>
              <th scope="row">{i++}</th>
              <td>{itemObj.title}</td>
              <td>{itemObj.description}</td>
              <td>{getDate(itemObj.dueDate)}</td>
              <td>
                <i
                  style={{ cursor: "pointer" }}
                  className="bi bi-trash3-fill"
                  onClick={() => handleDelete(itemObj._id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Task;
