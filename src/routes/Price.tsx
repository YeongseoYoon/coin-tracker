import { useQuery } from "@tanstack/react-query";
import { fetchCoinTickers } from "../api";
import { useParams } from "react-router-dom";
import { IPriceDetail, RouteParams } from "../atoms";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 500px;
`;
const PriceSection = styled.div`
  width: 200px;
  height: 60px;
  background-color: rgba(183, 183, 183, 0.75);
  border-radius: 15px;
  text-align: center;
`;

function Price() {
  const { coinId } = useParams<RouteParams>();
  const { isLoading, data } = useQuery<IPriceDetail>(["tickers", coinId], () =>
    fetchCoinTickers(coinId)
  );

  return (
    <>
      {isLoading ? (
        "price loading..."
      ) : (
        <Section>
          <PriceSection>
            <h1>Market Cap</h1>
            <p>{data?.quotes.USD.market_cap}</p>
          </PriceSection>
          <PriceSection>
            <h1>현재 가격(USD | KRW)</h1>
            <p>
              {data && data.quotes.USD.price.toFixed(0)}USD
              <br />
              {data && (data.quotes.USD.price * 1330).toFixed(0)}KRW
            </p>
          </PriceSection>
          <PriceSection>
            <h1>1시간 변화율</h1>
            <p>{data?.quotes.USD.percent_change_1h}%</p>
          </PriceSection>
          <PriceSection>
            <h1>6시간 변화율</h1>
            <p>{data?.quotes.USD.percent_change_6h}%</p>
          </PriceSection>
          <PriceSection>
            <h1>12시간 변화율</h1>
            <p>{data?.quotes.USD.percent_change_12h}%</p>
          </PriceSection>
          <PriceSection>
            <h1>24시간 변화율</h1>
            <p>{data?.quotes.USD.percent_change_24h}%</p>
          </PriceSection>
        </Section>
      )}
    </>
  );
}

export default Price;
