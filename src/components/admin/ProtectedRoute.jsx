import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const { user, _persist } = useSelector(store => store.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!_persist?.rehydrated) return;
        if (user === null || user.role?.toLowerCase() !== 'recruiter') {
            navigate("/");
        }
    }, [user, _persist?.rehydrated, navigate]);

    return (
        <>
        {children}
        </>
    )
};
export default ProtectedRoute;