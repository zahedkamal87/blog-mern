import React,{useState,useEffect} from 'react'
import './User.css'

const User = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getData = async ()=>{
      const response = await fetch('/api/sample')
      const jsonresponse = await response.json()
      setUsers(jsonresponse)
      console.log(jsonresponse)
    }
    getData()
  }, [])
  return (
    <div>
      <h2>Users</h2>
      <ul>
  {users.map(user=><li key={user.id}>{user.firstName}</li>)}
      </ul>
    </div>
  )
}

export default User
