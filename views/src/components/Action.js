import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {wishlistAddProduct, wishlistRemoveProduct} from '../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    wishlistAddProduct: productId => dispatch(wishlistAddProduct(productId)),
    wishlistRemoveProduct: productId => dispatch(wishlistRemoveProduct(productId))
  };
}

class Action extends Component {
  constructor(props) {
    super(props);
    this.handleClickAction = this.handleClickAction.bind(this);
  }

  render() {
    return <div className="action" onClick={this.handleClickAction}>{
      this.props.placeholder ?
      <span className="action-placeholder">{this.props.placeholder}</span> : this.props.text
    }</div>
  }

  handleClickAction(e) {
    e.preventDefault();
    const props = this.props,
      productId = props.id,
      job = props.job;

    if (job == 'add') {
      this.props.wishlistAddProduct(productId);
    } else if (job == 'remove') {
      this.props.wishlistRemoveProduct(productId);
    }
  }
}

export default connect(null, mapDispatchToProps)(Action);

Action.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  wishlistAddProduct: PropTypes.func,
  wishlistRemoveProduct: PropTypes.func
}
