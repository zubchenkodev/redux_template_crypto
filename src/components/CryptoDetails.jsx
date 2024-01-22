import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoAPI";
import { useState } from "react";
import LineChart from "./LineChart";

const {Title, Text} = Typography;
const { Option } = Select;

const CryptoDetails = () => {

  const { coinId } = useParams();

  const [timeperiod, settimeperiod] = useState('7d');

  const {data, isFetching} = useGetCryptoDetailsQuery(coinId);

  const {data: coinHistory} = useGetCryptoHistoryQuery({coinId, timeperiod});

  console.log(timeperiod);
  console.log(coinHistory);

  const coin = data?.data?.coin;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${coin?.price && millify(coin?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: coin?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${coin?.volume && millify(coin?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${coin?.marketCap && millify(coin?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${coin?.allTimeHigh?.price && millify(coin?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: coin?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: coin?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: coin?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${coin?.supply?.total && millify(coin?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${coin?.supply?.circulating && millify(coin?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  
  if(isFetching) {
    return <div>Loading...</div>
  }

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-conteiner">
        <Title level={2} className="coin-name">
        {coin.name} ({coin.symbol}) Price
        </Title>
        <p>{coin.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select timeperiod" onChange={(value) => settimeperiod(value)}>
      {time.map((item) => 
        <Option value={item} key={item}>{item}</Option>
      )}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(coin?.price)} coinName={coin?.name} />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{coin.name} Value Statistics</Title>
            <p>An overview showing the statistics of {coin.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({title, value, icon})=>(
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {coin.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {coin.name}?</Title>
          {/*because the description is raw html, we use the html-react-parser library to parse it.*/}
          {HTMLReactParser(coin.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{coin.name} Links</Title>
          {coin.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>

  )
}

export default CryptoDetails