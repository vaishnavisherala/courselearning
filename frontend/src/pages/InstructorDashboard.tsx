import React, {useState} from 'react';
import axios from 'axios';
export default function InstructorDashboard(){
  const [title,setTitle]=useState(''); const [desc,setDesc]=useState('');
  const create = async () => {
    await axios.post('/api/courses', { title, description: desc, shortDesc: desc.slice(0,120) });
    alert('Course created (refresh list)');
  }
  return <div>
    <h1>Instructor Dashboard</h1>
    <div className='card'>
      <input placeholder='Course title' value={title} onChange={e=>setTitle(e.target.value)}/><br/>
      <textarea placeholder='Description' value={desc} onChange={e=>setDesc(e.target.value)}/><br/>
      <button onClick={create}>Create Course</button>
    </div>
  </div>
}
