import { Navigate } from 'react-router-dom';
//this is to check the status of the JWT token

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');

    //If token is not found, redirect to login
    if(!login){
        return<Navigate to= '/login' replace/>;

    }

    //if token exists
    //redirect to children, which are mentioned in app.jsx
    return children;
};

export default ProtectedRoute;