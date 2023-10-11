/* eslint-disable no-debugger */
import logo from './logo.svg';
import cs from './App.css';
import React from "react";
import { parseTSVtoJSON } from './utils/parse_csv';
import { sampleData } from './utils/sample_data';
import {  Dropdown, Icon } from '@czi-sds/components';

const App = () =>  {
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [selectedTranscript, setSelectedTranscript] = React.useState(null);

  // initial load
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/sample_data.tsv");
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

  const filterDataByTranscript = (value) => {
    const filteredData = data?.filter(row => row.transcript_id === value);
    setFilteredData(filteredData);
    setSelectedTranscript(value);
  };

  const onChangeFilter = (option) => {
    filterDataByTranscript(option?.name)
  };

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
      <Dropdown
          InputDropdownProps={{
            intent: "default",
            sdsStyle: "square",
            sdsType: "label",
          }}
          label={selectedTranscript ?? "Select Transcript"}
          options={data?.map((entry, index) => ({ id: index, name: entry.transcript_id}))}
          search
          onChange={(option) => onChangeFilter(option)}
        />
        <div>
          {data.map(result => result.toString())}
        </div>
    </div>
  );
}

export default App;
