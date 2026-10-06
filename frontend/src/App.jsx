import { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/test")
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}
// /api/users route to create a new user******
// fetch("http://localhost:5000/api/users", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         username: "VPV",
//         email: "VPV@google.com",
//         password: "******",
//         role: "Team Member"
//     })
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));

export default App;