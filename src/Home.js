import { useState, useEffect } from 'react';
import React, { Component } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Home.css';
import { Paper, Button, Dialog, DialogTitle, DialogContent, Input, Select, MenuItem} from "@mui/material"
import {uuid} from "uuidv4"

const Home = () => {

    //set up all the variables needed for the task app to run
    const [taskMenuOpen, setTaskMenuOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("All")
    const [date, setDate] = useState(new Date());
    const onChange = (date) => setDate(date);
    const [priority, setPriority] = useState("Medium")
    const [tasks, setTasks] = useState([]);
    const currTasks = JSON.parse(localStorage.getItem("tasks"))
    const [filter, setFilter] = useState("All")
    const dateString = date.toLocaleDateString("en-US")

    //Update the task app list 
    useEffect(() => {
        if(currTasks === null) {
            setTasks([])
        }
        else {
            setTasks(currTasks)
        }
        console.log(tasks)
    }, []);

    //When submit button is clicked, add the task present in the pop up to the task list
    const addTask = () => {
        const id = uuid()
        const taskData = {Title: title, Category: category, Date: date.toLocaleDateString("en-US"), inDate: date,Priority: priority, id: id}
        setTasks([...tasks, taskData])
        localStorage.setItem("tasks", JSON.stringify([...tasks, taskData]))
        setTitle("")
        setCategory("")
        setDate("")
        setTaskMenuOpen(false)
        window.location.reload(false); 
    }

    //When the delete button is clickedk, remove the task that the button is connected to from the task list
    const deleteTask = (id) => {
        const newTasks = tasks.filter(tasks=>tasks.id!==id);
        setTasks(newTasks);
    }
 
    //set up the items listed in the dropdown menu. The catergories and priorities listed for adding a task as well as the filters listed
    const categories = ["All","Math", "Science", "History", "Events"]
    const priorities = ["Low", "Medium", "High"]
    const filters = ["All","Math", "Science", "History", "Events","Low Priority", "Medium Priority", "High Priority"]
    
    //Output the page
    return(

    <div className = "home">
            {/*Add the add task button*/}
            <Button onClick={() => setTaskMenuOpen(true)}>Add Task</Button>
            <h2>Date</h2>
            <div style={{width: "348px", margin: "10px auto"}}>
            {/*Add the Calendar Filter to the page */}
            <Calendar onChange={onChange} value={date} />
           <h2>Calendar Filter:</h2>
           {/*List the tasks that are currently selected by the calendar filter*/}
           {tasks && tasks.map((task) => (
            <div>
                {/*Check if the date selected on the calendar is equal to the date on the calendar. If so add the task to the list*/}
                {task.Date === dateString ?(
                    <div className = "Calendar Tasks" key={task.id}>
                    <Paper className="task-listing" key={task.id}style={{maxWidth: "400px", margin: "10px auto", padding: "10px", borderRadius: "10px"}} elevation={4}>
                        <h2>{task.Title}</h2>
                        <p>Subject: {task.Category}</p>
                        <p>Date: {task.Date.toString().slice(0, 10)}</p>
                        <p>Priority: {task.Priority}</p>
                        <Button onClick={ () => deleteTask(task.id)}>Complete</Button>
                        <Button onClick={() => {setTaskMenuOpen(true); setTitle(task.Title); setCategory(task.Category);setPriority(task.Priority); deleteTask(task.id)}    }>Edit</Button>   
                    </Paper>
                    </div>
                ) : (
                    console.log("")
                    
                )}

            </div>
           ))
                }
                           
<br></br>
            <h2>Other Filters:</h2>
            {/*Set up the filter dropdown list for class (category) and priority */}
                <Paper  style={{maxWidth: "400px", margin: "10px auto", padding: "10px", borderRadius: "10px"}} elevation={4}>
                    <p>Filter:</p>
                    <Select
                        fullWidth
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        
                        placeholder="Filter"
                        style={{marginBottom: "10px"}}
                    >
                        
                        {filters.map((filter) => (
                            <MenuItem value={filter}>{filter}</MenuItem>
                        ))}
                    </Select>
                </Paper>
            </div>   

            {/*When the add task button is clicked open the add task pop-up menu  */}
            <Dialog open={taskMenuOpen} onClose={() => setTaskMenuOpen(false)} style={{padding: "20px"}}>
                <DialogTitle>Task</DialogTitle>
                <DialogContent>
                    {/*Text box for inputting a title */}
                    <Input 
                        fullWidth 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Title"
                        style={{marginBottom: "10px"}} 
                        
                    />
                    {/*Dropdown menu to select the class */}
                    <Select
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category"
                        style={{marginBottom: "10px"}}
                    >
                        
                        {categories.map((category) => (
                            <MenuItem value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                    {/*Dropdown menu to select the priority */}
                    <Select
                        fullWidth
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        placeholder="Priority"
                        style={{marginBottom: "10px"}}
                    >
                        
                        {priorities.map((priority) => (
                            <MenuItem value={priority}>{priority}</MenuItem>
                        ))}
                    </Select>
                    {/*Calendar to select the date of the task */}
                    <Calendar onChange={onChange} value={date} />
                    {/*Button to submit the task to be added */}
                    <Button onClick={addTask} variant="contained" style={{textTransform: "none"}}>Submit</Button>
                </DialogContent>
            </Dialog>


{/*Filter the task based on the option selected in the filter dropdown menu. Each filter is for a different option in the filter dropdown */}
{filter === 'All' ? (
              tasks.map((task) => (
                <Paper className="task-listing" key={task.id}style={{maxWidth: "400px", margin: "10px auto", padding: "10px", borderRadius: "10px"}} elevation={4}>
                    <h2>{task.Title}</h2>
                    <p>Subject: {task.Category}</p>
                    <p>Date: {task.Date.toString().slice(0, 10)}</p>
                    <p>Priority: {task.Priority}</p>
                    <Button onClick={ () => deleteTask(task.id)}>Complete</Button>
                    <Button onClick={(e) => {setTaskMenuOpen(true); setTitle(task.Title); setCategory(task.Category);setPriority(task.Priority); deleteTask(task.id)}}>Edit</Button>
                    
                </Paper>
            ))
          ) : (
            (filter) ===  'Low Priority' ? (
              tasks.map((task) => (
                    
                <div>
                  {task.Priority === 'Low' ?( 
                    <Paper className="task-listing" key={task.id}style={{maxWidth: "400px", margin: "10px auto", padding: "10px", borderRadius: "10px"}} elevation={4}>
                    <h2>{task.Title}</h2>
                    <p>Subject: {task.Category}</p>
                    <p>Date: {task.Date.toString().slice(0, 10)}</p>
                    <p>Priority: {task.Priority}</p>
                    <Button onClick={ () => deleteTask(task.id)}>Complete</Button>
                    <Button onClick={() => {setTaskMenuOpen(true); setTitle(task.Title); setCategory(task.Category);setPriority(task.Priority); deleteTask(task.id)}}>Edit</Button>
                    </Paper>             
                ):(
                    console.log("error")
                )}
                </div>
                ))
            ) : (
                (filter) ===  'Medium Priority' ? (
                    tasks.map((task) => (
                      <div>
                        {task.Priority === 'Medium' ?( 
                          <Paper className="task-listing" key={task.id}style={{maxWidth: "400px", margin: "10px auto", padding: "10px", borderRadius: "10px"}} elevation={4}>
                          <h2>{task.Title}</h2>
                          <p>Subject: {task.Category}</p>
                          <p>Date: {task.Date.toString().slice(0, 10)}</p>
                          <p>Priority: {task.Priority}</p>
                          <Button onClick={ () => deleteTask(task.id)}>Complete</Button>
                          <Button onClick={() => {setTaskMenuOpen(true); setTitle(task.Title); setCategory(task.Category);setPriority(task.Priority); deleteTask(task.id)}}>Edit</Button>
                          </Paper>             
                      ):(
                          console.log("error")
                      )}
                      </div>
                      ))
                  ) : (
                    (filter) ===  'High Priority' ? (
                        tasks.map((task) => (
                          <div>
                            {task.Priority === 'High' ?( 
                              <Paper className="task-listing" key={task.id}style={{maxWidth: "400px", margin: "10px auto", padding: "10px", borderRadius: "10px"}} elevation={4}>
                              <h2>{task.Title}</h2>
                              <p>Subject: {task.Category}</p>
                              <p>Date: {task.Date.toString().slice(0, 10)}</p>
                              <p>Priority: {task.Priority}</p>
                              <Button onClick={ () => deleteTask(task.id)}>Complete</Button>
                              <Button onClick={() => {setTaskMenuOpen(true); setTitle(task.Title); setCategory(task.Category);setPriority(task.Priority); deleteTask(task.id)}}>Edit</Button>
                              </Paper>             
                          ):(
                              console.log("error")
                          )}
                          </div>
                          ))
                      ) : (
                        (filter) ===  'Math' ? (
                            tasks.map((task) => (
                              <div>
                                {task.Category === 'Math' ?( 
                                  <Paper className="task-listing" key={task.id}style={{maxWidth: "400px", margin: "10px auto", padding: "10px", borderRadius: "10px"}} elevation={4}>
                                  <h2>{task.Title}</h2>
                                  <p>Subject: {task.Category}</p>
                                  <p>Date: {task.Date.toString().slice(0, 10)}</p>
                                  <p>Priority: {task.Priority}</p>
                                  <Button onClick={ () => deleteTask(task.id)}>Complete</Button>
                                  <Button onClick={() => {setTaskMenuOpen(true); setTitle(task.Title); setCategory(task.Category);setPriority(task.Priority); deleteTask(task.id)}}>Edit</Button>
                                  </Paper>             
                              ):(
                                  console.log("error")
                              )}
                              </div>
                              ))
                          ) : (
                            (filter) ===  'Science' ? (
                                tasks.map((task) => (
                                  <div>
                                    {task.Category === 'Science' ?( 
                                      <Paper className="task-listing" key={task.id}style={{maxWidth: "400px", margin: "10px auto", padding: "10px", borderRadius: "10px"}} elevation={4}>
                                      <h2>{task.Title}</h2>
                                      <p>Subject: {task.Category}</p>
                                      <p>Date: {task.Date.toString().slice(0, 10)}</p>
                                      <p>Priority: {task.Priority}</p>
                                      <Button onClick={ () => deleteTask(task.id)}>Complete</Button>
                                      <Button onClick={() => {setTaskMenuOpen(true); setTitle(task.Title); setCategory(task.Category);setPriority(task.Priority); deleteTask(task.id)}}>Edit</Button>
                                      </Paper>             
                                  ):(
                                      console.log("error")
                                  )}
                                  </div>
                                  ))
                              ) : (
                                (filter) ===  'History' ? (
                                    tasks.map((task) => (
                                      <div>
                                        {task.Category === 'History' ?( 
                                          <Paper className="task-listing" key={task.id}style={{maxWidth: "400px", margin: "10px auto", padding: "10px", borderRadius: "10px"}} elevation={4}>
                                          <h2>{task.Title}</h2>
                                          <p>Subject: {task.Category}</p>
                                          <p>Date: {task.Date.toString().slice(0, 10)}</p>
                                          <p>Priority: {task.Priority}</p>
                                          <Button onClick={ () => deleteTask(task.id)}>Complete</Button>
                                          <Button onClick={() => {setTaskMenuOpen(true); setTitle(task.Title); setCategory(task.Category);setPriority(task.Priority); deleteTask(task.id)}}>Edit</Button>
                                          </Paper>             
                                      ):(
                                          console.log("error")
                                      )}
                                      </div>
                                      ))
                                  ) : (
                                    (filter) ===  'Events' ? (
                                        tasks.map((task) => (
                                          <div>
                                            {task.Category === 'Events' ?( 
                                              <Paper className="task-listing" key={task.id}style={{maxWidth: "400px", margin: "10px auto", padding: "10px", borderRadius: "10px"}} elevation={4}>
                                              <h2>{task.Title}</h2>
                                              <p>Subject: {task.Category}</p>
                                              <p>Date: {task.Date.toString().slice(0, 10)}</p>
                                              <p>Priority: {task.Priority}</p>
                                              <Button onClick={ () => deleteTask(task.id)}>Complete</Button>
                                              <Button onClick={() => {setTaskMenuOpen(true); setTitle(task.Title); setCategory(task.Category);setPriority(task.Priority); deleteTask(task.id)}}>Edit</Button>
                                              </Paper>             
                                          ):(
                                              console.log("error")
                                          )}
                                          </div>
                                          ))
                                      ) : (
                              
                console.log("error")
            ))))))))
          
                
              
                }

        </div>
    )
}

export default Home;