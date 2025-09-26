
import React, { useEffect, useState } from 'react';
import WaterfallChart from '../../components/charts/WaterfallChart';
import Filter from '../../components/ui/Filter';
import { provider } from '../../data/providers';
import { useFiltersStore } from '../../app/store';
import './WaterfallView.css';

export default function WaterfallView() {
  const month = useFiltersStore((s) => s.month);
  const [waterfallData, setWaterfallData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await provider.getWaterfall(month);
      setWaterfallData(data);
    }
    fetchData();
  }, [month]);

  return (
    <div className="stack">
      <div className="filter-container">
        <Filter />
      </div>
      <div className="panel">
        <WaterfallChart data={waterfallData} />
      </div>
    </div>
  );
}

