import React, { useState } from 'react';
import CampgroundOverview from '../CampgroundOverview';
import { Sidebar } from '../Sidebar';

import styles from './Content.module.scss';

const Content = () => {
  const [selectedCampgroundId, setSelectedCampgroundId] = useState();
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState();

  return (
    <div className={styles['content']}>
      <Sidebar
        setSelectedCampgroundId={setSelectedCampgroundId}
        results={results}
        setResults={setResults}
        query={query}
        setQuery={setQuery}
      />
      <CampgroundOverview selectedCampgroundId={selectedCampgroundId} />
    </div>
  );
};

export default Content;
