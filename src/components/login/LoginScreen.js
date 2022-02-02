import React from 'react';
import { useForm } from '../../hooks/useForm/useForm';

export const LoginScreen = () => {

    const [formValues, handleInputChange ] = useForm({
        email: "invitado@invitado.com",
        password: "123456"
    });

    const {email, password} = formValues

    const handleLogin = (e) => {
        e.preventDefault()
        console.log("hola");
    }


return (
<section className="login-block">
    <div className="container-fluid">
        <div className="row " >
            <div className="col-sm-12">
                <form className="md-float-material form-material" action="#" method="POST" onSubmit={handleLogin}>
                    <div className="auth-box card">
                        <div className="card-block">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3 className="text-center heading">Welcome to the Heroes Web!!</h3>
                                </div>
                            </div>
                            <div className="form-group form-primary"> 
                            <input
                            value={email}
                            name="email"
                            onChange={handleInputChange}
                            type="text" className="form-control" name="email"  placeholder="Email" id="email"/> 
                            </div>
                            <div className="form-group form-primary"> 
                            <input 
                            value={password}
                            name="password"
                            onChange={handleInputChange}
                            type="password" className="form-control" name="password" placeholder="Password"  id="password"/> 
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary" type="button" onClick={handleLogin}>Signup Now</button>
                            </div>
                            <p className='p-login my-4 align-content-sm-center'>Tambien puedes entrar como invitado</p>
                            <div className="or-container">
                                <div className="line-separator"></div>
                                <div className="or-label">or</div>
                                <div className="line-separator"></div>
                            </div>
                            <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="button">
                            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt='btn'/>
                            Signup Using Google
                            </button>
                            </div><br/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

)
    
};
