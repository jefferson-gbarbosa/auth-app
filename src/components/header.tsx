import { Link, useLocation } from 'react-router-dom';
import { List } from './list';
import { Logo } from './logo';
import { ButtonLogout } from './button-logout';
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
            <nav className=" max-w-screen-xl mx-auto flex justify-between items-center py-6 md:py-12 px-4 md:px-0 flex-col md:flex-row">
                <Link to="/">
                  <Logo />
                </Link>
                {!isLoginPage && (
                    <ul className="flex justify-between items-center flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0">
                     {isLoggedIn?  <User /> :  <List/>}
                     {isLoggedIn ? <ButtonLogout setIsAuthenticated={setIsLoggedIn}/> : 
                        <Link to='/login'
                           className="ml-0 md:ml-3 mt-2 md:mt-0 p-2.5 text-[#63b68c] text-lg font-bold md:text-xl outline-none rounded-lg border border-[#63b68c] border-solid cursor-pointer w-9/12 md:w-auto text-center md:text-left"
                           > 
                           LOGIN
                        </Link>}
                 </ul>
                )}
            </nav>
        </header>
    )
 }
 

