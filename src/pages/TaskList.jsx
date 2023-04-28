import React, { useEffect, useReducer, useState } from 'react';
import { useContext } from 'react';
import TodoContext from '../context/TodoContext';
import { Link } from 'react-router-dom';
import { dateFormat } from '../helper';
import Popup from '../components/Popup';

function reducer(state, action){
    switch(action.type){
        case 'VIEW': return {type:'view', data: action.payload};
        case 'EDIT': return {type:'edit', data: action.payload};
        case 'DELETE': return {type: 'delete', data: action.payload};
        default: return state;
    }
}

function TaskList(props) {
    const { allTasks } = useContext(TodoContext);
    const [state, dispatch] = useReducer(reducer, {type:'', data: ''});
    const [searchText, setSearchText] = useState('');
    const [taskList, setTaskList]= useState([]);

    const onSearch=(e)=>{
        const { value } = e.target;
        setSearchText(value);
    }

    useEffect(()=>{
        const filteredArr = allTasks?.filter((task) => task.title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
        setTaskList(filteredArr);

    }, [searchText, allTasks])


    return (
        <div className='container py-5'>
            <div className='bg-primary rounded-3 p-4'>
                <div className='mb-3 d-flex text-white'>
                    <h4>Task List</h4>
                    <Link className='btn btn-info ms-auto' to="/create-task">Create Task</Link>
                </div>
                <div className='mt-3'>
                    <input type="text" className='form-control' onChange={onSearch}/>

                    <table className='table table-striped table-dark'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Due on</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                taskList?.map((item)=>{
                                    return(
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>{dateFormat(item.dueDate)}</td>
                                            <td>
                                                <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:'VIEW', payload: item})}}>
                                                    <i className="fa-solid fa-eye"></i>
                                                </span>
                                                <span className='px-2'data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:'EDIT', payload: item})}}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                                </span>
                                                <span className='px-2'data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:'DELETE', payload: item})}}>
                                                <i className="fa-solid fa-trash"></i>
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Popup type={state.type} data={state.data} />
        </div>
    );
}

export default TaskList;