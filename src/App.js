/* eslint-disable no-undef */
import logo from './logo.svg';
import './App.css';
import { EmployeeData } from './EmployeeData';
import { useEffect, useState } from 'react';



function App() {

const[data,setData]=useState([]);
const[firstName, setFirstName] =useState('');
const[lastName, setLastName] =useState('');
const[age, setAge] =useState(0);
const[id, setId] =useState(0);
const [isUpdate, setIsUpdate ]=useState(false);

useEffect(()=>{setData(EmployeeData)},[]);

//methods for handle edit ------------------------------------------------------------------------------------>

const handleEdit =(id)=>{
 const dt = data.filter(item => item.id === id);
 if(dt !== undefined){
  setIsUpdate(true);
  setId(id);
  setFirstName(dt[0].firstName);
  setLastName(dt[0].lastName);
  setAge(dt[0].age);
  
 }
}
//methods for handle delete ------------------------------------------------------------------------------------>

const handleDelete =(id)=>{


  if(id > 0){
    if(window.confirm("Are you sure delete this item ?")){

      const dt = data.filter(item=> item.id !== id );
      setData(dt);
    }
  }
}


//methods for handle Update -------------------------------------------------------------------------------------------------------

const handleUpdate =()=>{
 const index =data.map((item)=>{
  return item.id
 }).indexOf(id);


const dt =[...data];
dt[index].firstName =firstName;
dt[index].lastName =lastName;
dt[index].age= age;


setData(dt);
handleClear();
}




//methods for handle Save-------------------------------------------------------------------------------------------------------


const handleSave =(e)=>{
  //e.preventDefault();
 const dt =[...data];
 const newObject ={
  id:EmployeeData.length + 1,
  firstName:firstName,
  lastName:lastName,
  age:age
 }


 dt.push(newObject);
 setData(dt);

}

//methods for handle clear-------------------------------------------------------------------------------------------------------

const handleClear =(id)=>{
  setId (0);
  setFirstName("");
  setLastName("");
  setAge("");
  setIsUpdate(false)
}

//-------------------------------------------------------------------------------------------------------
  return (
    <div className="App">

<div style={{display: 'flex' , justifyContent:'center', marginTop:"10px", marginBottom:"10px"}}>


  <div>
<label>
FirstName : 
<input type='text' placeholder='Enter your FirstName' onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
</label>
</div>

<div>
<label>
LastName: 
<input type='text' placeholder='Enter your LastName' onChange={(e)=>setLastName(e.target.value)}  value={lastName}/>
</label>
</div>

<div>
<label>
Age : 
<input type='text' placeholder='Enter your Age' onChange={(e)=>setAge(e.target.value)}    value={age}/>
</label>
</div>

<div>
{
  !isUpdate ?
  <button className=' btn btn-primary'  onClick={(e) =>{handleSave()}}>Save</button>
:
<button className=' btn btn-primary'  onClick={() =>{handleUpdate()}}>Update</button>

}


<button className='btn btn-danger'  onClick={() =>{handleClear()}}>Clear</button>&nbsp;
</div>

</div>
      <table className='table table-hover' color='black'>
<thead>
  <tr>
  <td>Sr.No</td>
    <td>Id</td>
    <td>First Name</td>
    <td>Last Name</td>
    <td>Age</td>
    <td>Actions</td>
  </tr>
</thead>
<tbody>
  {data.map((item, index)=>{ return (
    <tr key ={index}>
 <td>{index+1}</td>
  <td>{item.id}</td>
  <td>{item.firstName}</td>
  <td>{item.lastName}</td>
  <td>{item.age}</td>
<td>
<button className=' btn btn-primary'  onClick={(e) =>{handleEdit(item.id)}}>Edit</button>&nbsp;
<button className='btn btn-danger'  onClick={(e) =>{handleDelete(item.id)}}>Delete</button>&nbsp;
</td>

    </tr>
)
  })}
</tbody>



      </table>
    </div>
  );
}

export default App;
