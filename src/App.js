import "./App.css";

import React, { useEffect, useState } from "react";

export default function App() {
  const defaultInputStyle = {
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    outline: "none",
    width: "30vw",
    margin: 12,
    padding: 12,
    borderBottom: "1px solid #fff",
    borderRadius: 0,
    fontSize: "1.5rem",
  };

  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState("rgb(0, 0, 0)");
  const [color, setColor] = useState("#000");
  const [inputStyle, setInputStyle] = useState(defaultInputStyle);

  const isHexColorLight = (color) => {
    let hex = color.replace("#", "");
    if (hex.length === 3) {
      hex.split("");
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
    return brightness > 155;
  };

  useEffect(() => {}, [hex]);

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
    const color = isHexColorLight(value) ? "#000" : "#fff";

    setHex(value);
    if (isValid) {
      setRgb(convertHexToRgb(value));
      setInputStyle({ ...defaultInputStyle, color, backgroundColor: value, borderBottom: `1px solid ${color}` });
      setColor(color);
    } else if (!value) {
      setRgb("");
    } else {
      setRgb("rgb(0, 0, 0)");
    }
  };

  return (
    <div className="App" style={{ backgroundColor: hex, color }}>
      <input value={hex} onChange={changeHex} style={inputStyle} placeholder="hex" />
      <input value={rgb} onChange={null} style={inputStyle} placeholder="rgb" />
    </div>
  );
}
