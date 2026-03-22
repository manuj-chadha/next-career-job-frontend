import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FloatingChatBot from "./FloatingChatBot";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const UserRoute = ({children}) => {
    const { user, _persist } = useSelector(store => store.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!_persist?.rehydrated) return;
        if (user === null) {
            navigate("/login");
        }
    }, [user, _persist?.rehydrated, navigate]);

    return (
        <>
        <Navbar />
        {children}
        <Footer />
        </>
    )
};
export default UserRoute;