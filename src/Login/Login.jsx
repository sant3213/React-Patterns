import { useState } from 'react';
import style from './login.module.scss';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const validateForm = (event) => {
        let errors = {};
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.password = 'Email address is invalid';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            console.log(formData);
        } else {
            setErrors(errors);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate className={style.container}>
                <label>Email</label>
                <input type="text" name='email' value={formData.email} onChange={handleChange} />
                {errors.email && <p className={style.error}>{errors.email}</p>}

                <label>Password</label>
                <input type="password" name='password' value={formData.password} onChange={handleChange} />
                {errors.password && <p className={style.error}>{errors.password}</p>}
                <button type="submit" className={style.button}>Login</button>
            </form>
        </div>
    )
}