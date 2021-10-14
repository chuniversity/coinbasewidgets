import React from 'react';

function Orderbook({topAsks, topBids, handlePriceClick}) {
  let topAsk = topAsks[0][0] || '0';
  let topBid = topBids[0][0] || '0';
  let spread = (Number(topAsk) - Number(topBid)).toFixed(2).toString();
  return (
    <div className="ob-cont">
      <div className="ob-title-cont">
        <div className="ob-title-marketsize">Market Size</div>
        <div className="ob-title-price">Price (Asks)</div>
      </div>
      <div className="ob-widget-wrapper">
        <div className="ob-sell-cont">
          {topAsks.filter(a => Array.isArray(a) && a.length >= 2).map((item, index) => (
            <div key={index} className="ob-tile"> 
              <div className="ob-tile-market">{item[1]} </div>
              <div className="ob-tile-price" onClick={handlePriceClick.bind(this, item[0])}>{item[0]} </div>
            </div>
            ))}
        </div>
        <div className="ob-spread-cont"> 
            <div className="ob-spread-title"> Spread: </div>
            <div className="ob-spread-price"> 
              {spread}
            </div>
        </div>
        <div className="ob-title-cont">
        <div className="ob-title-marketsize">Market Size</div>
        <div className="ob-title-price">Price (Bids)</div>
      </div>
        <div className="ob-bid-cont">
            {topBids.filter(a => Array.isArray(a) && a.length >= 2).map((item, index) => (
            <div key={index} className="ob-tile"> 
              <div className="ob-tile-market">{item[1]} </div>
              <div className="ob-tile-price-bid" onClick={handlePriceClick.bind(this, item[0])}>{item[0]} </div>
            </div>
            ))}
        </div>
       </div>  
    </div>
  );
}

export default Orderbook;
