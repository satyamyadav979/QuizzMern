import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Layout, Menu, Avatar, Button } from "antd";
import { HomeOutlined, LogoutOutlined, UserOutlined, TrophyOutlined, BookOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getUsers } from "../CRUDcalls/users";

function ProtectedRoute({ children }) {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const fetchUserDetails = async () => {
        try {
            const result = await getUsers();
            if (result.success) {
                setUserData(result.user);
            } else {
                message.error(result.message);
                redirectToLogin();
            }
        } catch (err) {
            setUserData(null);
            message.error(err.message);
            redirectToLogin();
        }
    };

    const redirectToLogin = () => {
        if (localStorage.getItem('authToken')) {
            localStorage.removeItem('authToken');
        }
        navigate('/login');
    };

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            fetchUserDetails();
        } else {
            redirectToLogin();
        }

        return () => {
            setUserData(null);
        };
    }, [navigate]);

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        redirectToLogin();
    };

    const menuItems = [
        {
            label: <Link to="/">Home</Link>,
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/quizzes">My Quizzes</Link>,
            icon: <BookOutlined />,
        },
        {
            label: <Link to="/leaderboard">Leaderboard</Link>,
            icon: <TrophyOutlined />,
        },
        userData && userData.name && {
            label: (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar style={{ backgroundColor: '#f56a00', marginRight: '8px' }}>
                        {userData.name.charAt(0).toUpperCase()}
                    </Avatar>
                    {userData.name}
                </div>
            ),
            icon: <UserOutlined />,
            children: [
                {
                    label: <Link to="/profile">My Profile</Link>,
                    icon: <UserOutlined />,
                },
                {
                    label: <span onClick={handleSignOut}>Log Out</span>,
                    icon: <LogoutOutlined />,
                },
            ],
        },
    ].filter(Boolean);

    return (
        <Layout>
            <Layout.Header
                className="d-flex justify-content-between"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#001529",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h3 className="text-white m-0" style={{ color: "white", marginRight: "20px" }}>
                        QuizMaster
                    </h3>
                    <Button type="primary" shape="round" size="large" style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}>
                        <Link to="/start-quiz" style={{ color: "#fff" }}>Start a Quiz</Link>
                    </Button>
                </div>
                <Menu theme="dark" mode="horizontal" items={menuItems} />
            </Layout.Header>
            <div style={{ padding: 24, minHeight: 380, background: "#f0f2f5" }}>
                {children}
            </div>
        </Layout>
    );
}

export default ProtectedRoute;
