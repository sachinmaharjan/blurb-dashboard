import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {

  render() {
    const { details, index } = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out';

    return(
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3>
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(index)}>
          {buttonText}
        </button>
      </li>
    )
  }
}

//validations for where ever props is declared
Fish.propTypes = {
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  addToOrder: React.PropTypes.func.isRequired
}

export default Fish;
