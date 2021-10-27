import "./App.css";

import React, { useEffect, useState } from "react";

export default function App() {
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState("rgb(0, 0, 0)");
  const [color, setColor] = useState("#000");

  const isHexColorLight = (color) => {
    const hex = color.replace("#", "");
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
    return brightness > 155;
  };

  useEffect(() => {
    setColor(isHexColorLight(hex) ? "#000" : "#fff");
  }, [hex]);

  const convertHexToRgb = (hex) => {
    let r = 0,
      g = 0,
      b = 0;
    const color = hex.replace("#", "");
    if (color.length === 3) {
      let temp = color.split("");
      r = parseInt(temp[0], 16) * 16 + parseInt(temp[0], 16);
      g = parseInt(temp[1], 16) * 16 + parseInt(temp[1], 16);
      b = parseInt(temp[2], 16) * 16 + parseInt(temp[2], 16);
    } else if (color.length === 6) {
      let temp = color.split("");
      r = parseInt(temp[0] + temp[1], 16);
      g = parseInt(temp[2] + temp[3], 16);
      b = parseInt(temp[4] + temp[5], 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  const validHex = (hex) => {
    const regex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
    return regex.test(hex);
  };

  const changeHex = (e) => {
    const { value } = e.target;
    const isValid = validHex(value);
    setHex(value);
    if (isValid) {
      setRgb(convertHexToRgb(value));
    }
  };

  return (
    <div className="App" style={{ backgroundColor: hex, color }}>
      <input value={hex} onChange={changeHex} />
      <input value={rgb} onChange={setRgb} />
    </div>
  );
}
