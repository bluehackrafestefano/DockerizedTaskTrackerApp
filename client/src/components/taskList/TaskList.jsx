import React, { useEffect } from 'react'
import {RiDeleteBack2Fill} from "react-icons/ri"
import {BsFillEyeFill} from "react-icons/bs"
import axios from "axios";
import { Button, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';


const TaskList = ({task,getTask}) => {
  const [filterTask,setFilterTask]=useState([])
  const [priority,setPriority] = useState("")
  const [showFilter,setShowFilter] = useState(false)
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filterData = ()=>{
    if(priority !== ""){
      const newData = task.filter((item)=>item.priority === +priority)
      setFilterTask(newData)
    }else{
      setFilterTask(task)
    }
  }
  const deleteTask=async(id)=>{   
    const url="https://devanthony.pythonanywhere.com/todo"
    try {
      await axios.delete(`${url}/${id}/`);
    } catch (error) {
      
    }
    getTask();
  }
    const toggleTask=async(item)=>{   
      const url="https://devanthony.pythonanywhere.com/todo"
      try {
        const newData = {...item,is_done:!item.is_done}
        await axios.put(`${url}/${item.id}/`,newData);
      } catch (error) {
        
      }
      getTask();  
    }

    const handleModal = (item) => {
      setInfo(item);
      handleShow();
    }

    useEffect(()=>{
      setFilterTask(task);
    },[task])

    useEffect(()=>{
      filterData()
    },[priority])

  return (
    <div>
     <div className='m-2 d-flex'>
     <Button className='bg-dark' onClick={()=>setShowFilter(!showFilter)}>Filter</Button>
     {showFilter && (<Form.Select aria-label="Default select example" value={priority} onChange={(e)=>setPriority(e.target.value)}>
      <option value="">All</option>
      <option value="1">High</option>
      <option value="2">Medium</option>
      <option value="3">Low</option>
    </Form.Select>)}
     </div>
      {filterTask?.map((item)=>{
        const {id,task,created_date}=item;
        return(
          <div 
          key={id}
          onDoubleClick={()=>toggleTask(item)}
          className="mt-2 d-flex justify-content-between bg-secondary rounded-2 p-2" >
              {item.is_done ? (<div className='text-decoration-line-through' role="button">
              <h4>{task}</h4>
              <p>{new Date(created_date).toLocaleString()}</p>
              </div>):(<div role="button">
              <h4>{task}</h4>
              <p>{new Date(created_date).toLocaleString()}</p>
              </div>)}
              <div>
              <BsFillEyeFill
              onClick={()=>handleModal(item)}
              style={{
                cursor:"pointer",
                marginRight:"20px",
                fontSize:"2rem",
                boxShadow:"2px 2px 2px #ECAB9E"
              }}/>
              <RiDeleteBack2Fill
              onClick={()=>deleteTask(id)}
              style={{
                cursor:"pointer",
                marginRight:"20px",
                fontSize:"2rem",
                boxShadow:"2px 2px 2px #ECAB9E"
              }}/>
              </div>
              
          </div>
        )
      })}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task : {info.task}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <p>Description : {info.description}</p>
         <p>Is Done? : {info.is_done ? "Completed" : "Not completed"}</p>
          <p>Created Date : {new Date(info.created_date).toLocaleString()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TaskList
