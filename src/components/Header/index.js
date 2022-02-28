import React from 'react';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles['header']}>
      <div className={styles['title']}>The Dyrt Tech Challenge</div>
    </div>
  );
};

export default Header;
