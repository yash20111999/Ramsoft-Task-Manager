import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { TaskCard, TaskDetail, TaskForm } from "./components";
import "./styles.scss";


export default function App() {
  const [board, setBoard] = useState([
    {
      id: "todo",
      name: "Todo",
      cards: [],
    },
    {
      id: "progress",
      name: "In Progress",
      cards: [],
    },
    {
      id: "done",
      name: "Done",
      cards: [],
    },
  ]);
  const task = {
    heading: "",
    desc: "",
    deadline: "",
    status: "todo",
    imageUrl: '',
    id: Date.now(),
  }
  const [newTask, setNewTask] = useState(task);
  const [openAddNewTask, setOpenAddNewTask] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [openViewTask, setOpenViewTask] = useState(false);
  const [viewTask, setViewTask] = useState({});

  useEffect(() => {
    const board = localStorage.getItem("data");
    if (board) {
      setBoard(JSON.parse(board));
    }
  }, []);

  //Handle Card CTA Edit and Delete

  const handleOnStatusChange = (value, prevValue, index) => {
    const updatedBoard = [...board];
    let taskCard;
    // Delete the previous
    updatedBoard?.forEach((section) => {
      if (section?.id === prevValue) {
        taskCard = section?.cards[parseInt(index)]
        section?.cards?.splice(parseInt(index), 1);
      }
    });

    // Add it to the new section
    updatedBoard?.forEach((section) => {
      if (section?.id === value) {
        section?.cards?.push({ ...taskCard, status: value });
      }
    });

    localStorage.setItem("data", JSON.stringify(updatedBoard));
    setBoard(updatedBoard);
    setOpenAddNewTask(false);
  };

  const handleDeleteTodoTask = (index) => {
    const updatedBoard = [...board];
    updatedBoard?.forEach((section) => {
      if (section?.id === "todo") {
        section?.cards?.splice(parseInt(index), 1);
      }
    });
    localStorage.setItem("data", JSON.stringify(updatedBoard));
    setBoard(updatedBoard);
    setOpenAddNewTask(false);
  };

  // Task View Function

  const handleViewTask = (task) => {
    setOpenViewTask(true);
    setViewTask(task);
  }


  //Hande drag and drop functionality

  const handleEditTodoTast = (index) => {
    setNewTask(board[0].cards[index]);
    setEdit(true);
    setEditIndex(index);
    setOpenAddNewTask(true);
  };

  const handleOnDragStart = (event, index) => {
    event.dataTransfer.setData("prevValue", event?.target?.parentElement?.id);
    event.dataTransfer.setData("index", index);
  };

  const handleOnDrop = (event) => {
    let dropTarget = event.target;
    while (dropTarget && !["progress", "todo", "done"].includes(dropTarget.id)) {
      dropTarget = dropTarget.parentNode;
    }
    if (dropTarget) {
      const value = dropTarget?.id;
      const prevValue = event.dataTransfer.getData("prevValue");
      const index = event.dataTransfer.getData("index");
      handleOnStatusChange(value, prevValue, index);
    }
  };

  const handleOnDragOver = (event) => {
    event.preventDefault();
  };

  // Form Handle Functions 

  const addNewTask = () => {
    const updatedBoard = [...board];
    if (!edit) {
      updatedBoard?.forEach((section) => {
        if (section?.id === "todo") {
          section?.cards?.push(newTask);
        }
      });
    } else {
      updatedBoard[0].cards[editIndex] = newTask;
      setEdit(false);
    }
    localStorage.setItem("data", JSON.stringify(updatedBoard));
    setBoard(updatedBoard);
    setOpenAddNewTask(false);
    setNewTask(task)
  };

  const handleCancel = () => {
    setNewTask(task);
    setOpenAddNewTask(false);
  };

  return (
    <div className="container">
      <header data-testid="header" className="header">
        Task Manager
      </header>
      <div className="board">
        {board?.map((section) => {
          return (
            <div
              onDrop={handleOnDrop}
              className="board__section"
              key={section.id}
            >
              {/* Tasks container */}
              <div
                id={section?.id}
                key={section?.id}
                onDragOver={handleOnDragOver}
                className="tasks-container"
              >
                <div className="heading" data-testid={section?.id}>{section.name}</div>
                {section?.cards?.map((task, index) => (
                  <div
                    className="card-container"
                    key={`${task.id}-${index}`}
                    draggable
                    onDragStart={(event) =>
                      handleOnDragStart(event, index)
                    }
                  >
                    <TaskCard
                      key={`${task.id}`}
                      index={index}
                      task={task}
                      onStatusChange={handleOnStatusChange}
                      onDeleteTask={handleDeleteTodoTask}
                      onEditTask={handleEditTodoTast}
                      onViewTask={() => handleViewTask(task)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <Button
          className="add-button"
          variant="contained"
          onClick={() => setOpenAddNewTask(true)}
        >
          Add Card
        </Button>
      </div>
      {/* Popup for new task */}

      <TaskForm
        open={openAddNewTask}
        addNewTask={addNewTask}
        handleCancel={handleCancel}
        newTask={newTask}
        setNewTask={setNewTask}
        edit={edit}
      />
      {/* Popup for Task Detail */}

      <TaskDetail
        open={openViewTask}
        viewTask={viewTask}
        onViewTask={setOpenViewTask}
      />
    </div>
  );
}
