import React from 'react';
import styles from './ItemDetail.module.scss';

export const ItemDetail = (props) => {
  const {title, detail} = props;

  return (
    <div className={styles['item-wrapper']}>
      <p className={styles['item-wrapper__title']}>{title}</p>
      <p className={styles['item-wrapper__detail']}>{detail}</p>
    </div>
  )
}
