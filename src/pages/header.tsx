import { Link, useLocation } from 'react-router-dom';
import { List } from '../components/list';
import { Logo } from '../components/logo';
import { ButtonLogout } from '../components/button-logout';
import { ButtonOpen } from '../components/button-open';
import { User } from './user';

export function Header(){
    const location = useLocation();  
    const token = localStorage.getItem("token");

    const isLoggedIn = token !== null && token !== undefined;

    const isLoginPage = location.pathname === '/login' 
                        || location.pathname === '/email-verification' 
                        || location.pathname === '/reset-password'
                        || location.pathname === '/forgot-password'; 
    return(
        <header className="fixed w-full z-50">
            <nav className=" max-w-screen-xl mx-auto flex justify-between items-center py-12">
                <Link to="/" className="text-5xl font-normal">
                  <Logo />
                </Link>
                {!isLoginPage && (
                    <ul className="flex justify-between items-center">
                     {isLoggedIn?  <User /> :  <List/>}
                     {isLoggedIn ? <ButtonLogout /> : <ButtonOpen />}
                 </ul>
                )}
            </nav>
        </header>
    )
 }
 

