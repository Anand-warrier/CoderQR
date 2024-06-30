import React, { useState, useRef } from "react";
import { Empty, Typography, Dropdown } from "antd";
import "./QRdisplay.css";
import { QRCodeSVG } from "qrcode.react";
import { DownloadOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import { Canvg } from "canvg";

function QRdisplay({ data }) {
  const svgRef = useRef(null);

  // Function to handle SVG download
  const downloadSVG = () => {
    const svgElement = svgRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svgElement);

    const blob = new Blob([svgData], { type: "image/svg+xml" });
    saveAs(blob, "qrcode.svg");
  };

  const downloadPNG = () => {
    const svgElement = svgRef.current.querySelector("svg");
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const v = Canvg.fromString(context, svgData);
      v.render().then(() => {
        canvas.toBlob((blob) => {
          saveAs(blob, "qrcode.png");
        });
      });
    }
  };

  const items = [
    {
      key: "1",
      label: "PNG",
    },
    {
      key: "2",
      label: "SVG",
    },
  ];

  const [format, setFormat] = useState("PNG");
  const onMenuClick = () => {
    format === "PNG" ? setFormat("SVG") : setFormat("PNG");
  };

  const startDownload = () => {
    format === "PNG" ? downloadPNG() : downloadSVG();
  };

  if (!data) {
    return (
      <div className="QRdisplaymain">
        <div className="centered">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <Typography.Text>No QR code generated !</Typography.Text>
            }
          />
        </div>
      </div>
    );
  }
  return (
    <div className="QRdisplaymain">
      <div className="centered">
        <div className=" qrDiv" ref={svgRef}>
          <QRCodeSVG
            value={data.Value}
            size={data.size}
            bgColor={data.bgColor}
            fgColor={data.fgColor}
            level={data.level}
            includeMargin={data.includeMargin}
            imageSettings={{
              src: data.imageSettings.src
                ? URL.createObjectURL(data.imageSettings.src)
                : null,
              x: undefined,
              y: undefined,
              height: data.size * 0.15,
              width: data.size * 0.15,
              excavate: true,
            }}
          />
        </div>
      </div>
      <div className="downloadBtn">
        <Dropdown.Button
          type="primary"
          size="large"
          icon={<DownloadOutlined />}
          onClick={startDownload}
          menu={{ items, onClick: onMenuClick }}
        >
          Download
        </Dropdown.Button>
      </div>
    </div>
  );
}

export default QRdisplay;
