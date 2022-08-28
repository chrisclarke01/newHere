import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Register() {
 const [form, setForm] = useState({
   username: "",
   email: "",
   password: "",
   description: "",
   age: "",
   gender: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newAccount = { ...form };
  
    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  
    setForm({ username: "", email: "", password: "", description: "", age: "", gender: "", });
    navigate("/");
  }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Register a New Account</h3>
     <form onSubmit={onSubmit}>

       {/* Username */}
       <div className="form-group">
         <label htmlFor="username">Username</label>
         <input
           type="text"
           className="form-control"
           id="username"
           value={form.username}
           onChange={(e) => updateForm({ username: e.target.value })}
         />
       </div>

       {/* Email */}
       <div className="form-group">
         <label htmlFor="position">Email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>

       { /* Password */}
       <div className="form-group">
         <label htmlFor="">Password</label>
         <input
           type="text"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>

       { /* Description */}
       <div className="form-group">
         <label htmlFor="">Description</label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>

       { /* Age */}
       <div className="form-group">
         <label htmlFor="">Age</label>
         <input
           type="number"
           className="form-control"
           id="age"
           value={form.age}
           onChange={(e) => updateForm({ age: e.target.value })}
         />
       </div>

       { /* Gender */}
       <div className="form-group">
         <label htmlFor="">Gender</label>
         <input
           type="text"
           className="form-control"
           id="gender"
           value={form.gender}
           onChange={(e) => updateForm({ gender: e.target.value })}
         />
       </div>

       { /* Submit Button */}
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}