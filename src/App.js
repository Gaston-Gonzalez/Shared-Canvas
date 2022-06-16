import React, { useState } from "react";
import styled from "styled-components";

import "./App.css";
import Canvas from "./canvas/Canvas";
import { TextField } from "@mui/material";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem auto;
`;

const CssTextField = styled(TextField)({
  color: "#FFFFFF",
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

function App() {
  const [name, setName] = useState("");

  return (
    <div className="App">
      <header className="App-header">Shared Canvas</header>
      <BodyContainer>
        <CssTextField
          id="name-input"
          InputProps={{
            style: {
              borderColor: "#FFFFFF",
            },
          }}
          InputLabelProps={{
            style: {
              color: "#FFFFFF",
            },
          }}
          inputProps={{
            style: {
              color: "#FFFFFF",
            },
          }}
          variant="outlined"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name}
        <Canvas name={name} />
      </BodyContainer>
    </div>
  );
}

export default App;
