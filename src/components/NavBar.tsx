import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth.tsx';

const NavBar: React.FC = () => {
    const { signedIn, user, setSignedIn, setUser } = useAuth();
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const userInfoCookie = Cookies.get('userinfo');
        if (userInfoCookie) {
            // We are here after a login
            sessionStorage.setItem("userInfo", userInfoCookie);
            Cookies.remove('userinfo');
            var userInfo = JSON.parse(atob(userInfoCookie));
            setSignedIn(true);
            setUser(userInfo);
        } else if (sessionStorage.getItem("userInfo")) {
            // We have already logged in
            const userInfoString = sessionStorage.getItem("userInfo");
            if (userInfoString) {
                var userInfo = JSON.parse(atob(userInfoString));
                setSignedIn(true);
                setUser(userInfo);
            }
        } else {
            console.log("User is not signed in");
        }
        setIsAuthLoading(false);
    }, [setSignedIn, setUser]);

    useEffect(() => {
        // Handle errors from Managed Authentication
        const errorCode = new URLSearchParams(window.location.search).get('code');
        const errorMessage = new URLSearchParams(window.location.search).get('message');
        if (errorCode) {
            toast.error(<>
                <p className="text-[16px] font-bold text-slate-800">Something went wrong !</p>
                <p className="text-[13px] text-slate-400 mt-1">Error Code : {errorCode}<br />Error Description: {errorMessage}</p>
            </>);    
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <a className="navbar-brand" href="#">PizzaShack</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/menu">Menu</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/orders">Orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/suggestions">Suggestions</Link>
                    </li>
                </ul>
                { isAuthLoading && (
                    <div className="spinner-border text-white" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
                { !signedIn && !isAuthLoading && (
                    <button className="btn btn-outline-success my-2 my-sm-0" type="button"
                        onClick={() => { window.location.href = "/auth/login" }}>
                        Sign In
                    </button>
                )}
                {signedIn && !isAuthLoading && user && (
                    <>
                        <div className="navbar-text text-white ml-3">
                            Welcome, {user.email}!
                        </div>
                        <button
                            className="btn btn-outline-danger my-2 my-sm-0 ml-3"
                            type="button"
                            onClick={async () => {
                                window.location.href = `/auth/logout?session_hint=${Cookies.get('session_hint')}`;
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;