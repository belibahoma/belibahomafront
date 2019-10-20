import  '../../../section.css';
import React from 'react'

// import { FontIcon } from 'material-ui';

class Section extends React.Component {
	render(){
		return (
			<div style={{ display: this.props.display === undefined || this.props.display? 'inline' : 'none' }}>
				<span>{this.props.text}</span><br></br>
				<div className="section">
					<input className="policy-checkbox" name={this.props.name} disabled={this.props.disabled} onChange={this.props.onChange} type="checkbox"></input>
					<span><i>{this.props.agree}</i></span>
				</div>
              
            </div>
		);

	}
	
}

export default Section;
