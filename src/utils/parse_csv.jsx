import Papa from 'papaparse';
/* eslint-disable no-debugger */
export const parseTSVtoJSON = (tsvText) => {
  return Papa.parse(tsvText, {
    header: true, // Treat the first row as the header
    dynamicTyping: true, // Automatically detect data types
    skipEmptyLines: true, // Skip empty lines
    delimiter: "\t",
  }).data;
}