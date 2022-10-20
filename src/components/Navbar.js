import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { logo, down, up, basket } from "../assets";
import { Link } from "react-router-dom";
import OutsideClickHandler from "./OutsideClickHandler";
import { selectCurrency, getCategory } from "../utils/productsSlice";

export class Navbar extends Component {
  state = {
    view: false,
  };

  componentDidMount() {
    this.props.currencies &&
      this.setState({
        ...this.state,
        active: this.props?.currencies[0].symbol,
      });
  }

  render() {
    return (
      <NavContainer>
        <div className="nav-center">
          <ul className="nav-links">
            {this.props.categories.map((category) => (
              <Link key={category.name} to={"/"}>
                <li
                  key={category.name}
                  onClick={() => this.props.getCategory(category.name)}
                >
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>

          <div className="logo">
            <span>
              <img src={logo} alt="logo" />
            </span>
          </div>

          <div className="currencies-overlay">
            <OutsideClickHandler
              onOutsideClick={() => {
                this.setState({ view: false });
              }}
            >
              <div className="currencies">
                <div
                  className="currency-switcher"
                  onClick={() => this.setState({ view: !this.state.view })}
                >
                  <p>{this.props.selectedCurrency}</p>

                  {this.state.view ? (
                    <img src={up} alt="up" />
                  ) : (
                    <img src={down} alt="down" />
                  )}
                </div>

                <div
                  className={`currencies-options ${
                    !this.state.view && "hidden"
                  }`}
                >
                  {this.props.currencies?.map((currency) => (
                    <p
                      key={currency.symbol}
                      id={currency.symbol}
                      onClick={(e) => {
                        this.setState({ view: !this.state.view });
                        this.props.selectCurrency(currency.symbol);
                      }}
                    >
                      {currency.symbol + currency.label}
                    </p>
                  ))}
                </div>
              </div>
            </OutsideClickHandler>
          </div>

          <div className="basket">
            <img src={basket} alt="basket" />
          </div>
        </div>
      </NavContainer>
    );
  }
}

const NavContainer = styled.nav`
  height: 5rem;
  display: grid;
  align-items: center;
  padding: 0 6rem;
  @media (max-width: 768px) {
    padding: 0 2rem;
  }
  .nav-center {
    // width: 90%;
    // margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr auto auto;
    align-items: center;
  }

  .nav-links {
    display: flex;
    li {
      font-size: 14px;
      font-weight: 400;
      color: var(--clr-text-color);
      text-transform: uppercase;
      padding: 0.5rem;
      cursor: pointer;
      &:hover {
        color: var(--clr-green);
        border-bottom: 2px solid var(--clr-green);
      }
      &.active-category {
        font-weight: 600;
        color: var(--clr-green);
        border-bottom: 2px solid var(--clr-green);
      }
    }
  }
  .currencies-overlay {
    position: relative;
    cursor: pointer;
  }
  .currency-switcher {
    display: flex;
    p {
      padding-right: 0.7rem;
    }
  }
  .currencies-options.hidden {
    display: none;
  }
  .currencies-options {
    position: absolute;
    background-color: var(--clr-white);
    // padding: 10px;
    left: -35%;
    width: 100px;
    height: 145px;
    text-align: center;
    border-radius: 5%;
    box-shadow: var(--ctrl-box-shadow-rounded);

    p {
      padding: 4px 4px;
      &:hover {
        background: var(--clr-hover-color);
      }
    }
  }
  .basket {
    padding-left: 1rem;
  }
`;
const mapStateToProps = (state) => ({
  categories: state.products.categories,
  currencies: state.products.currencies,
  currentCategory: state.products.currentCategory,
});

const mapDispatchToProps = (dispatch) => ({
  getCategory: (category) => dispatch(getCategory(category)),
  selectCurrency: (currency) => dispatch(selectCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
