import  '../../../section.css';
import React from 'react'

// import { FontIcon } from 'material-ui';

export default function Section(props) {

		return (
			<div style={{ display: props.display === undefined || props.display? 'inline' : 'none' }}>
				<span>{props.text}</span><br></br>
				<div className="section">
					<input className="policy-checkbox" name={props.name} disabled={props.disabled} onChange={props.onChange} type="checkbox"></input>
					<span><i>{props.agree}</i></span>
				</div>
              
            </div>
		);
	
}
