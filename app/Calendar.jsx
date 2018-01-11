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

const getTodaysDate = () => {
	// get today's date
	const date = new Date()
	return [date.getMonth(), date.getFullYear(), date.getDate()]
}

class Calendar extends Component {
	constructor(props) {
		super(props)

		const [monthIndex, year, day] = getTodaysDate()
		
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
		return this.getDisplayedDays(selectedDate, numberOfDays)
	}

	getDaysInMonth(monthIndex, year) {
		// returns number of days for a given month and year
		// passing 0 for days gives previous month, so month index is incremented by 1
		const date = new Date(year, monthIndex + 1, 0)
		return date.getDate()
	}

	getDisplayedDays(selectedDate, numberOfDays) {
		// create days array that represents each day on the calendar
		let displayedDays = new Array(35)  // 7 columns x 5 rows
		displayedDays.fill(null)
		let days = new Array(numberOfDays)  // 7 columns x 5 rows
		days.fill(null)
		// shift the days so they are under the right weekday column
		const offset = this.getDayOfWeekOffset(selectedDate)  
		days = days.map((day, i) => i + 1)

		displayedDays.splice(offset, numberOfDays, ...days)

		return displayedDays
	}

	getDayOfWeekOffset(selectedDate) {
		const date = new Date(selectedDate.year, selectedDate.monthIndex, 1)
		return date.getDay()
	}

	render() {
		const { selectedDate } = this.props
		const days = this.getDays(selectedDate)

		return (
			<section className="month">
				<ul className="days">{days.map((day, i) => <Day selectedDate={selectedDate} day={day} key={i} />)}</ul>
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

class Day extends Component {

	isToday(selectedDate, day) {
		const today = getTodaysDate()
		const selected = [selectedDate.monthIndex, selectedDate.year, day]
		return today.toString() === selected.toString()
	}

	render() {
		const { selectedDate, day }  = this.props

		return <li className={`day ${this.isToday(selectedDate, day) ? 'today' : ''}`}>{day}</li>
	}
}

export default Calendar