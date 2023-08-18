import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointment extends Component {
  state = {
    appointmentList: [],
    title: '',
    dateTime: '',
    isStarredFilterActive: false,
  }

  onClickStarred = event => {
    event.preventDefault()
    this.setState(prevState => ({
      isStarredFilterActive: !prevState.isStarredFilterActive,
    }))
  }

  isFavoriteStarIcon = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onClickAddAppointment = event => {
    event.preventDefault()
    const {title, dateTime} = this.state
    const parsedDate = new Date(dateTime)

    const newAppointment = {
      id: uuidv4(),
      title,
      dateTime: format(parsedDate, 'dd MMMM yyyy, EEEE'),
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      dateTime: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateTime = event => {
    const rawDateValue = event.target.value
    this.setState({dateTime: rawDateValue})
  }

  render() {
    const {appointmentList, title, dateTime, isStarredFilterActive} = this.state

    // Debugging console.log statements

    const filteredAppointments = isStarredFilterActive
      ? appointmentList.filter(appointment => appointment.isFavorite)
      : appointmentList

    return (
      <div className="app-container">
        <div className="white-card">
          <div>
            <div className="appointment-container">
              <div className="inputs-container">
                <h1 className="heading">Add Appointment</h1>
                <form
                  className="form-container"
                  onSubmit={this.onClickAddAppointment}
                >
                  <label className="title-la" htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title" // Add an "id" for associating with the label
                    className="title"
                    placeholder="Title"
                    onChange={this.onChangeTitle}
                    value={title}
                  />
                  <label className="date-la" htmlFor="date">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date" // Add an "id" for associating with the label
                    className="date"
                    placeholder="dd/mm/yyyy"
                    onChange={this.onChangeDateTime}
                    value={dateTime}
                  />
                  <button type="submit" className="add-btn">
                    Add
                  </button>
                </form>
              </div>

              <div className="img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  className="img-size"
                  alt="appointments"
                />
              </div>
            </div>

            <hr className="hr-line" />
            <div className="item-container">
              <div className="starred-container">
                <h1>Appointments</h1>
                <button
                  type="button"
                  className="Starred"
                  onClick={this.onClickStarred}
                >
                  Starred
                </button>
              </div>
              <ul className="list-container">
                {filteredAppointments.map(eachAppointment => (
                  <AppointmentItem
                    key={eachAppointment.id}
                    appointmentItem={eachAppointment}
                    isFavoriteStarIcon={this.isFavoriteStarIcon}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointment
