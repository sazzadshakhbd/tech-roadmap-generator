import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import careerData from '../data/careerData';

// Add the missing shimmer animation
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Add the missing fadeIn animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Also add the missing ProgressBar component
const ProgressBar = styled.div`
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  margin: 1.5rem 0;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress || '0%'};
    background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    border-radius: 3px;
    transition: width 1s ease-in-out;
  }
`;

// Add the missing DecorativeCircle component
const DecorativeCircle = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, ${props => props.theme.colors.primary}10, transparent 70%);
  top: -50px;
  right: -50px;
  z-index: 0;
  opacity: 0.8;
`;

const RoadmapContainer = styled.div`
  max-width: 1000px;
  margin: 3rem auto;
  padding: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 1.5rem auto;
    padding: ${props => props.theme.spacing.md};
  }
`;

const RoadmapHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    border-radius: 2px;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 2.5rem;
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.lightText};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.medium};
  transition: ${props => props.theme.transitions.default};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: linear-gradient(to bottom, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    border-top-left-radius: ${props => props.theme.borderRadius.large};
    border-bottom-left-radius: ${props => props.theme.borderRadius.large};
  }
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.large};
    transform: translateY(-3px);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: ${props => props.theme.colors.primary};
    margin-right: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  }
`;

const SkillsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const SkillItem = styled.li`
  background-color: #f8fafc;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border-left: 4px solid ${props => props.theme.colors.primary};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 40px 40px 0;
    border-color: transparent ${props => props.theme.colors.primary}20 transparent transparent;
  }
  
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(120deg, transparent, ${props => props.theme.colors.primary}10, transparent);
    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite linear paused;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    border-left-color: ${props => props.theme.colors.accent};
    
    &::before {
      animation-play-state: running;
    }
  }
`;

const SkillName = styled.h4`
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: 1.2rem;
`;

const SkillDescription = styled.p`
  color: ${props => props.theme.colors.lightText};
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ResourceSection = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
`;

const ResourceType = styled.h4`
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.spacing.md};
  font-weight: ${props => props.theme.fontWeights.semibold};
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  
  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const ResourceList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ResourceItem = styled.li`
  padding: ${props => props.theme.spacing.md};
  background-color: #f8fafc;
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: ${props => props.theme.transitions.default};
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary}40;
    box-shadow: ${props => props.theme.shadows.small};
    transform: translateY(-2px);
  }
`;

const ResourceLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.medium};
  display: block;
  margin-bottom: 4px;
  position: relative;
  padding-left: 20px;
  
  &::before {
    content: '→';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: ${props => props.theme.transitions.default};
  }
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
    
    &::before {
      left: 5px;
    }
  }
`;

const ResourceMeta = styled.span`
  display: block;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.lightText};
  margin-top: 4px;
`;

const ResourceDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.lightText};
  margin-top: 8px;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing.xxl};
`;

const Button = styled(Link)`
  display: inline-block;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  color: white;
  padding: 0.85rem 2rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: ${props => props.theme.shadows.medium}, 0 0 0 0 rgba(${props => props.theme.colors.primaryRGB}, 0.3);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.95rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.6s;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 15%;
    width: 70%;
    height: 10px;
    background: ${props => props.theme.colors.accent};
    border-radius: 50%;
    filter: blur(12px);
    opacity: 0.6;
    transition: all 0.3s;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: ${props => props.theme.shadows.large}, 0 10px 20px rgba(${props => props.theme.colors.primaryRGB}, 0.4);
    
    &::before {
      left: 100%;
    }
    
    &::after {
      opacity: 0.8;
      filter: blur(15px);
      width: 80%;
      left: 10%;
    }
  }
  
  &:active {
    transform: translateY(-2px) scale(0.98);
  }
`;

const PlanSection = styled(Section)`
  background: linear-gradient(to right bottom, #ffffff, #f8fafc);
`;

const PlanTitle = styled(SectionTitle)`
  &::before {
    background: linear-gradient(135deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.primary});
  }
`;

const PlanList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: ${props => props.theme.spacing.md};
`;

const PlanItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.md};
  padding-left: 24px;
  position: relative;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  max-width: 600px;
  margin: 3rem auto;
`;

const Roadmap = () => {
  const location = useLocation();
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // Move this hook to the top with other state declarations

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const career = params.get('career');
    const skillLevel = params.get('skillLevel');
    const learningStyles = params.get('learningStyles').split(',');
    const timeCommitment = params.get('timeCommitment');

    if (career && skillLevel && careerData[career]) {
      // Get the career and skill level data
      const careerInfo = careerData[career];
      const levelData = careerInfo[skillLevel];
      
      // Filter resources based on learning styles
      const filteredResources = {};
      
      if (levelData && levelData.resources) {
        Object.keys(levelData.resources).forEach(resourceType => {
          if (learningStyles.includes(resourceType) || resourceType === 'projects') {
            filteredResources[resourceType] = levelData.resources[resourceType];
          }
        });
      }
      
      // Adjust content based on time commitment
      let adjustedSkills = [...(levelData?.skills || [])];
      if (timeCommitment === 'minimal') {
        adjustedSkills = adjustedSkills.slice(0, 3);
      } else if (timeCommitment === 'moderate') {
        adjustedSkills = adjustedSkills.slice(0, 4);
      }
      
      setRoadmapData({
        career: careerInfo,
        level: skillLevel,
        skills: adjustedSkills,
        resources: filteredResources,
        learningStyles,
        timeCommitment
      });
    }
    
    setLoading(false);
  }, [location.search]);

  // Add a separate useEffect for progress
  useEffect(() => {
    // Simulate progress loading
    if (!loading && roadmapData) {
      setTimeout(() => setProgress(100), 500);
    }
  }, [loading, roadmapData]);

  if (loading) {
    return (
      <LoadingContainer>
        <div>Loading your personalized roadmap...</div>
      </LoadingContainer>
    );
  }

  if (!roadmapData) {
    return (
      <ErrorContainer>
        <Title>Oops! Something went wrong</Title>
        <Description>We couldn't generate your roadmap. Please try again.</Description>
        <ButtonContainer>
          <Button to="/generator">Back to Generator</Button>
        </ButtonContainer>
      </ErrorContainer>
    );
  }

  const { career, level, skills, resources, learningStyles, timeCommitment } = roadmapData;
  
  // Helper function to format text
  const formatText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Remove the duplicate progress state and useEffect here
  
  return (
    <RoadmapContainer>
      <RoadmapHeader>
        <Title>{career.title} Roadmap</Title>
        <Subtitle>Personalized for {formatText(level)} Level</Subtitle>
        <Description>{career.description}</Description>
        <ProgressBar progress={`${progress}%`} />
      </RoadmapHeader>

      <Section delay="0.2s">
        <DecorativeCircle />
        <SectionTitle>Key Skills to Learn</SectionTitle>
        <SkillsList>
          {skills.map((skill, index) => (
            <SkillItem key={index}>
              <SkillName>{skill.name}</SkillName>
              <SkillDescription>{skill.description}</SkillDescription>
            </SkillItem>
          ))}
        </SkillsList>
      </Section>

      {Object.keys(resources).length > 0 && (
        <Section delay="0.4s">
          <DecorativeCircle />
          <SectionTitle>Learning Resources</SectionTitle>
          {Object.entries(resources).map(([type, items]) => (
            <ResourceSection key={type}>
              <ResourceType>{formatText(type)}</ResourceType>
              <ResourceList>
                {items.map((item, index) => (
                  <ResourceItem key={index}>
                    {item.url ? (
                      <ResourceLink href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.name}
                      </ResourceLink>
                    ) : (
                      <strong>{item.name}</strong>
                    )}
                    {item.author && <ResourceMeta>by {item.author}</ResourceMeta>}
                    {item.platform && <ResourceMeta>on {item.platform}</ResourceMeta>}
                    {item.description && <ResourceDescription>{item.description}</ResourceDescription>}
                  </ResourceItem>
                ))}
              </ResourceList>
            </ResourceSection>
          ))}
        </Section>
      )}

      <PlanSection delay="0.6s">
        <DecorativeCircle />
        <PlanTitle>Your Learning Plan</PlanTitle>
        <p>Based on your {formatText(timeCommitment)} time commitment, here's a suggested approach:</p>
        
        {timeCommitment === 'minimal' && (
          <div>
            <p>With 1-5 hours per week:</p>
            <PlanList>
              <PlanItem>Focus on one skill at a time</PlanItem>
              <PlanItem>Dedicate 2-3 weeks per skill</PlanItem>
              <PlanItem>Prioritize hands-on projects, even if they're small</PlanItem>
            </PlanList>
          </div>
        )}
        
        {timeCommitment === 'moderate' && (
          <div>
            <p>With 5-10 hours per week:</p>
            <PlanList>
              <PlanItem>Learn 2 related skills in parallel</PlanItem>
              <PlanItem>Dedicate 2 weeks per skill pair</PlanItem>
              <PlanItem>Balance theory with practical projects</PlanItem>
            </PlanList>
          </div>
        )}
        
        {timeCommitment === 'dedicated' && (
          <div>
            <p>With 10-20 hours per week:</p>
            <PlanList>
              <PlanItem>Follow a structured curriculum covering multiple skills</PlanItem>
              <PlanItem>Dedicate 1-2 weeks per skill</PlanItem>
              <PlanItem>Build portfolio projects that combine multiple skills</PlanItem>
            </PlanList>
          </div>
        )}
        
        {timeCommitment === 'intensive' && (
          <div>
            <p>With 20+ hours per week:</p>
            <PlanList>
              <PlanItem>Immerse yourself in a bootcamp-style learning approach</PlanItem>
              <PlanItem>Cover all core skills within 2-3 months</PlanItem>
              <PlanItem>Build comprehensive projects that showcase your abilities</PlanItem>
              <PlanItem>Start networking and looking for entry-level opportunities</PlanItem>
            </PlanList>
          </div>
        )}
      </PlanSection>

      <ButtonContainer>
        <Button to="/generator">Create Another Roadmap</Button>
      </ButtonContainer>
    </RoadmapContainer>
  );
};

export default Roadmap;