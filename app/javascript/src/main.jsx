import React from 'react'
import PropTypes from 'prop-types'
import './main.css'

const Main = props => (
  <div className='main'>Hello {props.name}!</div>
)

Main.defaultProps = {
  name: 'World'
}

Main.propTypes = {
  name: PropTypes.string
}

export default Main
