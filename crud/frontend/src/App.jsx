import {useEffect, useState} from "react";
import "./App.css";

function App(){
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] =useState("");
    const [age, setAge] = useState("");
    const [editId, setEditId] = useState(null)

    const getUsers = async () =>{
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUsers(data);
    
    }
    const addUser = async () => {
        await fetch("http://localhost:3000/users", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, age, email}),
        })
        getUsers();
        setName("");
        setEmail("");
        setAge("");
    }

    const UpdateUser = async () => {
        await fetch(`http://localhost:3000/users/${editId}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, age, email}),
        })
        getUsers();
        setName("");
        setEmail("");
        setAge("");
        setEditId(null);
    }

    const deleteUser = async (id) => {
        await fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        getUsers();
        setName("");
        setEmail("");
        setAge("");
        setEditId(null);
    }

    const editUser = (user)=>{
        setName(user.name);
        setEmail(user.email);
        setAge(user.age);

        setEditId(user._id);

    }

    useEffect(()=>{
        getUsers();
    }, []);

    return (
        <div>
            <h1>Crud</h1>
            <form >
                <input type="text" placeholder="name" value={name} onChange={(e) =>setName(e.target.value)} />
                <input type="text" placeholder="email" value={email} onChange={(e) =>setEmail(e.target.value)} />
                <input type="text" placeholder="25" value={age} onChange={(e) =>setAge(e.target.value)} />
                <button type="submit" onClick={editId ? UpdateUser : addUser}>{editId ? "Update User" : "Add User"}</button>
            </form>
        {
            users.map((user)=>(
                <div key={user._id}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.age}</p>
                    <button onClick={()=> {editUser(user)}}>Edit</button>
                    <button onClick={()=> {deleteUser(user._id)}}>Delete</button>

                </div>
            ))
        }

    </div>
    );

}

export default App;