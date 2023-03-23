import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import Login from './Login';

import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <div className="home-content-container">
          <h1>Avalie Filmes</h1>
          <p>Diga o que você achou do seu filme favorito</p>
        </div>
        <div className="home-image-container">
          <MainImage />
        </div>
      </div>
      <Login />
    </div>
  );
};

export default Home;
