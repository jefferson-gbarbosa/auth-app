import { Link } from "react-router-dom";

export function Error(){
    return(
        <div>
            <h1 className="text-[100px] text-center font-bold text-blue-600 "
            >Oops!</h1>
            <p className="text-center mt-8">Something Occured <Link to="/" className="text-blue-600">please login</Link> again</p>
        </div>
    )
}