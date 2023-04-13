import { createContext, useEffect, useState } from  "react";
import { json, useNavigate } from "react-router-dom";

const TodoContext = createContext();

export const TodoProvider =({children})=>{
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);

    const [allTasks, setAllTasks] = useState();
    const [latestTask, setLatestTask] = useState();
    const [recentTask, setRecentTask] = useState();

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
      }else{
        setMessage("Something went wrong");
      }
    }


    // getTasks

    const getTasks = async()=>{
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


 


    useEffect(()=>{
      const localUser = localStorage.getItem('user');
      const currentUser = JSON.parse(localUser);
      setUser(currentUser); 
    }, [])

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
            recentTask
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContext;