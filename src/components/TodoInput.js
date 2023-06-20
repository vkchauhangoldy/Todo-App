import React, { useState } from 'react'
import classes from './Todo.module.css';
const TodoInput = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phone: ""
    })

    const [userDetails, setUserDetails] = useState([]);
    const [editclick, setEditClick] = useState(false);
    const [editIndex, setEditIndex] = useState();;

    const changeHandler = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (inputs.name.length && inputs.email.length && inputs.phone.length) {
            if (editclick) {
                const tempData = userDetails;
                Object.assign(tempData[editIndex], inputs);
                setUserDetails([...tempData]);
                setEditClick(false);
                setInputs({ name: "", email: "", phone: "" })
            } else {
                setUserDetails([...userDetails, inputs])
                setInputs({ name: "", email: "", phone: "" })
            }
        }
    }

    const DeleteHandler = (index) => {
        const deletedData = userDetails.filter((data, i) => i !== index)
        setUserDetails(deletedData);

    }

    const EditHandler = (index) => {
        const editData = userDetails[index];
        setInputs({ name: editData.name, email: editData.email, phone: editData.phone });
        setEditClick(true);
        setEditIndex(index);
    }
    return (
        <div className={classes.contanier}>
            <h1>Todo List</h1>
            <form onSubmit={submitHandler} className={classes.form}>
                <div className={classes['input-controls']}>
                    <label htmlFor='name'>Name: </label>
                    <input type="text" name='name' value={inputs.name} onChange={changeHandler} />
                </div>
                <div className={classes['input-controls']}>
                    <label htmlFor='email'>Email:</label>
                    <input type="email" name='email' value={inputs.email} onChange={changeHandler} />
                </div>
                <div className={classes['input-controls']}>
                    <label htmlFor='phone'>Phone:</label>
                    <input type="text" name='phone' value={inputs.phone} onChange={changeHandler} />
                </div>
                <button className={classes['action-controls']} type='submit'>{editclick ? "Update" : "Add"}</button>
            </form>
            <div className={classes.output}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDetails.map((detail, i) => (
                            <tr>
                                <td>{detail.name}</td>
                                <td>{detail.email}</td>
                                <td>{detail.phone}</td>
                                <td className={classes.action}>
                                    <button className={classes.editbtn} onClick={() => EditHandler(i)}>Edit</button>
                                    <button className={classes.deletebtn} onClick={() => DeleteHandler(i)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TodoInput;
