import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Orderbook from './components/Orderbook';
import Form from './components/Form';


class App extends Component {
  constructor (props) {
    super(props);
  this.state = {
    asks: [],
    bids: [],
    topAsks: [[]],
    topBids: [[]],
    quantity: '0.00',
    price: '0.00',
    total: '0.00'
  }
  this.handleFormQuantity = this.handleFormQuantity.bind(this);
  this.handlePriceClick = this.handlePriceClick.bind(this);
}

  handleRemoveBid (val) {
    let temp = this.state.bids;
    for(let i = 0; i < temp.length; i++) {
      if(val === temp[i][0]) {
        temp.splice(i, 1);
        break;
      }
    }
    this.setState({bids: temp});
  }

  handleRemoveAsk (val) {
    let temp = this.state.asks;
    for(let i = 0; i < temp.length; i++) {
      if(val === temp[i][0]) {
        temp.splice(i, 1);
        break;
      }
    }
    this.setState({asks: temp});
  }

  handleAddBid(val) {
    let temp = this.state.bids;
    let found = false;
    for(let i = 0; i < temp.length; i++) {
      if(val[0] === temp[i][0]) {
        temp[i][1] = val[1];
        found = true;
        break;
      } 
    }
    if(!found) {
        temp.push(val);
    }
    this.setState({bids: temp});
  }

  handleAddAsk(val) {
    let temp = this.state.asks;
    let found = false;
    for(let i = 0; i < temp.length; i++) {
      if(val[0] === temp[i][0]) {
        temp[i][1] = val[1];
        found = true;
        break;
      } 
    }
    if(!found) {
        temp.push(val);
    }
    this.setState({asks: temp});
  }

  handleSorts() {
    let sortedBids = this.state.bids.sort((a, b) => {
      return Number(b[0]) - Number(a[0]);
    });
    let sortedAsks = this.state.asks.sort((a, b) => {
      return Number(a[0]) - Number(b[0]);
    });
    let newtopAsks = [];
    let newtopBids = [];
    for(let i = 0; i < 15; i++){
      newtopAsks.push(sortedAsks[i]);
      newtopBids.push(sortedBids[i]);
    }
    this.setState({
      bids: sortedBids,
      asks: sortedAsks,
      topAsks: newtopAsks,
      topBids: newtopBids,
    });
  }

  handleOpenSocket() {
    const ws = new WebSocket("wss://ws-feed.pro.coinbase.com");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          "type": "subscribe",
          "product_ids": [
              "BTC-USDC"
          ],
          "channels": [
              "level2"
          ]
      })
      );
    };

    ws.onmessage = msg => {
      let data = JSON.parse(msg.data)
      if(data.type === 'snapshot') {
        let tempBids = [];
        let tempAsks = [];
        let newTopBids = [];
        let newTopAsks = [];
        for(let i = 0; i < 500; i++) {
          if(i < 15) {
            newTopBids.push(data.bids[i]);
            newTopAsks.push(data.asks[i]);
          }
          tempBids.push(data.bids[i]);
          tempAsks.push(data.asks[i]);
        }
        this.setState({ 
          asks: tempAsks,
          bids: tempBids,
          topAsks: newTopAsks,
          topBids: newTopBids,
        });
      } else if (data.type === 'l2update') {
          if(data.changes[0][0] === 'buy') {
            if(Number(data.changes[0][2]) === 0) {
              this.handleRemoveBid(data.changes[0][1]);
            } else {
              this.handleAddBid([data.changes[0][1], data.changes[0][2]]);
            }
          } else if (data.changes[0][0] === 'sell') {
              if(Number(data.changes[0][2]) === 0) {
                this.handleRemoveAsk(data.changes[0][1]);
              } else {
                this.handleAddAsk([data.changes[0][1], data.changes[0][2]]);
              }
          }
      }
    }
  }

  componentDidMount() {
    this.handleOpenSocket();
    this.interval = setInterval(this.handleOpenSocket.bind(this), 60000);
    this.interval = setInterval(this.handleSorts.bind(this), 1000);
  }

  handleFormQuantity(e) {
    let newNum = e.target.value.toString();
    let badChars = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '{', '}', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', ':', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '/', '<', '>', '?', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '|', `'`, `"`];
    let found = true;
    let periodCount = 0;
    for(let i = 0; i < newNum.length; i++) {
      if(newNum[i] === '.') {
        periodCount++;
      }
      for(let j = 0; j < badChars.length; j++) {
        if(newNum[i] === badChars[j]) {
          found = false;
        }
      }
    }
    if (found && periodCount < 2) {
      this.setState({quantity: newNum});
      let newTotal = (Number(newNum) * Number(this.state.price)).toFixed(2);
      if(!newTotal) {
        newTotal = '0.00'
      }
      this.setState({total: newTotal});
    }
  }

  handlePriceClick(item) {
    this.setState({price: item});
    let newTotal = (Number(this.state.quantity) * Number(item)).toFixed(2);
    if(!newTotal) {
      newTotal = '0.00'
    }
    this.setState({total: newTotal});
  }

  handleBidData () {
    console.log(this.state.bids)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Coinbase Widgets</h1>
        </header>
        <div className="order-app">
          <Orderbook topAsks={this.state.topAsks} topBids={this.state.topBids} handlePriceClick={this.handlePriceClick} />
          <Form handleFormQuantity={this.handleFormQuantity} quantity={this.state.quantity} price={this.state.price} total={this.state.total} />
        </div>
        <button onClick={this.handleBidData.bind(this)}>BidData</button>
      </div>
      
    );
  }
}

export default App;
