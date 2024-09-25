'use client'
import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { redirect, useRouter } from "next/navigation";
import { LoadingButton } from '@mui/lab';
import { useAuth } from '@/lib/auth/auth-provider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const auth = useAuth();

  const handleSubmit = async () => {
    setLoading(true)
    auth?.loginEmail(email, password)
      .then(() =>{
        console.log("Login success !!!!")
      })
      .catch(() => {
        console.error("Something went wrong");
        setPassword('');
        setLoading(false);
    });
    
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoadingButton
            onClick={handleSubmit}
            fullWidth
            loading={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </LoadingButton>
          <Button
            onClick={() => router.push('/sign-up')}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}