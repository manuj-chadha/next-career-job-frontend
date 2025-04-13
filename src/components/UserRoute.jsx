import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FloatingChatBot from "./FloatingChatBot";

const UserRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);

    const navigate = useNavigate();

    useEffect(()=>{
        if(user === null){
            navigate("/login");
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
};
export default UserRoute;