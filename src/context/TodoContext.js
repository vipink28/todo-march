import { createContext, useEffect, useState } from  "react";
import { json, useNavigate } from "react-router-dom";

const TodoContext = createContext();

export const TodoProvider =({children})=>{
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);

    const [allTasks, setAllTasks] = useState();
    const [latestTask, setLatestTask] = useState();
    const [recentTask, setRecentTask] = useState([]);

    const navigate = useNavigate();


    //register new user
    const registerUser = async(formData)=>{
        const obj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          };
          const checkUser = await fetch(
            `http://localhost:5000/users?email=${formData.email}`,
            { method: "GET" }
          );
          const user = await checkUser.json();
          if (user.length > 0) {
            setMessage("user already exist");
          } else {
            const response = await fetch(`http://localhost:5000/users`, obj);            
            const currentUser = await response.json();
            if (response.ok) {              
              setMessage("User Regsitered");
              localStorage.setItem("user", JSON.stringify(currentUser));
              setUser({
                username: currentUser.username,
                id: currentUser.id,
                email: currentUser.email
              })
              setTimeout(()=>{
                navigate('/task-list');  
              }, 3000)
              
            } else {
              setMessage("something went wrong");
            }
          }
    }

    //login user
    const loginUser = async(formData)=>{
        const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`, {method: "GET"});
        if(response.ok){
            const checkUser =await response.json();
            if(checkUser.length > 0){
                setMessage("Logged in successfully");
                localStorage.setItem("user", JSON.stringify(checkUser[0]));
              setUser({
                username: checkUser[0].username,
                id: checkUser[0].id,
                email: checkUser[0].email
              })
              setTimeout(()=>{
                navigate('/task-list');  
              }, 3000)
            }
            else{
                setMessage("Email/Password mismatch");
            }
        }
        else{
            setMessage("Please try again");
        }
    }

    // create Task function
    const createTask = async(formData)=>{
      const obj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }

      const response = await fetch(`http://localhost:5000/tasks`, obj);
      if(response.ok){
        setMessage("Task created successfully");
        getTasks();
      }else{
        setMessage("Something went wrong");
      }
    }

    // update task

    const updateTask = async(formData)=>{
      const obj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }

      const response = await fetch(`http://localhost:5000/tasks/${formData.id}`, obj);
      if(response.ok){
        setMessage("Task Updated successfully");
        getTasks();
      }else{
        setMessage("Something went wrong");
      }
    }


    // getTasks

    const getTasks = async()=>{
      console.log("getTask executed");
      const response =await fetch(`http://localhost:5000/tasks?userId=${user.id}`, {method: "GET"})
      if(response.ok){
        const tasks = await response.json();
        setAllTasks(tasks);
        const latest = tasks[tasks.length-1];
        setLatestTask(latest);
        const recent = tasks.slice(-3);
        setRecentTask(recent);
      }
    }

    const deleteTask = async(id)=>{
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'});
      if(response.ok){
        setMessage("Task deleted successfully");
      }else{
        setMessage("something went wrong");
      }
    }

 


    useEffect(()=>{
      const localUser = localStorage.getItem('user');
      const currentUser = JSON.parse(localUser);
      if(currentUser){
        setUser(currentUser); 
      }
    }, [])

    // {
    //   username: checkUser[0].username,
    //   id: checkUser[0].id,
    //   email: checkUser[0].email,
    //  isLoggedIn
    // }

    useEffect(()=>{
      if(user != null){
        getTasks();
      }      
    }, [user])



    return(
        <TodoContext.Provider value={{
            message,
            setMessage,
            registerUser,
            loginUser,
            user,
            setUser,
            createTask,
            allTasks,
            latestTask,
            recentTask,
            updateTask,
            deleteTask
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContext;