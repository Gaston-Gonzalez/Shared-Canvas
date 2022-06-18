import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { get, onChildChanged, ref, set } from "firebase/database";
import { TextField } from "@mui/material";

import "./App.css";
import Canvas from "./canvas/Canvas";
import { db } from "./firebase";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem auto;
  width: 40rem;
`;

const CssTextField = styled(TextField)({
  color: "#FFFFFF",
  width: "30rem",
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

const ColorContainer = styled.div`
  display: flex;
  width: 30rem;
  justify-content: space-around;
  margin: 2rem auto;
`;

const ColorBox = styled.div`
  box-sizing: border-box;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border-color: ${(props) =>
    props.color !== "#FFFFFF" ? "#FFFFFF" : "#000000"};
  border-style: solid;
  border-width: ${(props) => (props.color === props.selected ? "4px" : "1px")};
  background-color: ${(props) => props.color || "#FFFFFF"};
`;

const dataSort = (a, b) => {
  if (a.x === b.x) {
    return a.y - b.y;
  }
  return a.x - b.x;
};

function App() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const canvasDBRef = ref(db, "canvas_data");
  const [canvasData, setCanvasData] = useState([]);

  useEffect(() => {
    get(ref(db, "canvas_data")).then((data) => {
      setCanvasData(Object.values(data.val()).sort(dataSort));
    });
  }, []);

  onChildChanged(canvasDBRef, (data) => {
    const aux = canvasData
      .map((item) => {
        if (item.x === data.val().x && item.y === data.val().y) {
          return data.val();
        }
        return item;
      })
      .sort(dataSort);
    setCanvasData(aux);
  });

  const onClick = (x, y) => {
    writeCanvasData(name, x, y, color);
  };

  const writeCanvasData = (name, x, y, color) => {
    name = name || "Unknown";
    set(ref(db, "canvas_data/" + x + "_" + y), {
      name,
      x,
      y,
      color,
    });
  };

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
        <ColorContainer>
          <ColorBox
            color="#FFFFFF"
            selected={color}
            onClick={() => setColor("#FFFFFF")}
          />
          <ColorBox
            color="#000000"
            selected={color}
            onClick={() => setColor("#000000")}
          />
          <ColorBox
            color="#FF0000"
            selected={color}
            onClick={() => setColor("#FF0000")}
          />
          <ColorBox
            color="#00FF00"
            selected={color}
            onClick={() => setColor("#00FF00")}
          />
          <ColorBox
            color="#0000FF"
            selected={color}
            onClick={() => setColor("#0000FF")}
          />
        </ColorContainer>
        <Canvas name={name} canvasData={canvasData} onClick={onClick} />
      </BodyContainer>
    </div>
  );
}

export default App;
