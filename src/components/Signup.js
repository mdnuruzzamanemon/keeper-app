import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Paper, 
  Typography, 
  Stepper,
  Step,
  StepLabel,
  Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [activeStep, setActiveStep] = useState(0);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { initiateSignup, verifyOTP, resendOTP } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (activeStep === 0) {
        // Step 1: Send signup details and get OTP
        const newUserId = await initiateSignup(formData);
        setUserId(newUserId);
        setActiveStep(1);
      } else {
        // Step 2: Verify OTP
        await verifyOTP(userId, otp);
        navigate('/');
      }
    } catch (error) {
      setError(error.toString());
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
      await resendOTP(userId);
      setError('');
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Account Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Verify Email</StepLabel>
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