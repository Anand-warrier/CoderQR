import React,{useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import QRSettings from './components/QRSettings/QRSettings';
import QRdisplay from './components/QRdisplay/QRdisplay';

function App() {
  const [data, setData] = useState(null);
  return (
    <div className="App">
      <Header/>
      <div className="content">
      <QRSettings  setData={setData}/>
      <QRdisplay  data={data}/>
      </div>
      
    </div>
  );
}

export default App;
