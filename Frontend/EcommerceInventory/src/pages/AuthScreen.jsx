import { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Card, CardContent, Typography, TextField, Button, Box, LinearProgress} from '@mui/material';
import useAPI from '../hooks/APIHandleForm.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [tab, setTab] = useState(0);
    const navigate = useNavigate()
    const handleTabChange = (event, newValue) => {
        setTab(newValue)
    }
    useEffect(()=>{
        if (localStorage.getItem("token")){
            navigate("/")
        }
    })
    return(
        <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}>
            <Card sx={{ width : '100%' }}>
                <CardContent>
                    <Tabs value={tab} onChange={handleTabChange} centered>
                        <Tab label="Login" />
                        <Tab label="Sign up" />
                    </Tabs>
                    {tab === 0 && <LoginForm />}
                    {tab === 1 && <SignUpForm />}
                </CardContent>
            </Card>
        </Container>
    )
};

function LoginForm(){
    const navigate = useNavigate()
    const {callAPI, error, loading } = useAPI()
    const doLogin = async(e) => {
        e.preventDefault()
        let response = await callAPI({url:"auth/login/", method:"POST", body:{username:e.target.username.value, password:e.target.password.value}})
        if (response?.data?.access){
            localStorage.setItem("token", response.data.access)
            toast.success("Login Successfully.")
            navigate("/")
        } else{
            toast.error("Invalid Credentials.")
        }

    }
    return (
        <Box sx={{ mt: 3 }}>
            <form onSubmit={doLogin}>
                <Typography variant='h5' component="div" gutterBottom>
                    Login
                </Typography>
                <TextField fullWidth margin="normal" label="Username" name="username" variant="outlined" />
                <TextField fullWidth margin="normal" label="Password" type="password" name="password" variant="outlined"/>
                {loading? <LinearProgress style={{width:'100%'}}/>:
                <Button fullWidth variant="contained" type="submit" color="primary" sx={{ mt: 2 }}>
                    Login
                </Button>}
            </form>
        </Box>
    )
} 

function SignUpForm(){
    const navigate = useNavigate()
    const {callAPI, error, loading } = useAPI()
    const doSignUp = async(e) => {
        e.preventDefault()
        let response = await callAPI({url:"auth/signup/", method:"POST", body:{username:e.target.username.value, email:e.target.email.value, password:e.target.password.value, profile_pic:"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"}})
        if (response?.data?.access){
            localStorage.setItem("token", response.data.access)
            toast.success("Signup Successfully.")
            navigate("/")
        } else{
            toast.error("Signup failed.")
        }
    }
    return (
        <Box sx={{ mt: 3 }}>
            <form onSubmit={doSignUp}>
                <Typography variant='h5' component="div" gutterBottom>
                    Sign Up
                </Typography>
                <TextField fullWidth margin="normal" label="Username" name="username" variant="outlined" />
                <TextField fullWidth margin="normal" label="Email" type="email" name="email" variant="outlined" />
                <TextField fullWidth margin="normal" label="Password" type="password" name="password" variant="outlined"/>
                {loading? <LinearProgress style={{width:'100%'}}/>:
                    <Button fullWidth variant="contained" type="submit" color="primary" sx={{ mt: 2 }}>
                        Sign Up
                    </Button>}
            </form>
        </Box>
    )
}

export default Auth;