import { useContext, useEffect} from 'react';
import history from 'util/history';
import { Link } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';
import './styles.css';
import { AuthContext } from 'AuthContext';

const Navbar = () => {

  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="nav-bar bg-primary main-nav">
      <div className="nav-menu">
        <Link to="/" className="nav-logo-text">
          <h1>MovieFlix</h1>
        </Link>
        <div className="exit-container">
          {authContextData.authenticated && (
            <a href="#logout" onClick={handleLogoutClick}>
              SAIR
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
