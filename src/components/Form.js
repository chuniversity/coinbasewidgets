import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0.00,
    }
  }
  
  render() {
  return (
    <div className="form-column-wrapper">
       <div className="form-cont">
       <div className="box box1"> 
        <div className="box-title"> 
          Quantity 
        </div>
        <div className="box-amount"> 
        <input type="text" name="name" value={this.props.quantity} onChange={(e => this.props.handleFormQuantity(e))} />
        </div>
        <div className="box-currency"> 
          BTC 
        </div>
       
       </div>
       <div className="box box2"> 
        <div className="box-title"> 
          Price 
        </div>
        <div className="box-amount"> 
          {this.props.price}
        </div>
        <div className="box-currency"> 
          USDC 
        </div>
       
       </div>
       <div className="box box2"> 
        <div className="box-title"> 
          Total 
        </div>
        <div className="box-amount"> 
          {this.props.total}
        </div>
        <div className="box-currency"> 
          USDC 
        </div>
       
       </div>
         
       {/* <form>
          <input type="text" name="name" />
          <input type="text" name="name" />
        </form> */}
      </div>
    </div>
  );
  }
}

export default Form;
