import React, { useState, ChangeEvent, FormEvent } from 'react';
import style from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import { UserData, UserErrors } from './IUser';

export const Login: React.FC = () => {
    const [formData, setFormData] = useState<UserData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<UserErrors>({});
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const validateForm = (): UserErrors => {
        let formErrors: UserErrors = {};
        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email address is invalid'; // Corrected to `email` from `password` for email validation
        }

        if (!formData.password) {
            formErrors.password = 'Password is required';
        }
        return formErrors;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:4000/auth/login', { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ email: formData.email, password: formData.password }),
                });
    
                if (response.ok) {
                    navigate('/cars');
                } else {
                    console.log('Login failed.');
                }
            } catch (error) {
                console.error('Login error:', error);
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate className={style.container}>
                <label>Email</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p className={style.error}>{errors.email}</p>}

                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                {errors.password && <p className={style.error}>{errors.password}</p>}
                <button type="submit" className={style.button}>Login</button>
            </form>
        </div>
    );
}
