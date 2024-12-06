import './App.css';
import { useEffect, useState } from "react"
import Axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const notification = withReactContent(Swal)

function App() {

  const [formData, setFormData] = useState({
    name:"",
    age: "",
    country:"",
    charge:"",
    agesOnCharge: "",
    id: "",
    edit: false
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [employeesList, setEmpleados] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const addData = async () =>{
    try {
      const response = await Axios.post("http://localhost:3001/create",formData)

      console.log(response.data)
      getData()
      cleanFields()
      notification.fire({
        title: <strong>Registered employee</strong>,
        html: <i>The employee {formData.name} was registered successfully</i>,
        icon: 'success'
      })
    } catch(error){
      console.error('Error registering employee:', error)
      alert('Failed to register employee. Please try again')
    }
  }

  const getData = async () =>{
    try {
      const response = await Axios.get("http://localhost:3001/employees")
      setEmpleados(response.data)
    } catch(error){
      console.error('Error fetching employees:', error)
      alert('Failed to fetch employees. Please try again')
    }
  }

  const editData = async (val) => {
    try {
      setFormData({
        name: val.name,
        age: val.age,
        country: val.country,
        charge: val.charge,
        agesOnCharge: val.agesOnCharge,
        id: val.id,
        edit: true
      })
  
      const response = await Axios.put("http://localhost:3001/update", {
        name: formData.name,
        age: formData.age,
        country: formData.country,
        charge: formData.charge,
        agesOnCharge: formData.agesOnCharge
      })
  
      getData()
      console.log(response.data)
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee. Please try again.");
    }
  }

  const update = async () =>{
    try {
      const response = await Axios.put("http://localhost:3001/update",formData)

      getData()
      cleanFields()
      console.log(response.data)
      notification.fire({
        title: <strong>Updated employee</strong>,
        html: <i>The employee {formData.name} was updated successfully</i>,
        icon: 'success'
      })
    } catch(error){
      console.error('Error registering employee:', error)
      alert('Failed to register employee. Please try again')
    }
  }

  const deleteData = async (val) => {
    try {
      const confirmation = await notification.fire({
        title: <strong>Delete Employee</strong>,
        html: <i>Are you sure you want to delete {val.name}?</i>,
        confirmButtonText:'Yes',
        confirmButtonColor:'red',
        cancelButtonText:'No',
        cancelButtonColor:'green',
        showCancelButton:'true',
        icon: 'warning',
      })
  
      if (confirmation.isConfirmed) {
        const response = await Axios.delete(`http://localhost:3001/delete/${val.id}`)
        
        getData();
        cleanFields();
        console.log('Delete response:', response.data);
  
        await notification.fire({
          title: <strong>Deleted Employee</strong>,
          html: <i>The employee {formData.name} was deleted successfully</i>,
          icon: 'success',
        })
      } else {
        console.log('User canceled the deletion.')
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee. Please try again.');
    }
  }

  const cleanFields = () => {
    setFormData({
      name: "",
      age: "",
      country: "",
      charge: "",
      agesOnCharge: "",
      id: "",
      edit: false
    })

  }

  return (
    <div className='container'>
      <div className="card text-center">
        <div className="card-header">
          EMPLOYEE MANAGEMENT
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Name: </span>
            <input 
              type='text' 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control" 
              placeholder="Employee name" 
              aria-label="Username" 
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Age: </span>
            <input 
              type='number' 
              name='age'
              value={formData.age}
              onChange={handleChange}
              className="form-control" 
              placeholder="Employee age" 
              aria-label="Username" 
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Country: </span>
            <input 
              type='text'
              name='country'
              value={formData.country}
              onChange={handleChange}
              className="form-control" 
              placeholder="Employee country" 
              aria-label="Username" 
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Charge: </span>
            <input 
              type='text' 
              name='charge'
              value={formData.charge}
              onChange={handleChange}
              className="form-control" 
              placeholder="Employee charge" 
              aria-label="Username" 
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Time at charge: </span>
            <input 
              type='number' 
              name='agesOnCharge'
              value={formData.agesOnCharge}
              onChange={handleChange}
              className="form-control" 
              placeholder="Employee time at charge" 
              aria-label="Username" 
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
            formData.edit?
            <div>
              <button className='btn btn-warning m-2'onClick={update}>Update</button>
              <button className='btn btn-info m-2'onClick={cleanFields}>Cancel</button>
            </div>
            :<button className='btn btn-success'onClick={addData}>Register</button>
          }
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Country</th>
            <th scope="col">Charge</th>
            <th scope="col">Experience</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            employeesList.map((val,key) => {
              return <tr key={val.id || key}>
                  <th>{val.name}</th>
                  <td>{val.age}</td>
                  <td>{val.country}</td>
                  <td>{val.charge}</td>
                  <td>{val.agesOnCharge}</td>
                  <td>
                    <div className="btn-group">
                      <button type="button" onClick={() => {
                        editData(val)
                      }} className="btn btn-info">Edit</button>
                      <button type="button" onClick={() => {
                        deleteData(val)
                      }} className="btn btn-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              // <div key={val.id || key} className=''>{val.name}</div>
            })
          }

        </tbody>
      </table>
    </div>
  );
}

export default App;
