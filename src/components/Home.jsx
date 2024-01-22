import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

const { Title } = Typography;

const Home = () => {

  const {data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if(isFetching) {
    return <div>Loading...</div>
  }

  return (
    <Fragment>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row gutter={16}>
        <Col span={12}><Statistic title="Total Cryptocurrencies:" value={millify(globalStats.total)} /></Col>
        <Col span={12}><Statistic title="Total Exchanges:" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap:" value={millify(globalStats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume:" value={millify(globalStats.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets:" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies Now</Title>
        <Title level={3} className="show-more"><Link to='/cryptocurrencies'>Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">News</Title>
        <Title level={3} className="show-more"><Link to='/news'>Show more</Link></Title>
      </div>
      <News simplified={true} />
    </Fragment>
  )
}

export default Home