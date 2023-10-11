import React from "react";
import cs from "./filter_panel.scss";
import {  Dropdown } from '@czi-sds/components';
import { uniq } from "lodash/fp";
import { CURATED_CLASSIFICATION_TYPES } from "./constants";

export const FilterPanel = ({
  data,
  onFilterData,
}) => {
  const [selectedGene, setSelectedGene] = React.useState(null);
  const [selectedCuratedClassification, setSelectedCuratedClassification] = React.useState(null);
  const [selectedPredictedClassification, setSelectedPredictedClassification] = React.useState(null);

  const onSelectGeneName = (option) => {
    onFilterData("gene_name" , option.name);
    setSelectedGene(option.name)
  }

  const onSelectCuratedClassification = (option) => {
    onFilterData("am_class" , option.name);
    setSelectedCuratedClassification(option.name);
  }

  const getGeneOptions = ()=> {
    if (!data) {
      return [];
    }
    return uniq(data.map(entry => entry.gene_name)).map((gene_name, index) => ({ id: index, name: gene_name}));
  }

  return (
    <div className={cs.filterPanel}>
      <div className={cs.filterWrapper}>
        <Dropdown
          InputDropdownProps={{
            intent: "default",
            sdsStyle: "square",
            sdsType: "label",
          }}
          label={selectedGene ?? "Select Gene"}
          options={getGeneOptions()}
          search
          onChange={onSelectGeneName}
        />
      </div>
      <div className={cs.filterWrapper}>
        <Dropdown
          InputDropdownProps={{
            intent: "default",
            sdsStyle: "square",
            sdsType: "label",
          }}
          label={"Curated Classification"}
          options={CURATED_CLASSIFICATION_TYPES.map((classification, index) => ({id: index, name: classification}))}
          search
          onChange={onSelectCuratedClassification}
        />
      </div>
    </div>
  );
};
