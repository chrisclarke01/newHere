export default function Login() {

    function handleLogin(e) {
        e.preventDefault();

        const form = e.target;
        const user = {
            email: form[0].value,
            password: form[1].value
        }

        fetch("http://localhost:5000/api/signin", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token);
        })
    }

    return(
        <form onSubmit={ event => handleLogin(event) }>
            <ul>
                <li><input required type = "email" /></li>
                <li><input required type = "password" /></li>
                <li><input type = "submit" value = "Submit" /></li>
            </ul>
        </form>
    )
}