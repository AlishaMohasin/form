import React, { useEffect, useState } from "react";
import style from "./Form.modules.css";

import axios from"axios"

const Form = () => {
  const [form, setform] = useState([{}]);
  const [formarr, setFormarr] = React.useState([])
  const arr=["username","age","address","salary","department","marital_status","image"]

  const onchange = (e) => {
    let { type, name, value, checked, files } = e.target;
    {
      if (type == "checkbox") {
        setform({
          ...form,
          [name]: checked,
        });
      } else if (type == "file") {
        setform({
          ...form,
          [name]: files,
        });
      } else {
        setform({
          ...form,
          [name]: value,
        });
      }
    }
  };

  const onsubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8081/data",{
      method:"POST",
      headers: {
          "content-type": "application/json",
      },
      body:JSON.stringify({
          username:form.username,
          age:form.age,
          address:form.address,
          salary:form.salary,
          department:form.department,
          marital_status:form.marritalstatus,
         image:form.resume
      }),
  
  })
  .then((r)=>r.json())
  .then((d)=>{
      setFormarr([...formarr,d])
      setform("")
  });
  };
  useEffect = (() => {
    axios.get(`http://localhost:8081/data`)
     
      .then((d) => {
        setFormarr(d.data);
        console.log(d)
      })
      }, [form])
    return (
      <div>
        <h1>Register Employee details</h1>
        <form className="main" onSubmit={onsubmit}>
          <div>
            <label>Name</label>
            <input
              placeholder="Enter the name"
              type="text"
              onChange={onchange}
              name="username"
              value={form.name}
            />
          </div>
          <div>
            <label>Age</label>
            <input
              placeholder="Enter the age"
              type="number"
              onChange={onchange}
              name="age"
            />
          </div>
          <div>
            <label>Address</label>
            <input
              placeholder="Enter the address"
              type="text"
              onChange={onchange}
              name="address"
            />
          </div>
          <div>
            <label>Department</label>
            <select onChange={onchange} name="department">
              <option>computer science</option>
              <option value="Ec">EC</option>
              <option value="civil">cIVIL</option>
              <option value="mech">MECANICAL</option>
            </select>
          </div>
          <div>
            <label>Salary</label>
            <input type="number" onChange={onchange} name="salary" />
          </div>

          <div>
            <label>marital status</label>
            <br></br>
            <label>yes</label>
            <input type="checkbox" onChange={onchange} name="marrid status" />
            <label>No</label>
            <input type="checkbox" name="username" />
          </div>
          <div>
            <label>Photo</label>
            <input type="file" onChange={onchange} />
          </div>

          <button>submit</button>
        </form>
        <table className={style.table}>
          <tr className={style.tr}>
            {
              arr.map((e) => (
                <th className={style.th}>{e}</th>
              ))
            }
          </tr>
          <>
            {
              formarr.map((el) => (
                <>
                  <tr className={style.tr}>
                    <td>{el.username}</td>
                    <td>{el.age}</td>
                    <td>{el.address}</td>
                    <td>{el.salary}</td>
                    <td>{el.department}</td>
                    <td>{el.marital_status}</td>
                    <td><img src={el.image }/></td>
                  </tr>
               
                </>
              ))
            }

          </>
 
 
        </table>
      </div>
    );
  };

export default Form;
