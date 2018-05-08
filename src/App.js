import React, { Component } from 'react';
import RoutePaths from './routes/RoutePaths';
import AppBar from 'material-ui/AppBar' ;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import ListRow from './ShoppingCart/ListRow';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import './Styles/App.css'


class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    open:false,
    open2:false,
    cart:[],
    subtotal:0,
    recipe: this.props.recipe,
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  componentWillMount(){
    if(localStorage.getItem('cart') == undefined || localStorage.getItem('subtotal') == undefined){

    }
    else{
    this.setState({cart: JSON.parse(localStorage.getItem('cart')),subtotal:parseInt(localStorage.getItem('subtotal'))})
  }
  }
  addItem(item,price){
    var cart = this.state.cart;
    var subtotal = this.state.subtotal;
    subtotal = subtotal + price
    cart.push(item);
    this.setState({cart: cart});
    this.setState({subtotal: subtotal});
    localStorage.setItem('cart',JSON.stringify(cart));
    localStorage.setItem('subtotal',subtotal);
  }


  removeItem(item){
    alert("REMOVING ITEM")
    var index = this.state.cart.indexOf(item);
    var price = item.price;
    this.state.subtotal -= price;
    if(index> -1){
      this.state.cart.splice(index,1)
    }
    this.setState({cart:this.state.cart, subtotal:this.state.subtotal})
    localStorage.setItem('cart', JSON.stringify(this.state.cart))
    localStorage.setItem('subtotal', this.state.subtotal)
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleToggle2 = () => this.setState({open2: !this.state.open2});
  handleSignOut = () =>
  {
    this.setState({open:!this.state.open});
    if(localStorage.getItem("token")!=null)
    {
      localStorage.removeItem("token");
      alert("Success!");
      window.location.reload();
    }
    else
      return alert("You have not logged in yet!");

  }

  render() {
    const style = {
      backgroundColor:'black',
    }

    return (
      <MuiThemeProvider>
      <AppBar title='Slice of NY'
      style={style}
      iconElementRight={<FlatButton label="My Cart" onClick={this.handleToggle2}/>}
      onLeftIconButtonClick={this.handleToggle}/>

      <Drawer
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}>
        <MenuItem onClick={this.handleToggle} href="/Homepage">Home</MenuItem>
        <MenuItem onClick={this.handleToggle} href="/Login">Log In</MenuItem>
        <MenuItem onClick={this.handleToggle} href="/Registration">Sign Up</MenuItem>
        <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
      </Drawer>


      <Drawer width={400}
      docked={false}
      openSecondary={true}
      open={this.state.open2}
      onRequestChange={(open2) => this.setState({open2})}>
      <h3>Items</h3>

      <Table>
      <TableBody>
      {this.state.cart.map((recipe)=> {
     return <ListRow recipe={recipe} removeItem={this.removeItem} />
      })}
      </TableBody>
      </Table><br />

      <div className="subtotal">
      Total: $
      {this.state.subtotal}
      </div>

      <div className="checkout">
      <RaisedButton label="Checkout" primary={true} fullWidth={true} href="/Checkout"/>
      </div>
      </Drawer>

      <RoutePaths addItem={this.addItem} cart={this.state.cart} subtotal={this.state.subtotal}/>
      </MuiThemeProvider>
    );
  }
}

export default App;
