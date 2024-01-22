import{ useEffect, useState, Fragment } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoAPI';

const Cryptocurrencies = ({ simplified }) => {

  const count = simplified ? 10 : 100;

  const { isFetching, data } = useGetCryptosQuery(count);

  const [ cryptos, setCryptos] = useState(data?.data?.coins);

  const [ search, setSearch ] = useState('');

  useEffect(() => {
    setCryptos(data?.data?.coins);
    const filteredData = data?.data?.coins.filter((item) => item.name.toLowerCase().includes(search));
    setCryptos(filteredData);
  }, [cryptos, search]);

  if(isFetching) {
    return <div>Loading...</div>
  }

  return (
    <Fragment>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {
          cryptos?.map((crypto) => (<Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.uuid}>
          <Link to={`/crypto/${crypto.uuid}`}>
            <Card 
              title={`${crypto.rank}. ${crypto.name}`} 
              extra={<img className="crypto-image" src={crypto.iconUrl} />} 
              hoverable
            >
              <p>Price: {millify(crypto.price)}</p>
              <p>Market Cap: {millify(crypto.marketCap)}</p>
              <p>Daily Change: {crypto.change}%</p>
            </Card>
          </Link>
          </Col>))
        }
      </Row>
    </Fragment>
  )
}

export default Cryptocurrencies