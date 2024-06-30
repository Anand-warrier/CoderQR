import React, { useState } from "react";
import "./QRSettings.css";
import { UploadOutlined } from "@ant-design/icons";
import {
  Input,
  Radio,
  Button,
  Divider,
  Checkbox,
  ColorPicker,
  message,
  Upload,
} from "antd";
import QRdisplay from "../QRdisplay/QRdisplay";

function QRSettings({ setData }) {
  const [ipval, setIpval] = useState(""); //input field
  const inChange = (e) => {
    setIpval(e.target.value);
  };
  //border
  const [checked, isChecked] = useState(false);
  const chkChange = (e) => {
    isChecked(e.target.checked);
  };
  //size
  const [size, setSize] = useState("128");
  const changeSize = (e) => {
    setSize(e.target.value);
  };

  //background colour
  const [bgcolor, setBgcolor] = useState("#ffffff");
  const handlebgcolor = (value) => {
    setBgcolor(value.toHexString());
  };

  //foreground colour
  const [fgcolor, setFgcolor] = useState("#000000");
  const handlefgcolor = (value) => {
    setFgcolor(value.toHexString());
  };

  //level correction
  const [level, setLevel] = useState("L");
  const handlelevel = (e) => {
    setLevel(e.target.value);
  };

  //Logo upload
  const [imageFile, setImageFile] = useState(null); 
  const handleBeforeUpload = (file) => {

    setImageFile(file);
   
    return false;
  };

  //handling submit
  const submitForm = () => {
    const Data = {
      Value: ipval,
      size: size,
      bgColor: bgcolor,
      fgColor: fgcolor,
      level: level,
      includeMargin: checked,
      imageSettings: {
        src: imageFile,
      },
    };

    setData(Data);
  };

  return (
    <div className="main">
      <span className="normalSpan">Input information</span>

      <Input
        placeholder="Enter URL or other information"
        allowClear
        style={{ marginBottom: "1em" }}
        onChange={inChange}
      />

      <Checkbox style={{ marginBottom: "3em" }} onChange={chkChange}>
        Enable Border
      </Checkbox>

      <span className="normalSpan">Select Size</span>

      <Radio.Group defaultValue="128" buttonStyle="solid" onChange={changeSize}>
        <Radio.Button value="256">Large</Radio.Button>
        <Radio.Button value="128">Medium</Radio.Button>
        <Radio.Button style={{ marginBottom: "3em" }} value="64">
          Small
        </Radio.Button>
      </Radio.Group>

      <span className="normalSpan">Choose Colour</span>
      <ColorPicker
        onChange={handlebgcolor}
        defaultValue="#ffffff"
        style={{ width: "60%", marginBottom: "3em" }}
        size="large"
        showText={() => <span>Background colour </span>}
      />
      <ColorPicker
        onChange={handlefgcolor}
        style={{ width: "60%" }}
        size="large"
        defaultValue="#000000"
        showText={() => <span>Foreground colour </span>}
      />
      <Divider dashed style={{ borderColor: "#695e5ea1" }}></Divider>

      <span className="normalSpan">Level Correction</span>
      <Radio.Group defaultValue="L" buttonStyle="solid" onChange={handlelevel}>
        <Radio.Button value="L">L</Radio.Button>
        <Radio.Button value="M">M</Radio.Button>
        <Radio.Button value="Q">Q</Radio.Button>
        <Radio.Button style={{ marginBottom: "1em" }} value="H">
          H
        </Radio.Button>
      </Radio.Group>
      <div className="fileUplaod">
        <span className="normalSpan">Insert logo (optional)</span>
        <Upload
          name="image"
          listType="text"
          maxCount={1}
          showUploadList={true}
          beforeUpload={handleBeforeUpload}
          onChange={({ fileList }) =>
            setImageFile(fileList[0]?.originFileObj || null)
          }
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>

      <Button
        type="primary"
        size="large"
        style={{ background: "#282c34", borderColor: "green" }}
        on
        onClick={submitForm}
      >
        Generate QR code
      </Button>
    </div>
  );
}

export default QRSettings;
