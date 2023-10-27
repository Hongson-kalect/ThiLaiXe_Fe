import React, { useEffect, useState } from "react";

import "./test.scss";
import { toast } from "react-toastify";
import { CustomInput } from "src/components/CustomInput/CustomInput";
import { httpPost } from "src/configs/axios";

type Props = {};

const Test = (props: Props) => {
  const [questionNum, setQuestionNum] = useState(305);
  const [url, setUrl] = useState("");
  const [rawUrl, setRawUrl] = useState("");
  const pasteInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value
      .replace("&usp=drive_copy", "")
      .replace("open", "uc");
    setUrl(link);
    addImage(link);
    setRawUrl("");
    setQuestionNum((prev) => prev + 1);
  };

  const addImage = async (link: string) => {
    const res = await httpPost("question/add-image", {
      id: questionNum,
      image: link,
    });
    console.log(res);
    if (res.status === 200) toast("saved");
    else {
      toast("failed");
    }
  };

  return (
    <div className="wrap">
      <CustomInput value={rawUrl} type="text" onChange={(e) => pasteInput(e)} />
      <CustomInput
        value={questionNum}
        type="text"
        onChange={(e) => setQuestionNum(Number(e.target.value))}
      />
      <img src={url} alt="image" className="????" />
    </div>
  );
};

export default Test;
