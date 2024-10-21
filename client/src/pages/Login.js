import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import './RegisterLogin.css';
import { loginUser } from "../CRUDcalls/users";

function Login() {
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        console.log(credentials);
        try {
            const response = await loginUser(credentials);
            console.log(response);
            if (response.success) {
                message.success(response.message || 'Login successful!');
                localStorage.setItem('authToken', response.authToken);
                navigate('/');
            } else {
                message.error(response.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            message.error('Login failed. Please try again.');
        }
    };

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="login-container">
            <header className="app-header">
                <main className="form-wrapper mw-500 text-center px-3">
                    <section className="form-header">
                        <h1>Login to Quiz App</h1>
                    </section>
                    <section className="form-body">
                        <Form layout="vertical" onFinish={handleLogin}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: "Please enter your email." }]}
                            >
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: "Please enter your password." }]}
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                    className="login-button"
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="register-prompt">
                            <p>
                                New here? <Link to="/register" className="register-link">Create an account</Link>
                            </p>
                        </div>
                    </section>
                </main>
            </header>
        </div>
    );
}

export default Login;
