/* eslint-disable no-debugger */
import Papa from 'papaparse';
import logo from './logo.svg';
import './App.css';
import React from "react";
import { parseCSVToJSON } from './utils/parse_csv';
import { sampleData } from './utils/sample_data';
import { ComplexFilter, Dropdown } from '@czi-sds/components';

const App = () =>  {
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [selectedTranscript, setSelectedTranscript] = React.useState(null);

  // initial load
  React.useEffect(() => {
    async function fetchData() {
      fetch("/sample_data.tsv")
        .then((response) => response.text())
        .then(
          (data) => {
            console.log(data);
            const parsed_tsv = Papa.parse(data, {
              header: true, // Treat the first row as the header
              dynamicTyping: true, // Automatically detect data types
              skipEmptyLines: true, // Skip empty lines
              delimiter: "\t",
            }).data;
            setData(parsed_tsv);
            setFilteredData(parsed_tsv);
          }
        )
      // const jsonResults = await parseCSVToJSON();
      // debugger;
      // setData(jsonResults);
      // setFilteredData(jsonResults);
    }
    // const jsonResults = sampleData;
    fetchData();
    // setData(jsonResults);
    // setFilteredData(jsonResults);
  }, []);

  const filterDataByTranscript = (value) => {
    const filteredData = data?.filter(row => row.transcript_id === value);
    //setFilteredData(filteredData);
    setSelectedTranscript(value);
  };

  const onChangeFilter = (option) => {
    filterDataByTranscript(option?.name)
  };


  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
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
