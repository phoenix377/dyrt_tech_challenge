import React, { useCallback, useEffect, useState } from 'react';
import { log } from '../../utils/logToAnalytics';

import styles from './Sidebar.module.scss';

export const Sidebar = (props) => {
  const {
    setSelectedCampgroundId,
    results,
    setResults,
    query,
    setQuery,
  } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    if (result) {
      setSelectedCampgroundId(result.id);
    }
  }, [result]);

  const fetchCampgrounds = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://staging.thedyrt.com/api/v5/autocomplete/campgrounds?q=${query}`);
      if (res.status === 200) {
        const data = await res.json();
        setResults(data);
      }
    } catch (e) {
      console.log(e, '====> e <====');
    }
    setLoading(false);
  }

  useEffect(() => {
    if (query) {
      fetchCampgrounds();
    }
  }, [query]);

  const logToAnalytics = useCallback(() => {
    log('search-dropdown-enter', results);
  }, [results]);

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__content']}>
        <div className={styles['search']}>
          <div className={styles['search__input-container']}>
            <input
              className={styles['search__input']}
              placeholder="Where would you like to camp?"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            />
          </div>

          <div
            className={`${styles['search__dropdown']} ${
              showMenu ? styles['search__dropdown--active'] : undefined
            }`}
            onMouseEnter={logToAnalytics}
          >
            {loading ? (
              <p>Loading ...</p>
            ) : (
              results.map((result, index) => (
                <div
                  key={index}
                  className={styles['search__dropdown__item']}
                  onClick={() => {
                    setResult(result);
                  }}
                >
                  <p>{result.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
