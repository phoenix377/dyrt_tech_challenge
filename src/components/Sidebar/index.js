import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [activeItem, setActiveItem] = useState(null);

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

  const handleKeyDown = (e) => {
    if(e.keyCode === 40 && activeItem === null) {
      setActiveItem(() => {
        setResult(results[0]);
        return 0
      });
    } else if (e.keyCode === 38 && activeItem > 0) {
      setActiveItem((prevActive) => {
        setResult(results[prevActive - 1]);
        return prevActive - 1;
      })
    } else if (e.keyCode === 40 && activeItem < results.length - 1) {
      setActiveItem((prevActive) => {
        setResult(results[prevActive + 1]);
        return prevActive + 1;
      })
    }
  };

  const renderList = useMemo(
    () => results.map((result, index) => <div
      key={index}
      className={styles['search__dropdown__item']}
      onClick={() => {
        setResult(result);
        setActiveItem(index)
      }}
    >
      <p className={activeItem === index ? styles['search__dropdown__item-active'] : ''}>{result.name}</p>
    </div>),
    [activeItem],
  );

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
              onKeyDown={handleKeyDown}
            />
          </div>

          <div
            className={`${styles['search__dropdown']} ${
              showMenu ? styles['search__dropdown--active'] : undefined
            }`}
            onMouseEnter={logToAnalytics}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {loading ? (
              <p>Loading ...</p>
            ) : renderList}
          </div>
        </div>
      </div>
    </div>
  );
};
