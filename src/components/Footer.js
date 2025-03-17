import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: 4rem;
  padding: 2rem 1rem;
  background-color: ${props => props.theme.colors.card};
  text-align: center;
  border-top: 1px solid #e2e8f0;
  width: 100%;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem 0.75rem;
    margin-top: 2rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.lightText};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 0.75rem;
  }
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.lightText};
  font-size: 1.25rem;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          © {currentYear} Tech Career Roadmap Generator. All rights reserved.
        </FooterText>
        <FooterText>
          Created to help aspiring developers find their path in tech.
        </FooterText>
        <SocialLinks>
          <SocialLink href="#" title="GitHub">
            <span role="img" aria-label="GitHub">📂</span>
          </SocialLink>
          <SocialLink href="#" title="Twitter">
            <span role="img" aria-label="Twitter">🐦</span>
          </SocialLink>
          <SocialLink href="#" title="LinkedIn">
            <span role="img" aria-label="LinkedIn">💼</span>
          </SocialLink>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;