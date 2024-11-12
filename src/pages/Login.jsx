import './Login.css'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import * as EmailValidator from 'react-email-validator'

function Login(){
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    
    const handleClick = () => {
        navigate('/products')
    }

    return (
        <div className='corpo'>
            <h2>Login</h2>
            <h4>Email</h4>
            <input placeholder="example@gmail.com" onChange= { (event) => setEmail (event.target.value) } type="text"/>
            <br/> 
            <h4>Senha</h4>
            <input placeholder= "********" onChange={(event) => setPassword(event.target.value)} type="password"/>
            <br/> 
            <button disabled={password.length <= 8 && EmailValidator.validate('test@email.com')} 
            onClick={ handleClick}>Entrar</button>
            <br /><br />
            <Link to="/forgot-password">Esqueceu a senha?</Link>
            <br /><br />
            <Link to='/register'>Cadastra-se</Link>
    
        </div>
    )
}

export default Login;