import React from "react";
import styled from "styled-components";
import { Tooltip } from "@mui/material";

const PixelDiv = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin: 1px;

  &:hover {
    cursor: pointer;
    border: 1px solid #000000;
    box-sizing: border-box;
  }
`;

const Pixel = ({ title, color, onClick, x, y }) => {
  const tooltipPlacement = (x, y) => {
    if (y === 0) {
      return "left";
    }
    if (y === 9) {
      return "right";
    }
    if (x === 0) {
      return "top";
    }
    return "bottom";
  };

  return (
    <Tooltip
      placement={tooltipPlacement(x, y)}
      key={`${x}+${y}t`}
      title={title}
    >
      <PixelDiv
        onClick={() => onClick(x, y)}
        style={{ backgroundColor: color }}
      />
    </Tooltip>
  );
};

const Canvas = ({ canvasData, onClick }) => {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    const items = [];
    for (let j = 0; j < 20; j++) {
      const item = canvasData.find((item) => item.x === i && item.y === j);
      items.push(item || { x: i, y: j, color: "#FFFFFF", name: "" });
    }
    const row = (
      <div key={`${i}-row`} style={{ display: "flex", flexDirection: "row" }}>
        {items.map((i) => (
          <Pixel
            key={`${i.x}+${i.y}`}
            title={i.name}
            color={i.color}
            onClick={onClick}
            x={i.x}
            y={i.y}
          />
        ))}
      </div>
    );
    rows.push(row);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {rows.map((i) => i)}
    </div>
  );
};

export default Canvas;
