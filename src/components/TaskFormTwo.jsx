import React, { useContext, useEffect, useState } from "react";
import TodoContext from "../context/TodoContext";

function TaskFormTwo(props) {
  const init = {
    title: "",
    description: "",
    dueDate: "",
  };
  const { isUpdate, data, changeUpdate } = props;
  const [formData, setFormData] = useState(init);
  const { createTask, user, updateTask } = useContext(TodoContext);

  useEffect(()=>{   
    if(isUpdate){
        setFormData(data);
    }
  }, [data, isUpdate])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      userId: user?.id,
    createdOn: new Date()
    }));
  };

  const onCreateTask = (e) => {
    e.preventDefault();
    createTask(formData);
  };

  const onUpdateTask = (e) => {
    e.preventDefault();
    updateTask(formData);
  };

  const onCancel = (e) => {
    e.preventDefault();
    changeUpdate();
    setFormData(init);
  };

  return (
    <div className="p-3 w-75">
        <h3 className="text-white">{isUpdate ? "Update Task": "Create Task"}</h3>
      <div className="card bg-white">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                onChange={handleChange}
                value={formData?.title}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="6"
                name="description"
                onChange={handleChange}
                value={formData?.description}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Due Date</label>
              <input
                className="form-control"
                type="datetime-local"
                name="dueDate"
                onChange={handleChange}
                value={formData?.dueDate}
              />
            </div>
            {
            !isUpdate ?
            <button className="btn btn-primary" onClick={onCreateTask}>
              Create Task
            </button> : <>
            <button className="btn btn-primary me-2" onClick={onUpdateTask}>Update Task</button>
            <button className="btn btn-warning" onClick={onCancel}>Cancel</button>
            </>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskFormTwo;
