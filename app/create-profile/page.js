"use client"
import {useState} from 'react'
import {createProfile,updateUserProfile} from '../core/profileLogic';
export default function ProfilePage(){
  const [name,setName] = useState("");
  const [age,setAge] = useState(10);
  const [phone, setPhone] = useState("");
  return <div className='flex flex-col'>
    Create Profile page <br />
    <input id="name" placeholder="Name"
     onChange={(event)=> setName(event.target.value)}/> <br />
    <input id="age" placeholder="Age" 
    onChange={(event)=> setAge(event.target.value)}/> <br />
     <input id="phone" placeholder="phone"
    onChange={(event)=> setPhone(event.target.value)}/> <br />
    <button type="button" className='bg-red-300'
     onClick={async(event)=> {
      createProfile(name,age,phone)
     }}
    >Create Profile</button>

        <button type="button" className='bg-red-300'
     onClick={async(event)=> {
        updateUserProfile(name,age,phone)
     }}
    >Update Profile</button>
  </div>
}