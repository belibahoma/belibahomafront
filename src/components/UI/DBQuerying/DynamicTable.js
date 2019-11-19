import React from 'react';
import { ThemeProvider } from 'react-bootstrap';

export default class DynamicTable extends React.Component{

    constructor(props){
        super(props);
        this.generateHeader = this.generateHeader.bind(this);
    }

    componentDidMount() {
        console.log('rendered');
    }

    generateHeader = () => {
        return Object.keys(this.props.attributes).map((attribute, index) => {
            return <th key={index}>{attribute}</th>
        })

    }

    generateBody = () => {
        // console.log(this.props.attributes);
        // console.log(this.props.data);
        let filtered_data = this.props.data.filter(function(){

        })
        return this.props.data.map((entity, index) => {
            return (
                
               <tr key={index}>
                   {Object.keys(this.props.attributes).map(attribute => {
                       console.log(this.props.attributes[attribute]);
                       console.log(entity[attribute]);
                       
                        if(typeof(entity[attribute]) === 'object'){
                            return <td>{entity[attribute].name}</td> 
                            }
                            return <td>{entity[attribute]}</td> 
                    
                        
                   })}
                 
               </tr>
            )
         })
    }

    render() {
        return (
            <div>
                <h1>{this.props.tableName}</h1>
                <table>
                    <thead>
                        <tr>
                            {this.generateHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateBody()}
                    </tbody>
                </table>
            </div>
        )
    }







}