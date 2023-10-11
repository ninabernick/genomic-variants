/* eslint-disable no-debugger */
import cs from './App.css';
import React from "react";
import { parseTSVtoJSON } from './utils/parse_csv';
import {  Icon } from '@czi-sds/components';
import { FilterPanel } from './FilterPanel';

const App = () =>  {
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  // initial load
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/ABCD1_mock.tsv");
        const tsvText = await response.text();
        const parsedData = parseTSVtoJSON(tsvText);

        setData(parsedData);
        setFilteredData(parsedData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const filterData = (key, value) => {
    const filteredData = data?.filter(row => row[key] === value);
    setFilteredData(filteredData);
  }

  return (
    <div className="App">
      <div>
        <Icon
          sdsIcon="dna"
          sdsSize="xl"
          sds
        />
        <span className={cs.title}>Genomic Variants</span>
      </div>
      <FilterPanel data={data} onFilterData={filterData}/>
      <div>
        {data.map(result => result.toString())}
      </div>
    </div>
  );
}

export default App;
