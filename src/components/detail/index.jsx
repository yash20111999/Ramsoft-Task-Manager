import React from 'react';
import { Modal, Box, Button } from "@mui/material";
import "./styles.scss";


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

const TaskDetail = ({ open = false,viewTask, onViewTask }) => {
  const { heading, desc, deadline, status, imageUrl} = viewTask;

  return (
    <Modal open={open} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
      <Box sx={{ ...style, width: 800 }}>
        <div className="card"  >
          <div className="card_detail">
            <p className="card_detail_text"><span className="card_detail_heading">Title : </span>{heading}</p>
            <p className="card_detail_text"><span className="card_detail_heading">Deadline : </span>{deadline}</p>
            <p className="card_detail_text"><span className="card_detail_heading">Description : </span>{desc}</p>
            <p className="card_detail_text"><span className="card_detail_heading">Status : </span>{status}</p>
            <div className='card_detail_image'>
              {imageUrl && <img style={{ width: '100%' }} src={imageUrl} alt="Preview" />}
            </div>
            {/*Close Full detail View */}
            <Button className="cancel-button" variant="contained" type="button" onClick={()=>onViewTask(false)}>Close</Button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default TaskDetail;