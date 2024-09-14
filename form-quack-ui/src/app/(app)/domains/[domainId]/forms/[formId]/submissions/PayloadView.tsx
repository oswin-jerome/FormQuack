"use client";

import { CopyBlock, dracula } from "react-code-blocks";

const PayloadView = ({ payload, ...props }: any) => {
  return <CopyBlock text={payload} theme={dracula} language={"js"} {...props} showLineNumbers={true} />;
};

export default PayloadView;
