import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import { Navbar, Home, Exchanges, Cryptocurrencies, News, CryptoDetails} from "./components";

import "./App.css";


const App = () => {
    return (
        <div className="app">
            <div className="header">
                <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="/cryptocurrencies" element={<Cryptocurrencies/>} />
                            <Route exact path="/crypto/:coinId" element={<CryptoDetails/>} />
                            <Route path="/exchanges" element={<Exchanges/>} />
                            <Route path="/news" element={<News/>} />
                        </Routes>
                    </div>
                </Layout>
                <div className="footer">
                    <Typography.Title level={5} style={{color: "#FFFFFF"}}>
                        Cryptoverse <br/>
                        All rights reserved
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                        <Link to="/exchanges">Exchanges</Link>
                    </Space>
                </div>
            </div>
            
        </div>
    )
}

export default App;