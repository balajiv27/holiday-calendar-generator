import React, { useState } from "react";

import { styled } from "@mui/system";
import Event from "./Event";
import { Button } from "@mui/material";
import dayjs from "dayjs";

const ICSGenerator = () => {
  const [inputList, setInputList] = useState([<Event key={0} id={0} />]);

  const ResponsiveContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "@media (min-width: 600px)": {
      flexDirection: "row",
      "& > *": {
        flex: 1,
        margin: "0 5px",
      },
    },
    "@media (min-width: 1024px)": {
      flexDirection: "column",
    },
  });

  const handleAddComponent = () => {
    setInputList([
      ...inputList,
      <Event key={inputList.length} id={inputList.length} />,
    ]);
  };

  const saveEvents = (e) => {
    //  console.log(state.eventDate);
    //console.log("formatted", dayjs(state.eventDate.$d).format("YYYY-MM-DD"));
  };

  return (
    <>
      <ResponsiveContainer>
        {inputList.map((component, index) => (
          <div key={index}>{component}</div>
        ))}
      </ResponsiveContainer>

      <Button onClick={handleAddComponent}>Add </Button>
    </>
  );
};

export default ICSGenerator;
