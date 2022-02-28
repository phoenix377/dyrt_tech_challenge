import React, { useEffect, useState } from 'react';
import styles from './CampgroundOverview.module.scss';
import { ItemDetail } from "../ItemDetail";

const CampgroundOverview = (props) => {
  const { selectedCampgroundId } = props;
  const [campground, setCampground] = useState();

  const getCompground = async () => {
    try {
      const res = await fetch(`https://thedyrt.com/api/v5/campgrounds/${selectedCampgroundId}`);
      const data = await res.json();
      setCampground(data.data.attributes)
    } catch (error) {
      console.log(error, '====> e <====');
    }
  }

  useEffect(() => {
    getCompground();
  }, [selectedCampgroundId]);

  return (
    <div className={styles['overview']}>
      <div className={styles['overview__content']}>
        {campground?.photoUrl &&
          <img src={campground.photoUrl} alt={campground.name}/>
        }
        <h2>{campground?.name}</h2>
        <h3>Coordinates</h3>
        <ItemDetail title="latitude:" detail={campground?.latitude} />
        <ItemDetail title="longitude:" detail={campground?.longitude} />
      </div>
    </div>
  );
};

export default CampgroundOverview;
