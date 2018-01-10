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
			},
			days: this.getUpdatedDays(monthIndex, year) 
		}
	}

	getCurrentDate() {
		// get today's date
		const date = new Date()
		return [date.getMonth(), date.getFullYear(), date.getDate()]
	}

	changeMonth (direction,) {
		this.setState(prevState => {
			let selectedDate = Object.assign({}, prevState.selectedDate)
			const monthIndexModifier = direction === "next" ? 1 : -1;
			let monthIndex = (prevState.selectedDate.monthIndex + monthIndexModifier) % 12 
			if (monthIndex === -1) {
				// decrement to December of previous year
				monthIndex = 11
				selectedDate.year = selectedDate.year - 1
			} else if (monthIndex === 0 && direction === "next") {
				// increment year
				selectedDate.year = selectedDate.year + 1
			}
			selectedDate.monthIndex = monthIndex 
			
			return {
				selectedDate: selectedDate,
				days: this.getUpdatedDays(monthIndex, selectedDate.year)
			} 
		})
	}

	getUpdatedDays(monthIndex, year) {
		const numberOfDays = this.getDaysInMonth(monthIndex, year)
		return this.getDays(numberOfDays)
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
	
	render() {
		return (
			<section className="calendar">
				<header>
					<button className="previous-month" onClick={this.changeMonth.bind(this, "previous")}>Previous</button>
					<h1>{`${getMonthName(this.state.selectedDate.monthIndex)} ${this.state.selectedDate.year}`}</h1>
					<button className="next-month" onClick={this.changeMonth.bind(this, "next")}>Next</button>
				</header>
				<Month selectedDate={this.state.selectedDate} days={this.state.days} />
			</section>
		)
	}
}

const Month = props =>  {	
	return (
		<section className="month">
			<ul className="days">{props.days.map(day => <Day value={day} key={day} />)}</ul>
		</section>
	)
}

const Day = props => {
	return <li className="day">{props.value}</li>
}

export default Calendar