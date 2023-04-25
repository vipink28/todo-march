import React, { useContext, useRef, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TodoContext from '../context/TodoContext';
import { dateFormat } from '../helper';
import TaskFormTwo from '../components/TaskFormTwo';

function CreateTask(props) {
    const { latestTask, recentTask } = useContext(TodoContext);
   const [isUpdate, setIsUpdate]=useState(false);


    const onEdit = ()=>{
        setIsUpdate(true);
    }

    const changeUpdate = ()=>{
        setIsUpdate(false);
    }

    return (
        <div className='container-fluid h-100'>
            <div className='row h-100'>
                <div className='col-lg-6 bg-primary d-flex flex-column align-items-center justify-content-center h-100'>
                 <TaskFormTwo isUpdate={isUpdate} data={latestTask} changeUpdate={changeUpdate}/>
                </div>
                <div className='col-lg-6 h-100 d-flex flex-column justify-content-center align-items-center'>
                   <div className='card w-75'>
                        <div className='card-header d-flex'>
                            <h5>New Task</h5>
                            <button className='btn btn-info ms-auto' onClick={onEdit}>Edit</button>
                        </div>
                        <div className="card-body">
                            <h6>{latestTask?.title}</h6>
                            <p>{latestTask?.description}</p>
                        </div>
                        <div className="card-footer d-flex">
                            <p>Created On: {dateFormat(latestTask?.createdOn)}</p>
                            <p className='ms-auto'>Due On: {dateFormat(latestTask?.dueDate)}</p>
                        </div>
                   </div>

                   <div className="card mt-5 w-75">
                        <h3>Recent Tasks</h3>
                        <div className="card-body">
                            {
                                recentTask.map((item)=>{
                                    return(
                                        <div key={item.id} className='d-flex py-2 border'>
                                            <p>{item.title}</p>
                                            <p className='ms-auto'>{dateFormat(item.dueDate)}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                   </div>

                </div>
            </div>
        </div>
    );
}

export default CreateTask;