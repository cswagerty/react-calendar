import React, {Component}  from 'react'

const Calendar = () => {
	return (
		<section className="calendar">
			<Month year={1989} monthName={"October"} />
		</section>
	)
}

class Month extends Component {
	constructor(props) {
		super(props)

		const {year, monthName} = props

		const monthIndex = this.getMonthIndex(monthName)
		const numberOfDays = this.getDaysInMonth(monthIndex, year)
		const days = this.getDays(numberOfDays)


		this.state = {
			days: days,
			year: year,
			month: monthIndex 
		}
	}	

	getMonthIndex(monthName) {
		const monthList = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		]

		return monthList.indexOf(monthName)
	}

	getDaysInMonth(monthIndex, year) {
		// returns number of days for a given month and year
		// passing 0 for days gives previous month, so month index is incremented by 1
		const date = new Date(year, monthIndex + 1, 0)
		return date.getDate()
	}

	getDays(numberOfDays) {
		// returns array of numbers that represent days
		let days = new Array(numberOfDays)
		days.fill(null)
		days = days.map((day, i) => i + 1)
		return days
	}

	createDays() {
		return (
			this.state.days.map(day => <Day value={day} key={day} />)
		)
	}

	render() {
		return (
			<section className="month">
				<h1>{`${this.props.monthName} ${this.props.year}`}</h1>
				<ul className="month">{this.createDays()}</ul>
			</section>
		)
	}
}

const Day = props => {
	return <li className="day">{props.value}</li>
}

export default Calendar