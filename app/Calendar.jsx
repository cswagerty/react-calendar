import React, {Component}  from 'react'

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

const getMonthName = monthIndex => {
	return monthList[monthIndex]
}

class Calendar extends Component {
	constructor(props) {
		super(props)

		const [monthIndex, year, day] = this.getCurrentDate()

		// default to today's date
		this.state = {
			selectedDate: {
				monthIndex: monthIndex,
				year: year,
				day: day
			}
		}
	}

	getCurrentDate() {
		// get today's date
		const date = new Date()
		return [date.getMonth(), date.getFullYear(), date.getDate()]
	}
	
	render() {
		return (
			<section className="calendar">
				<header>
					<h1>{`${getMonthName(this.state.selectedDate.monthIndex)} ${this.state.selectedDate.year}`}</h1>
				</header>
				<Month selectedDate={this.state.selectedDate} />
			</section>
		)
	}
}

class Month extends Component {
	constructor(props) {
		super(props)

		// create list of days
		const {year, monthIndex, day} = props.selectedDate
		const numberOfDays = this.getDaysInMonth(monthIndex, year)
		const days = this.getDays(numberOfDays)

		this.state = {
			days: days
		}
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
				<ul className="month">{this.createDays()}</ul>
			</section>
		)
	}
}

const Day = props => {
	return <li className="day">{props.value}</li>
}

export default Calendar