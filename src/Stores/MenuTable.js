import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MenuTableRow from './MenuTableRow';

class MenuTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      menu:this.props.menu,
    }
  }


render() {
  return (
    <Table>
 <TableHeader>
   <TableRow>
     <TableHeaderColumn>Name</TableHeaderColumn>
     <TableHeaderColumn>Price</TableHeaderColumn>
     <TableHeaderColumn>Rating</TableHeaderColumn>
     <TableHeaderColumn>Description</TableHeaderColumn>
   </TableRow>
 </TableHeader>

 <TableBody>
 {this.props.menu.map(function(recipe){
   return <MenuTableRow recipe = {recipe}/>
 })}
 </TableBody>
</Table>
  );
}
}

export default MenuTable;
