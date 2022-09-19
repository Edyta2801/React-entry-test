import React, { Component } from "react";
import styled from "styled-components";

export class Footer extends Component {
  render() {
    return (
      <Container/>
    );
  }
}
const Container = styled.footer`
height:5rem;
background:var(--clr-green);;
`;
export default Footer;