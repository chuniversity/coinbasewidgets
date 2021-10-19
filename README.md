# Coinbase Widgets

## Overview <a name="overview"></a>
This repo demonstrates using the Coinbase Websocket to develop widgets display real-time data updates for orders and trades of bitcoin.  This app creates the intial websocket connection and downloads the snapshot of the entire order book, with the market size for each price level for bids and asks. As trades are conducted the websocket provides updates, adding updates, removals, and additions for each price point. There is a form widget that the user provides a quanity of bitcoin and can click on any price point in the widget to automatically calculate the total cost of that potential trade. These widgets emulate the type of dashboards utilized on many trading platforms. 

Documentation: 
https://docs.cloud.coinbase.com/exchange/docs/overview



## Demo

![Alt Text](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)


## Directions
Clone the repo. 
Run npm run start