import Papa from 'papaparse';
/* eslint-disable no-debugger */
export const parseCSVToJSON = async (filepath = "../genomic-variants/public/sample_data.csv") => {
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
        });
        return parsed_tsv;
      }
    ).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      return [];
    }); 

}