import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'; // Import Footer component
import { Box, Button, Container, Grid, TextField, Typography, Paper, Divider } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../Images/3.png';

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        password: "",
    });

    const defaultAdmin = {
        name: "admin",
        password: "admin"
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (user.name === defaultAdmin.name) {
                if (user.password === defaultAdmin.password) {
                    alert("Admin Login Successfully");
                    navigate("/admindashboard");
                } else {
                    alert("Login Error: Incorrect admin password");
                }
            } else {
                const response = await sendRequest();
                if (response.status === "ok") {
                    alert("Login Successfully");
                    if (response.role === "user") {
                        navigate("/home");
                    } else {
                        navigate("/admindashboard");
                    }
                } else {
                    alert("Login Error");
                }
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const sendRequest = async () => {
        return axios.post("http://localhost:4000/login", {
            name: user.name,
            password: user.password,
        })
        .then((res) => res.data);
    };

    return (
        <Box sx={{ backgroundColor: '#000000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 5 }}>
                <Paper elevation={6} sx={{ paddingRight: 4, paddingLeft: 4, paddingTop: 4, borderRadius: 2, maxWidth: 900, backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2C2C2C', borderRadius: 2 }}>
                            <img src={Logo} alt="Sky Light Cinema" style={{ maxWidth: '100%', paddingRight: 30, height: '50vh', paddingBottom: 30 }} />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#FF0000' }}>
                                LOGIN
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginBottom: 2, color: '#FFFFFF' }}>
                                Enter the realm of cinema
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Name"
                                    variant="outlined"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: <PersonIcon sx={{ color: '#FF0000' }} />,
                                        sx: { backgroundColor: '#1F1F1F', borderRadius: 2, color: '#FFFFFF' }
                                    }}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    placeholder="Password"
                                    type="password"
                                    variant="outlined"
                                    name="password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: <LockIcon sx={{ color: '#FF0000' }} />,
                                        sx: { backgroundColor: '#1F1F1F', borderRadius: 2, color: '#FFFFFF' }
                                    }}
                                    sx={{ marginBottom: 3 }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ backgroundColor: '#FF0000', color: '#FFFFFF', paddingY: 1.5, borderRadius: 2, boxShadow: 'none', textTransform: 'none', fontWeight: 'bold' }}
                                >
                                    Login Now
                                </Button>
                                <Divider sx={{ marginY: 2, borderColor: '#FFFFFF' }}>
                                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>Login with Others</Typography>
                                </Divider>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
}

export default Login;
