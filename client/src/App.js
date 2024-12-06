import './App.css';
import { useEffect, useState } from "react"
import Axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [formData, setFormData] = useState({
    name:"",
    age: "",
    country:"",
    charge:"",
    agesOnCharge: ""
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

      alert('Registered employee')
      console.log('server response', response.data)

      getData()
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
          <button className='btn btn-success'onClick={addData}>Register</button>
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
