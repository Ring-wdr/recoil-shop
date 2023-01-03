import { RouteArr } from '../link/Link';
import { Link } from 'react-router-dom';
import styles from './css/navbar.module.css';

export const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logoNroute}>
        <img
          src='android-icon-144x144.png'
          alt='logo'
          width='144'
          height='70'
          style={{ objectFit: 'cover' }}
        ></img>
        {RouteArr.map(([key, path]) => (
          <div className={styles.link} key={key}>
            <Link to={path} style={{ textTransform: 'uppercase' }}>
              {path.substring(1) || 'HOME'}
            </Link>
          </div>
        ))}
      </div>
      <div>☰</div>
    </div>
  );
};
