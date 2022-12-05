import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as service from "../../services/auth-service"
import * as userService from "../../services/users-service";

export const Login = () => {
    const [existingUsers, setExistingUsers] = useState([]);
    const [newUser, setNewUser] = useState({});
    const [loginUser, setLoginUser] = useState({});


    const navigate = useNavigate()


    const deleteUser = (uid) =>
        userService.deleteUser(uid)
            .then(findAllUsers)

    const findAllUsers = () =>
        userService.findAllUsers()
            .then(users => {
                setExistingUsers(users)
            })

    const register = () =>
        userService.createUser(newUser)
            .then(findAllUsers);

    const login = () =>
        service.login(loginUser)
            .then((user) => navigate('/profile/mytuits'))
            .catch(e => alert(e));

    return (
        <div>
            <h1>Register</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, username: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, password: e.target.value})}
                   placeholder="password" type="password"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, email: e.target.value})}
                   placeholder="email" type="email"/>
            <button onClick={register} className="btn btn-primary mb-5">Register
            </button>


            <h1>Login</h1>
            <input onChange={(e) =>
                setLoginUser({...loginUser,
                    username: e.target.value})}/>
            <input onChange={(e) =>
                setLoginUser({...loginUser,
                    password: e.target.value})}/>
            <button onClick={login}>
                Login</button>
        </div>

    );
};
