import { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [users, setUsers] = useState([])

  // 2 get data from server
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error))
  }, [])

  // get data from input field
  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email } // destructure, convert object
    console.log(name, email, user)

    // 3 send data to server
    fetch('http://localhost:5000/users',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user) // destructured user object
    })
      .then(res => res.json())
      .then(data => {
        console.log('post to server', data);
        // 5 updata new user instant on client side
        const newUser = [...users, data];
        setUsers(newUser)
        form.reset();

      })
  }

  return (
    <>
      <h1>User Management Server-Client</h1>
      <h3>Total Users: {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <input type="email" name="email" id="" />
        <input type="submit" value="Add User" id="" />
      </form>
      {
        // 2. display data from server
        users.map(user => <p
          key={user.id}>
          {user.id} : {user.name} : {user.email}
        </p>)
      }
    </>
  )
}

export default App
