import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  text-align: center;
  padding: 2rem;
`;

const HeroSection = styled.div`
  max-width: 900px;
  margin-bottom: 4rem;
`;

// Update Title
const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.lightText};
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.875rem 1.75rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: 1.1rem;
  transition: ${props => props.theme.transitions.default};
  box-shadow: ${props => props.theme.shadows.medium};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

// Update CareerList
const CareerList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  width: 100%;
  max-width: 1000px;
  margin-top: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const CareerCard = styled.div`
  background-color: ${props => props.theme.colors.card};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  text-align: center;
  transition: ${props => props.theme.transitions.default};
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
    border-color: ${props => props.theme.colors.primary}20;
  }
`;

const IconContainer = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}80, ${props => props.theme.colors.accent}80);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.round};
  margin: 0 auto 1.5rem;
`;

const CareerTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 1.25rem;
`;

const Home = () => {
  const careers = [
    { title: 'Frontend Developer', icon: '🎨', description: 'Build beautiful user interfaces and interactive web experiences' },
    { title: 'Backend Developer', icon: '⚙️', description: 'Create robust server-side applications and APIs' },
    { title: 'Data Scientist', icon: '📊', description: 'Analyze data and build machine learning models' },
    { title: 'DevOps Engineer', icon: '🔄', description: 'Streamline development and deployment processes' },
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <Title>Tech Career Roadmap Generator</Title>
        <Subtitle>
          Create a personalized learning path for your tech career journey based on your skill level and preferred learning style.
        </Subtitle>
        <Button to="/generator">Create Your Roadmap</Button>
      </HeroSection>
      
      <CareerList>
        {careers.map((career, index) => (
          <CareerCard key={index}>
            <IconContainer>{career.icon}</IconContainer>
            <CareerTitle>{career.title}</CareerTitle>
            <p>{career.description}</p>
          </CareerCard>
        ))}
      </CareerList>
    </HomeContainer>
  );
};

export default Home;