import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Paper, 
  Typography, 
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First step: Send signup details and request OTP
      if (activeStep === 0) {
        // TODO: Implement API call to send OTP to email
        // await sendOTP(formData.email);
        setActiveStep(1);
      } 
      // Second step: Verify OTP and complete signup
      else {
        // TODO: Implement API call to verify OTP
        await signup(formData.email, formData.password, formData.name, otp);
        navigate('/');
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleResendOTP = async () => {
    try {
      // TODO: Implement API call to resend OTP
      // await resendOTP(formData.email);
      console.log('OTP resent');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Sign Up
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Account Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Verify OTP</StepLabel>
          </Step>
        </Stepper>

        <form onSubmit={handleSubmit}>
          {activeStep === 0 ? (
            // Step 1: User Details Form
            <>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Continue
              </Button>
            </>
          ) : (
            // Step 2: OTP Verification
            <>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Please enter the verification code sent to {formData.email}
              </Typography>
              <TextField
                fullWidth
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Verify & Sign Up
              </Button>
              <Button
                variant="text"
                color="primary"
                onClick={handleResendOTP}
                fullWidth
                sx={{ mt: 1 }}
              >
                Resend OTP
              </Button>
              <Button
                variant="text"
                onClick={() => setActiveStep(0)}
                fullWidth
                sx={{ mt: 1 }}
              >
                Back
              </Button>
            </>
          )}
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;