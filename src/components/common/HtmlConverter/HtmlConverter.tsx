import React from "react";
import Html from "dangerously-set-html-content";

const HtmlDisplay = ({ htmlContent }:any) => {
  return <Html html={htmlContent} />;
};

export default HtmlDisplay;
