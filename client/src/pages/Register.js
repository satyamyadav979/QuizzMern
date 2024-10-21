import React from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import './RegisterLogin.css';
import { registerUser } from "../CRUDcalls/users";

const Register = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(values);
        try {
            const response = await registerUser(values);
            if (response.success) {
                message.success(response.message || "Registration successful!");
                localStorage.setItem('authToken', response.authToken);
                navigate('/');
            } else {
                message.error(response.message || "Registration failed!");
            }
        } catch (error) {
            console.error(error);
            message.error("Registration error. Please try again.");
        }
    };

    return (
        <div className="Register-main">
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1>Create Your Quiz Account</h1>
                    </section>
                    <section className="right-section">
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label="Name"
                                name="name"
                                className="d-block"
                                rules={[{ required: true, message: "Please enter your name!" }]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter your name"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                className="d-block"
                                rules={[{ required: true, message: "Please enter your email!" }]}
                            >
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                className="d-block"
                                rules={[{ required: true, message: "Please enter your password!" }]}
                            >
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    style={{ fontSize: "1rem", fontWeight: "600", width: "80px" }}
                                >
                                    Sign Up
                                </Button>
                            </Form.Item>

                            <Form.Item
                                label="Register as Admin?"
                                name="role"
                                className="d-block text-center"
                                rules={[{ required: true, message: "Please select a role!" }]}
                            >
                                <div className="d-flex justify-content-start">
                                    <Radio.Group name="role">
                                        <Radio value="Admin">Yes</Radio>
                                        <Radio value="User">No</Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>
                        </Form>

                        <section className="register-to-login">
                            <p>
                                Already have an account? <Link to="/login" className="login-now">Log in</Link>
                            </p>
                        </section>
                    </section>
                </main>
            </header>
        </div>
    );
}

export default Register;
