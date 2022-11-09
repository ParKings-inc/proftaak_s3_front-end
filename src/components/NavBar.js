import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";



const NavigationBar = (props) => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-4">
                <div className="container-fluid">
                    <a className="navbar-brand text-white h2 fw-bolder  fs-2" href="/">Parkings</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item p-3 fs-5">
                                <Link to="/">
                                    <p className="text-white h5">Home</p>
                                </Link>
                            </li>


                            {props.value == null ? (
                                <>
                                    <li className="nav-item p-3 fs-5">
                                        <Link to="/login">
                                            <p className="text-white h5">Log In</p>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item p-3 fs-5">
                                        <Link to="/reservations">
                                            <p className="text-white h5">Reservations</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item p-3 fs-5">
                                        <Link to="/carpage">
                                            <p className="text-white h5">Car page</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item p-3 fs-5">
                                        <Link to="/" onClick={props.logout}>
                                            <p className="text-white h5">Log out</p>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};



export default NavigationBar;