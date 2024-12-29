import { Link } from 'react-router-dom';
import { List } from '../components/list';
import { Logo } from '../components/logo';
import { ButtonLogout } from '../components/button-logout';
import { ButtonOpen } from '../components/button-open';
import { User } from './user';

export function Header(){
    const state = localStorage.getItem("token");
    return(
        <header className="fixed w-full z-50">
            <nav className=" max-w-screen-xl mx-auto flex justify-between items-center py-12">
                <Link to="/" className="text-5xl font-normal">
                  <Logo />
                </Link>
                <ul className="flex justify-between items-center">
                    { state ?  <User /> :  <List/>}
                    { state ? <ButtonLogout /> : <ButtonOpen />}
                </ul>
            </nav>
        </header>
    )
 }
 

