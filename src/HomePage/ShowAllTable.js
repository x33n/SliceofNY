import React, { Component } from 'react';
import {GetAllStores} from '../Utils/Requests/GetAllStores';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Top3tableRow from './Top3tableRow';

class ShowAllTable extends Component {
constructor(props){
  super(props)
  this.state = {
    stores: []
  }
}


componentDidMount(){
  GetAllStores()
  .then(response => {
    this.setState({stores:response.data});
  })
  .catch(error => {
    alert("Error" + error);
  })
}


  render() {

    return (
      <div style={{border: '5px groove white'}}>
      <Table>
   <TableHeader>
       <TableHeaderColumn>Name</TableHeaderColumn>
       <TableHeaderColumn/>
       <TableHeaderColumn>Rating</TableHeaderColumn>
       <TableHeaderColumn>Visit</TableHeaderColumn>
       <TableHeaderColumn>Sign Up</TableHeaderColumn>
   </TableHeader>
   <TableBody>
   {this.state.stores.map(function(store){
     return <Top3tableRow store = {store}/>
   })}

   </TableBody>
 </Table>
 </div>
    );
  }
}

export default ShowAllTable;
