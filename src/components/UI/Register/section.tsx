import  '../../../section.css';
import React , {Component} from "react";

interface Props {
	text?: String;
	agree?: String;
	name?: String;
	disabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface State{

}


export default class Section extends React.Component<Props, State>{
	constructor(props: Props){
		super(props);
	}

	render()  {
		return (
			<div>
				<span>{this.props.text}</span><br></br>
				<div className="section">
					<input name={this.props.name} disabled={this.props.disabled} onChange={this.props.onChange} type="checkbox"></input>
					<span><i>{this.props.agree}</i></span>
				</div>
              
            </div>
		);
	}
}
