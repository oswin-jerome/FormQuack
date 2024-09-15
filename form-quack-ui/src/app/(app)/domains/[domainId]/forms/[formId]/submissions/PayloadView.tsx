"use client";

import { CopyBlock, dracula } from "react-code-blocks";

/* eslint-disable-next-line react/prop-types */
const PayloadView = ({ payload, ...props }: any) => {
  return <CopyBlock codeBlock={true} text={payload} theme={dracula} language={"js"} {...props} showLineNumbers={true} />;
};

export default PayloadView;
