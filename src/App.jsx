import { useState, useEffect } from "react"
import axios from "axios"

export default function App() {
  const [friends, setFriends] = useState([])
  const [picture, setPicture] = useState('')
  const [name, setName] = useState('')

  async function getSavedFriends(){
    await axios.get('/api/friends')
    .then(response => {
      setFriends(response.data)
    })
  }
  useEffect(()=> {getSavedFriends()},[])

  const addFriend = () => {
    const newFriend = [...friends]
    newFriend.push({picture: picture, name: name})
    setFriends(newFriend)

    setName('')
    setPicture('')
  }

  const friendInfo = friends.map(p => {
    return (<div key={`${p.name}`}>
        <img width="100px" src={p.picture} key={p.picture}/>
        <span key={p.name}> {p.name} </span>
      </div>)
  })

  return (
  <div>
    <label htmlFor="picture" >Picture</label>
    <input id="picture" value={picture} onChange={(evt)=> setPicture(evt.target.value)}></input>

    <label htmlFor="name" >Name</label>
    <input id="name" value={name} onChange={evt=> setName(evt.target.value)} ></input>

    <button type="button" onClick={addFriend}>Add Friend</button>
    {friendInfo}
  </div>
  )
}
