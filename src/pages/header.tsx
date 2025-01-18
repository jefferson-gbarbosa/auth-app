import { Link, useLocation } from 'react-router-dom';
import { List } from '../components/list';
import { Logo } from '../components/logo';
import { ButtonLogout } from '../components/button-logout';
import { User } from './user';
import { useEffect, useState } from 'react';

export function Header(){
    const location = useLocation();  
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(token !== null && token !== undefined);
      }, [location]);

    const isLoginPage = 
        location.pathname === '/login' || 
        location.pathname === '/email-verification' || 
        location.pathname === '/reset-password'|| 
        location.pathname === '/forgot-password'; 
    return(
        <header className="fixed w-full z-50">
            <nav className=" max-w-screen-xl mx-auto flex justify-between items-center py-12">
                <Link to="/" className="text-5xl font-normal">
                  <Logo />
                </Link>
                {!isLoginPage && (
                    <ul className="flex justify-between items-center">
                     {isLoggedIn?  <User /> :  <List/>}
                     {isLoggedIn ? <ButtonLogout setIsAuthenticated={setIsLoggedIn}/> : 
                        <Link to='/login'
                           className="ml-3 p-2.5 text-white 
                            text-xl bg-none outline-none rounded-lg 
                            border border-white border-solid cursor-pointer"
                           > 
                           LOGIN
                        </Link>}
                 </ul>
                )}
            </nav>
        </header>
    )
 }
 

