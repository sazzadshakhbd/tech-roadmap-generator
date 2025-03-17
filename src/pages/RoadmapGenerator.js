import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import careerData from '../data/careerData';

// Add animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Update FormContainer
const FormContainer = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 1.5rem auto;
    padding: ${props => props.theme.spacing.md};
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};
  font-size: 2.25rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    border-radius: 2px;
  }
`;

// Add a progress bar component
const ProgressBar = styled.div`
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress || '0%'};
    background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    border-radius: 3px;
    transition: width 0.5s ease-in-out;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  
  &::before {
    content: '${props => props.icon || ''}';
    margin-right: ${props => props.icon ? '8px' : '0'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 1rem;
  background-color: white;
  transition: ${props => props.theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}30;
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary}80;
  }
`;

// Update CheckboxGroup
const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.625rem 1rem;
  background-color: ${props => props.checked ? props.theme.colors.primary : '#f1f5f9'};
  color: ${props => props.checked ? 'white' : props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all 0.3s ease;
  font-weight: ${props => props.checked ? props.theme.fontWeights.medium : props.theme.fontWeights.normal};
  box-shadow: ${props => props.checked ? props.theme.shadows.small : 'none'};

  &:hover {
    background-color: ${props => props.checked ? props.theme.colors.primary : '#e2e8f0'};
    transform: translateY(-2px);
    box-shadow: ${props => props.checked ? props.theme.shadows.medium : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  }
`;

const Checkbox = styled.input`
  margin-right: 8px;
  display: none;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 1.1rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadows.medium};
  margin-top: ${props => props.theme.spacing.lg};
  position: relative;
  overflow: hidden;
  
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

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.large};
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    background: linear-gradient(45deg, #a0aec0, #cbd5e1);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &::before {
      display: none;
    }
  }
`;

// Update StepIndicator
const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Step = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${props => props.theme.borderRadius.round};
  background-color: ${props => props.active ? props.theme.colors.primary : '#f1f5f9'};
  color: ${props => props.active ? 'white' : props.theme.colors.lightText};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeights.semibold};
  margin: 0 0.5rem;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? props.theme.shadows.small : 'none'};
  animation: ${props => props.active ? pulse : 'none'} 2s infinite ease-in-out;
  
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 2rem;
    background-color: ${props => props.completed ? props.theme.colors.primary : '#e2e8f0'};
    right: -2rem;
    top: 50%;
    transform: translateY(-50%);
    transition: background-color 0.3s ease;
  }
  
  &:last-child::after {
    display: none;
  }
`;

const StepLabel = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.lightText};
  margin-top: 0.5rem;
  font-weight: ${props => props.active ? props.theme.fontWeights.medium : props.theme.fontWeights.normal};
  transition: all 0.3s ease;
`;

const RoadmapGenerator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    career: '',
    skillLevel: '',
    learningStyles: [],
    timeCommitment: '',
  });
  const [progress, setProgress] = useState(0);

  // Calculate progress whenever form data changes
  useEffect(() => {
    let progressCount = 0;
    if (formData.career) progressCount += 25;
    if (formData.skillLevel) progressCount += 25;
    if (formData.learningStyles.length > 0) progressCount += 25;
    if (formData.timeCommitment) progressCount += 25;
    setProgress(progressCount);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (style) => {
    const updatedStyles = formData.learningStyles.includes(style)
      ? formData.learningStyles.filter(s => s !== style)
      : [...formData.learningStyles, style];
    
    setFormData({
      ...formData,
      learningStyles: updatedStyles,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(formData).toString();
    navigate(`/roadmap?${queryParams}`);
  };

  const isFormValid = formData.career && formData.skillLevel && formData.learningStyles.length > 0 && formData.timeCommitment;

  return (
    <FormContainer>
      <Title>Create Your Personalized Roadmap</Title>
      <ProgressBar progress={`${progress}%`} />
      
      <StepIndicator>
        <div>
          <Step active={true} completed={true}>1</Step>
          <StepLabel active={true}>Career</StepLabel>
        </div>
        <div>
          <Step active={!!formData.career} completed={!!formData.skillLevel}>2</Step>
          <StepLabel active={!!formData.career}>Skills</StepLabel>
        </div>
        <div>
          <Step active={!!formData.skillLevel} completed={formData.learningStyles.length > 0}>3</Step>
          <StepLabel active={!!formData.skillLevel}>Learning</StepLabel>
        </div>
        <div>
          <Step active={formData.learningStyles.length > 0} completed={!!formData.timeCommitment}>4</Step>
          <StepLabel active={formData.learningStyles.length > 0}>Time</StepLabel>
        </div>
      </StepIndicator>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="career" icon="🚀">Choose a Career Path</Label>
          <Select 
            id="career" 
            name="career" 
            value={formData.career} 
            onChange={handleChange}
            required
          >
            <option value="">Select a career path</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="datascience">Data Scientist</option>
            <option value="devops">DevOps Engineer</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="skillLevel" icon="📊">Your Current Skill Level</Label>
          <Select 
            id="skillLevel" 
            name="skillLevel" 
            value={formData.skillLevel} 
            onChange={handleChange}
            required
          >
            <option value="">Select your skill level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label icon="📚">Preferred Learning Styles</Label>
          <CheckboxGroup>
            {['Videos', 'Articles', 'Books', 'Projects', 'Courses'].map(style => (
              <CheckboxLabel 
                key={style} 
                checked={formData.learningStyles.includes(style.toLowerCase())}
              >
                <Checkbox 
                  type="checkbox" 
                  checked={formData.learningStyles.includes(style.toLowerCase())}
                  onChange={() => handleCheckboxChange(style.toLowerCase())}
                />
                {style}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="timeCommitment" icon="⏱️">Time Commitment</Label>
          <Select 
            id="timeCommitment" 
            name="timeCommitment" 
            value={formData.timeCommitment} 
            onChange={handleChange}
            required
          >
            <option value="">Select time commitment</option>
            <option value="minimal">Minimal (1-5 hours/week)</option>
            <option value="moderate">Moderate (5-10 hours/week)</option>
            <option value="dedicated">Dedicated (10-20 hours/week)</option>
            <option value="intensive">Intensive (20+ hours/week)</option>
          </Select>
        </FormGroup>

        <Button type="submit" disabled={!isFormValid}>
          Generate Your Roadmap
        </Button>
      </form>
    </FormContainer>
  );
};

export default RoadmapGenerator;