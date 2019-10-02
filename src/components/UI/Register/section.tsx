import  '../../../section.css';
import React from "react";
import { visible } from 'ansi-colors';
// import { FontIcon } from 'material-ui';


interface Props {
	text?: string;
	agree?: string;
	name?: string;
	disabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	display?: boolean;
}
interface State{

}


export default class Section extends React.Component<Props, State>{
	constructor(props: Props){
		super(props);
		console.log(props.display);
	}

	render()  {
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
