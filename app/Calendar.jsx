import React, {Component}  from 'react'

const Calendar = () => {
	return (<Month year={2017} month={"October"} numberOfDays={31} />)
}

class Month extends Component {
	state = {
		days:[]
	}

	componentDidMount() {
		let days = new Array(this.props.numberOfDays)
		days.fill(null)
		days = days.map((day, i) => i + 1)
		this.setState({days: days})
	}

	createDays() {
		return (
			this.state.days.map(day => <Day value={day} key={day} />)
		)
	}

	render() {
		return (
			<section className="month">
				<h1>{`${this.props.month} ${this.props.year}`}</h1>
				<ul className="month">{this.createDays()}</ul>
			</section>
		)
	}
}

const Day = props => {
	return <li className="day">{props.value}</li>
}

export default Calendar