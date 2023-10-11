---
to: <%= path %>/<%= name %>/<%= name %>.jsx
---
import React from "react";
import cs from "./<%= h.inflection.underscore(name, false)%>.scss";

export const <%= name %> = () => {
  return (
    <div className={cs.wrapper}>Your new component</div>
  );
};
