import React, { useEffect, useState } from 'react';
import styles from './CampgroundOverview.module.scss';
import { ItemDetail } from "../ItemDetail";

const CampgroundOverview = (props) => {
  const { selectedCampgroundId } = props;
  const [campground, setCampground] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCampground = async () => {
    setError(null);
    setLoading(true)
    const res = await fetch(`https://thedyrt.com/api/v5/campgrounds/${selectedCampgroundId}`);
    const normalizeData = await res.json();
    if (res.status === 200) {
      setCampground(normalizeData?.data?.attributes);
      setError(null)
    } else {
      setError(normalizeData?.errors[0]);
      setCampground(null)
    }
    setLoading(false);
  }

  useEffect(() => {
    if (selectedCampgroundId) {
      getCampground();
    }
  }, [selectedCampgroundId]);
  console.log(error, '====> error <====');

  return (
    <div className={styles['overview']}>
      <div className={styles['overview__content']}>
        {loading === true ? (
          <p>Loading ...</p>
        ) : <>
          {!campground && error?.title ?
            <ItemDetail title={`${error?.title}:`} detail={error?.detail}/>
            : campground ? <>
              {campground['photo-url'] &&
                <div className={styles['overview__content-img']}>
                  <img src={campground['photo-url']} alt={campground.name}/>
                </div>
              }
              <ItemDetail title="Name:" detail={campground?.name}/>
              <ItemDetail title="Rating:" detail={campground?.rating}/>
              <ItemDetail title="City:" detail={campground?.city}/>
              <ItemDetail title="Region Name:" detail={campground['region-name']}/>
              <ItemDetail title="Slug:" detail={campground?.slug} />
              <ItemDetail title="latitude:" detail={campground?.latitude}/>
              <ItemDetail title="Longitude:" detail={campground?.longitude}/>
              <ItemDetail title="Phone Number:" detail={campground['phone-number']}/>
            </> : <></>
          }</>}
      </div>
    </div>
  );
};

export default CampgroundOverview;
