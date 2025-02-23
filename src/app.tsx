import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Home } from './pages/home';
import { Signup } from './pages/signup';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { ForgotPassword } from './pages/forgot-password';
import { ResetPassword } from './pages/reset-password';
import { EmailVerification } from './pages/email-verification';
import { ProtectedRoute } from './components/protected-route';
import { ErrorNotPage } from './pages/not-found-error';

export function App() {  
  return (
    <BrowserRouter basename="/auth-app">
      <Routes>
            <Route path= '/' element={localStorage.getItem('token')?<Profile/>:<Home/>}/>
            <Route path= '/home' element={<Home />}/>
            <Route path= '/register' element={<Signup />}/>
            <Route path= '/login' element={<Login />}/>
            <Route element={<ProtectedRoute />}>
              <Route path= '/profile' element={<Profile />}/>
            </Route>
            <Route path= '/forgot-password' element={<ForgotPassword />}/>
            <Route path= '/reset-password/:token' element={<ResetPassword />}/>
            <Route path= '/email-verification' element={<EmailVerification />}/>
            <Route path="*" element={<ErrorNotPage />} /> 
        </Routes>
    </BrowserRouter>
  )
}

