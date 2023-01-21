import React,{useState} from 'react'
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import axios from "axios"
import { Dropdown } from 'react-bootstrap'


const AddTask = ({getTask}) => {

  const [task,setTask]=useState("")
  const [description,setDescription]=useState("")
  const [priority,setPriority]=useState("")
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    const newTask={task,description,priority,is_done:false}
    setTask("")
    setDescription("")
    setPriority("")
    addNewTask(newTask)
  }

 const addNewTask=async(newTask)=>{
  const url="https://devanthony.pythonanywhere.com/todo/"
  try {
    await axios.post(url,newTask)
  }catch (error) { 
    console.log(error)
  }
  getTask();
 }



  return (
    <div>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task</Form.Label>
        <Form.Control type="text"
         placeholder="Enter task" 
         value={task} onChange={(e)=>setTask(e.target.value)}/>
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" 
         value={description}
        onChange={(e)=>setDescription(e.target.value)}/>
      </Form.Group>
      <Form.Label>Priority</Form.Label>
      <Form.Select aria-label="Default select example"  value={priority} onChange={(e)=>setPriority(e.target.value)}>
      <option>Open this select priority</option>
      <option value="1">High</option>
      <option value="2">Medium</option>
      <option value="3">Low</option>
    </Form.Select>
      {/* <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Priority</Form.Label>
        <Form.Control type="text" 
        onChange={(e)=>setPriority(e.target.value)}/>
      </Form.Group> */}
      
    <div className="text-center">
      <Button variant="primary w-50 " type="submit">
        SAVE
      </Button>
      </div>
    </Form>
    </div>
  )
}

export default AddTask