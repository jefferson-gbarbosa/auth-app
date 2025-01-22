import { RiGithubFill } from "react-icons/ri";
import { RiLinkedinFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

export function List(){
    return(
    <>
        <li className="ml-0 mb-3 md:mb-0 md:ml-3">
            <Link className="text-white text-2xl md:text-3xl" to="https://www.linkedin.com/in/jefferson-gbarbosa/" target="_blank" rel="noopener noreferrer">
                <RiLinkedinFill />
            </Link>
        </li>
        <li className="ml-0 mb-3 md:mb-0 md:ml-3">
            <Link className="text-white text-2xl md:text-3xl" to="https://github.com/jefferson-gbarbosa" target="_blank" rel="noopener noreferrer">
                <RiGithubFill />
            </Link>
        </li>
    </>
    )
}
