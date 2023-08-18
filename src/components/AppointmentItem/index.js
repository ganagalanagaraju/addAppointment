import './index.css'

const AppointmentItem = props => {
  const {appointmentItem, isFavoriteStarIcon} = props
  const {title, dateTime, isFavorite, id} = appointmentItem

  const isFavoriteStar = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const isStarred = isFavorite ? 'Starred' : 'Star'
  const onClickStar = () => {
    isFavoriteStarIcon(id)
  }
  return (
    <li>
      <div className="each-appointment">
        <div className="title-star">
          <p className="title-name">{title}</p>
          <button
            type="button"
            className="star-btn"
            data-testid="star"
            onClick={onClickStar}
          >
            <img src={isFavoriteStar} alt={isStarred} className="star" />
          </button>
        </div>
        <p className="date-tme">{dateTime}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
