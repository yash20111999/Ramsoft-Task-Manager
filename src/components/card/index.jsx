import { Button } from "@mui/base";
import React, { useState } from "react";
import { statusOptions } from "../../enum/statusOption";

import "./styles.scss";


const TaskCard = ({ task, onStatusChange, index, onDeleteTask, onEditTask, onViewTask }) => {
  
  const { heading, deadline, status } = task;
  const [statusValue, setStatusValue] = useState(status);
  const handleChange = (event) => {
    setStatusValue(event.target.value);
    onStatusChange(event.target.value, status, index);
  };

  return (
    <div className="card">
      <div className="card_detail">
        <p className="card_detail_text"><span className="card_detail_heading">Title : </span>{heading}</p>
        <p className="card_detail_text"><span className="card_detail_heading">Deadline : </span>{deadline}</p>
        <div className="card_detail_text">
          <span className="card_detail_heading">Select Status : </span>
          <select value={statusValue} onChange={handleChange} aria-label='selectstatus'>
            {statusOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="card_activity">
          {/* For View More Details */}
          <Button onClick={() => onViewTask(true)}>View More</Button>
          {/*Editing and Deleting Todo Task */}
          {status === 'todo' &&
            <>
              <Button onClick={() => onEditTask(index)}>Edit</Button>
              <Button onClick={() => onDeleteTask(index)}>Delete</Button>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
