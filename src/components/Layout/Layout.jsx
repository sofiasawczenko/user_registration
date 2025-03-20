import React from 'react';
import styles from './Layout.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import tinnovaLogo from '../../assets/images/tinnova.png';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className="position-absolute top-0 start-0 p-3 d-none d-md-block">
        <img src={tinnovaLogo} alt="Tinnova Logo" className={styles.img} />
      </div>

      <div className="position-absolute bottom-0 start-0 p-3 d-md-none opacity-20">
        <img src={tinnovaLogo} alt="Tinnova Logo" className={styles.img} />
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        {children}
      </div>
    </div>
  );
};

export default Layout;