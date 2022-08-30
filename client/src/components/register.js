export default function Register() {

  async function handleRegister(e) {
    e.preventDefault();

    const form = e.target;
    const user = {
      username: form[0].value,
      email: form[1].value,
      password: form[2].value,
      password_confirmation: form[3].value,
      description: form[4].value,
      age: form[5].value,
      gender: form[6].value
    }

    fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
  }

  return(
    <form onSubmit={ event => handleRegister(event) }>
      <ul>
        <li><input required type = "username" /></li>
        <li><input required type = "email" /></li>
        <li><input required type = "password" /></li>
        <li><input required type = "password" /></li>
        <li><input type = "description" /></li>
        <li><input type = "age" /></li>
        <li><input type = "gender" /></li>
        <li><input type = "submit" value = "Submit" /></li>
      </ul>
    </form>
)
}