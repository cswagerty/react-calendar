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
		
		const selectedDate =  {
			monthIndex: monthIndex,
			year: year,
			day: day
		}
		// default to today's date
		this.state = {
			selectedDate: selectedDate
		}
	}

	getCurrentDate() {
		// get today's date
		const date = new Date()
		return [date.getMonth(), date.getFullYear(), date.getDate()]
	}

	changeMonth (direction,) {
		this.setState(prevState => {
			let updatedSelectedDate = Object.assign({}, prevState.selectedDate)
			let { monthIndex, year } = updatedSelectedDate
			const monthIndexModifier = direction === "next" ? 1 : -1;
			monthIndex = (monthIndex + monthIndexModifier) % 12 
			if (monthIndex === -1) {
				// decrement to December of previous year
				monthIndex = 11
				updatedSelectedDate.year = year - 1
			} else if (monthIndex === 0 && direction === "next") {
				// increment year
				updatedSelectedDate.year = year + 1
			}
			updatedSelectedDate.monthIndex = monthIndex 
			
			return {
				selectedDate: updatedSelectedDate
			} 
		})
	}	
	
	render() {
		return (
			<section className="calendar">
				<header>
					<button className="previous-month" onClick={this.changeMonth.bind(this, "previous")}>Previous</button>
					<h1>{`${getMonthName(this.state.selectedDate.monthIndex)} ${this.state.selectedDate.year}`}</h1>
					<button className="next-month" onClick={this.changeMonth.bind(this, "next")}>Next</button>
				</header>

				<section className="calendar-body">
					<WeekdayNames />
					<Month selectedDate={this.state.selectedDate} />
				</section>
			</section>
		)
	}
}

class Month extends Component  {
	
	getDays(selectedDate) {
		// returns array of numbers that represent days
		const { monthIndex, year } = selectedDate
		const numberOfDays = this.getDaysInMonth(monthIndex, year)
		return this.createDays(numberOfDays)
	}

	getDaysInMonth(monthIndex, year) {
		// returns number of days for a given month and year
		// passing 0 for days gives previous month, so month index is incremented by 1
		const date = new Date(year, monthIndex + 1, 0)
		return date.getDate()
	}

	createDays(numberOfDays) {
		// create days array that represents each day on the calendar
		let days = new Array(numberOfDays)
		days.fill(null)
		days = days.map((day, i) => i + 1)
		return days
	}

	render() {
		const { selectedDate } = this.props
		const days = this.getDays(selectedDate)

		return (
			<section className="month">
				<ul className="days">{days.map(day => <Day value={day} key={day} />)}</ul>
			</section>
		)
	}
}

const WeekdayNames = () => {
	const dayNames = [
		"Sunday", 
		"Monday", 
		"Tuesday", 
		"Wednesday", 
		"Thursday",
		"Friday",
		"Saturday"
	]

	return (
		<ul className="weekday-names">
			{dayNames.map((dayName, i) => <li key={i}>{dayName}</li>)}
		</ul>
	)
}   

const Day = props => {
	return <li className="day">{props.value}</li>
}

export default Calendar