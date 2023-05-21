/* eslint-disable default-case */
import React from "react";
import "./styles.scss";
import { Modal, Box, Button } from "@mui/material";

// MUI styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 5,
  px: 5,
  pb: 5,
};

const TaskForm = ({ open = false, newTask, setNewTask, addNewTask, handleCancel }) => {

  // Handle Change value in Every field
  const handleChange = (event) => {
    const field = event?.target?.name;

    switch (field) {
      case "heading":
        setNewTask((prevState) => {
          return {
            ...prevState,
            heading: event?.target?.value,
          };
        });
        break;

      case "desc":
        setNewTask((prevState) => {
          return {
            ...prevState,
            desc: event?.target?.value,
          };
        });
        break;

      case "deadline":
        setNewTask((prevState) => {
          return {
            ...prevState,
            deadline: event?.target?.value,
          };
        });
        break;

      case "status":
        setNewTask((prevState) => {
          return {
            ...prevState,
            status: event?.target?.value,
          };
        });
        break;

      case "image":

        if (event.target.files[0]) {
          const reader = new FileReader();

          reader.onloadend = () => {
            setNewTask((prevState) => {
              return {
                ...prevState,
                imageUrl: reader.result
              };
            });
          };

          reader.readAsDataURL(event.target.files[0]);
        } else {
          setNewTask((prevState) => {
            return {
              ...prevState,
              image: null,
            };
          });
        }
        break;

      default:
        return;
    }
  };


  const validation = () => {
    if ([newTask.deadline, newTask.desc, newTask.heading].includes('')) {
      return true;
    }
    return false;
  }

  return (
    <div>
      <Modal open={open} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={{ ...style, width: 600 }}>
          <div className="form__header">{newTask?.heading === ''?'Add New Task':'Edit Task'}</div>

          <form data-testid="task-form" className="form__container" onSubmit={addNewTask}>
            <div className="form__field">
              <label>Title</label>
              <input aria-label="heading" name="heading" value={newTask?.heading} onChange={handleChange} />
            </div>
            <div className="form__field">
              <label>Deadline</label>
              <input aria-label="deadline" name="deadline" value={newTask?.deadline} onChange={handleChange} />
            </div>
            <div className="form__field">
              <label>Description</label>
              <input aria-label="desc" name="desc" value={newTask?.desc} onChange={handleChange} />
            </div>
            <div >
              <input aria-label="image" name="image" type="file" accept="image/*" onChange={handleChange} />
              {newTask?.imageUrl && <img style={{ width: '100%' }} src={newTask?.imageUrl} alt="Preview" />}
            </div>
            <div className="form__activity">
              <Button color="secondary" type="submit" variant="contained" disabled={validation()}>
                Submit
              </Button>

              <Button className="cancel-button" variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default TaskForm;
