import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Add these media queries to your NavContainer
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.shadows.small};
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.75rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const LogoIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 1.8rem;
`;

// Update NavLinks for mobile
const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.active ? props.theme.fontWeights.semibold : props.theme.fontWeights.medium};
  padding: 0.5rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background};
  }
`;

const Navbar = () => {
  const location = useLocation();
  
  return (
    <NavContainer>
      <Logo to="/">
        <LogoIcon>🚀</LogoIcon>
        Tech Roadmap
      </Logo>
      <NavLinks>
        <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
          Home
        </NavLink>
        <NavLink to="/generator" active={location.pathname === '/generator' ? 1 : 0}>
          Create Roadmap
        </NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;