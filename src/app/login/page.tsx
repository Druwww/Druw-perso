'use client'
import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/lib/firebase/config'
import { redirect, useRouter } from "next/navigation";
import { signInWithEmail } from '@/lib/firebase/auth';
// import { createSession } from '@/actions/auth-actions';
import { ROOT_ROUTE } from '@/constants';
import { LoadingButton } from '@mui/lab';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    signInWithEmail(email, password).then((uid : string | undefined) => {
      if(uid){
        router.push(ROOT_ROUTE);
      }
      setLoading(false);
    })
    setPassword('');
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