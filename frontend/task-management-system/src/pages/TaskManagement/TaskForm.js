import React, { useState } from 'react';
import './TaskManagement.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function TaskForm({isOpen, task, onClose, onSave}) {

  const [input, setInput] = useState({
    title: task ? task.title : '',
    description: task ? task.description : '',
isCompleted: task ? task.isCompleted : false,
    createdAt: task ? task.createdAt : ''
  });

  if (isOpen == false) {
    return null;
  }
  
  const validationSchema = () => Yup.object({
    title: Yup.string()
      .required('Title is required.'),
  });
  
  const onSubmit = (values, { setSubmitting, resetForm }) => {
      setInput(values);
      setSubmitting(true);
      onSave(values);
  };

  return (
    <div className="dialog modal-overlay">
        <div className="mat-dialog-content modal-content">
        <h3 className="mat-dialog-title">Task Entry</h3>
            <Formik initialValues={input} validationSchema={validationSchema} onSubmit={onSubmit} >
                {({ isSubmitting }) => (
                <Form>

                    <div className="mat-form-field">
                        <div className="mat-label">Title</div>
                        <div>
                            <Field type="text" name="title" className="form-control" />
                            <ErrorMessage name="title" component="div" className='error' />
                        </div>
                    </div>

                    <div className="mat-form-field">
                        <div className="mat-label">Description</div>
                        <div>
                            <Field type="text" name="description" className="form-control" />
                            <ErrorMessage name="description" component="div" className='error' />
                        </div>
                    </div>                    

                    <div className="mat-form-field">
                        <div className="mat-label">Created At</div>
                        <div>
                            <Field type="text" className="matInput" name="createdAt" disabled value=
                                { task ? new Date(task.CreatedAt).toLocaleDateString() : new Date().toLocaleDateString() }/>
                        </div>
                    </div>

                    <div className="search-actions">
                        <button type="submit" disabled={isSubmitting} className="action-btn">Save</button>
                        <button type='button' className="action-btn" onClick={onClose}>Close</button>
                    </div>
                </Form>
                )}</Formik>
        </div>
    </div>
  );
}

export default TaskForm;
