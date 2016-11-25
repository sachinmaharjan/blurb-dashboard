import React from 'react';

class AddFishForm extends React.Component {
  createFish(e){
    e.preventDefault();
    console.log('Adding Fish');
    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }
    console.log(fish);
    //now add fish to fishes state by calling this
    this.props.addFish(fish);
    //clear the form
    this.fishForm.reset();
  }

  render() {
    return (
      <div>
        <h4>Add Fish Form</h4>
        <form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={(e) => this.createFish(e)}>
          <input ref={(input) => {this.name = input}} type="text" placeholder="Fish Name" />
          <input ref={(input) => {this.price = input}} type="text" placeholder="Fish Price" />
          <select ref={(input) => {this.status = input}}>
            <option value="available">Fresh!</option>
            <option value="unavailable">Sold Out!</option>
          </select>
          <textarea ref={(input) => {this.desc = input}} type="text" placeholder="Fish Description" />
          <input ref={(input) => {this.image = input}} type="text" placeholder="Fish Image" />
          <button type="submit">Add Fish</button>
        </form>
      </div>
     )
  }
}

//validations for where ever props is declared
AddFishForm.PropTypes = {
  AddFish: React.PropTypes.func.isRequired
}

export default AddFishForm;
