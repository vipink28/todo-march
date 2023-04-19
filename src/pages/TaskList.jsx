import React from 'react';
import { useContext } from 'react';
import TodoContext from '../context/TodoContext';
import { Link } from 'react-router-dom';
import { dateFormat } from '../helper';
import Popup from '../components/Popup';

function TaskList(props) {
    const { allTasks } = useContext(TodoContext);
    return (
        <div className='container py-5'>
            <div className='bg-primary rounded-3 p-4'>
                <div className='mb-3 d-flex text-white'>
                    <h4>Task List</h4>
                    <Link className='btn btn-info ms-auto' to="/create-task">Create Task</Link>
                </div>
                <div className='mt-3'>
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
                                allTasks?.map((item)=>{
                                    return(
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>{dateFormat(item.dueDate)}</td>
                                            <td>
                                                <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal">
                                                    <i class="fa-solid fa-eye"></i>
                                                </span>
                                                <span className='px-2'data-bs-toggle="modal" data-bs-target="#task-modal">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                                </span>
                                                <span className='px-2'data-bs-toggle="modal" data-bs-target="#task-modal">
                                                <i class="fa-solid fa-trash"></i>
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
            <Popup />
        </div>
    );
}

export default TaskList;