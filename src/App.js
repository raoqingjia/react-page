import React from 'react';
import './assets/css/style.less';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ChinaMap from "./layout/echarts/ChinaMap";
function App() {
  return (

    <div className="App">
      <Header/>
      <ChinaMap/>
      <Footer/>
    </div>
  );
}

export default App;
