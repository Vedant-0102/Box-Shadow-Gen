// App.jsx
import React, { useState, useMemo } from 'react';
import './app.css';

const App = () => {
  const [xShadow, setXShadow] = useState(-6);
  const [yShadow, setYShadow] = useState(15);
  const [blurRadius, setBlurRadius] = useState(30);
  const [spreadRadius, setSpreadRadius] = useState(6);
  const [borderRadius, setBorderRadius] = useState(70);
  const [shadowOpacity, setShadowOpacity] = useState(0.5);
  const [insetShadow, setInsetShadow] = useState(false);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [copied, setCopied] = useState(false);

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const boxShadow = useMemo(() => {
    return `${insetShadow ? 'inset ' : ''}${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(shadowColor, shadowOpacity)}`;
  }, [xShadow, yShadow, blurRadius, spreadRadius, shadowColor, shadowOpacity, insetShadow]);

  const codeString = `box-shadow: ${boxShadow};\nborder-radius: ${borderRadius}px;`;

  const copyStyles = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 800);
  };

  return (
    <div className="container">
      <div className="controls-pane">
        <h2 className="title">Shadow Generator</h2>

        <div className="control-group">
          <label>Horizontal Shadow:</label>
          <input type="range" min="-100" max="100" value={xShadow} onChange={e => setXShadow(+e.target.value)} />
        </div>

        <div className="control-group">
          <label>Vertical Shadow:</label>
          <input type="range" min="-100" max="100" value={yShadow} onChange={e => setYShadow(+e.target.value)} />
        </div>

        <div className="control-group">
          <label>Blur Radius:</label>
          <input type="range" min="0" max="100" value={blurRadius} onChange={e => setBlurRadius(+e.target.value)} />
        </div>

        <div className="control-group">
          <label>Spread Radius:</label>
          <input type="range" min="-50" max="50" value={spreadRadius} onChange={e => setSpreadRadius(+e.target.value)} />
        </div>

        <div className="control-group">
          <label>Border Radius:</label>
          <input type="range" min="0" max="100" value={borderRadius} onChange={e => setBorderRadius(+e.target.value)} />
        </div>

        <div className="control-group">
          <label>Shadow Opacity:</label>
          <input type="range" min="0" max="1" step="0.1" value={shadowOpacity} onChange={e => setShadowOpacity(+e.target.value)} />
        </div>

        <div className="control-group">
          <label>Shadow Color:</label>
          <input type="color" value={shadowColor} onChange={e => setShadowColor(e.target.value)} />
        </div>

        <div className="control-group">
          <label>Inset Shadow:</label>
          <input type="checkbox" checked={insetShadow} onChange={e => setInsetShadow(e.target.checked)} />
        </div>
      </div>

      <div className="preview-pane">
        <div className="preview" style={{ boxShadow, borderRadius: `${borderRadius}px` }}></div>

        <div className="code-box">
          <textarea readOnly value={codeString} />
          <button className={copied ? 'copied' : ''} onClick={copyStyles}>
            {copied ? '✔ Copied!' : 'Copy Styles'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
