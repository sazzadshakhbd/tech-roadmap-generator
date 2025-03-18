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
const glowAnimation = keyframes`
  0% { box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
  50% { box-shadow: 0 0 20px ${props => props.theme.colors.primary}40; }
  100% { box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
`;

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
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    animation: ${glowAnimation} 2s infinite;
    transform: translateY(-5px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      ${props => props.theme.colors.primary}10,
      transparent 70%
    );
    opacity: 0.5;
    z-index: -1;
    animation: rotate 20s linear infinite;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 1.5rem auto;
    padding: ${props => props.theme.spacing.md};
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
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
  height: 8px;
  background: rgba(226, 232, 240, 0.4);
  border-radius: 4px;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.1) 25%, 
      rgba(255, 255, 255, 0.2) 50%, 
      rgba(255, 255, 255, 0.1) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite linear;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress || '0%'};
    background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    border-radius: 4px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px ${props => props.theme.colors.primary}40;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
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
  padding: 0.875rem 1.25rem;
  border: 2px solid rgba(226, 232, 240, 0.8);
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  backdrop-filter: blur(8px);
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}30;
    background-color: white;
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary}80;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
  }

  & option {
    background-color: white;
    color: ${props => props.theme.colors.text};
    padding: 0.5rem;
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
  padding: 0.75rem 1.25rem;
  background-color: ${props => props.checked ? props.theme.colors.primary : 'rgba(241, 245, 249, 0.8)'};
  color: ${props => props.checked ? 'white' : props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: ${props => props.checked ? props.theme.fontWeights.medium : props.theme.fontWeights.normal};
  box-shadow: ${props => props.checked ? `0 4px 12px ${props.theme.colors.primary}40` : 'none'};
  backdrop-filter: blur(8px);
  border: 1px solid ${props => props.checked ? props.theme.colors.primary : 'rgba(226, 232, 240, 0.8)'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, ${props => props.theme.colors.primary}20, transparent 50%);
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.6s ease-out;
  }

  &:hover {
    background-color: ${props => props.checked ? props.theme.colors.primary : 'rgba(226, 232, 240, 0.9)'};
    transform: translateY(-2px);
    box-shadow: ${props => props.checked ? `0 6px 16px ${props.theme.colors.primary}50` : '0 4px 8px rgba(0, 0, 0, 0.1)'};

    &::before {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Checkbox = styled.input`
  margin-right: 8px;
  display: none;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 1.1rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.theme.shadows.medium};
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.primary});
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.large};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(1px);
    box-shadow: ${props => props.theme.shadows.small};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}40;
  }
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
    
    // Create a new form data object
    let newFormData = { ...formData, [name]: value };
    
    // Reset subsequent steps when changing a previous step
    if (name === 'career') {
      // If career changes, reset skill level, learning styles, and time commitment
      newFormData.skillLevel = '';
      newFormData.learningStyles = [];
      newFormData.timeCommitment = '';
    } else if (name === 'skillLevel') {
      // If skill level changes, reset learning styles and time commitment
      newFormData.learningStyles = [];
      newFormData.timeCommitment = '';
    } else if (name === 'learningStyles') {
      // If learning styles change, reset time commitment
      newFormData.timeCommitment = '';
    }
    
    setFormData(newFormData);
  };

  const handleCheckboxChange = (style) => {
    const updatedStyles = formData.learningStyles.includes(style)
      ? formData.learningStyles.filter(s => s !== style)
      : [...formData.learningStyles, style];
    
    // Reset time commitment if learning styles change
    setFormData({
      ...formData,
      learningStyles: updatedStyles,
      timeCommitment: '' // Reset time commitment when learning styles change
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
            disabled={!formData.career}
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
                style={{ opacity: !formData.skillLevel ? 0.5 : 1, pointerEvents: !formData.skillLevel ? 'none' : 'auto' }}
              >
                <Checkbox 
                  type="checkbox" 
                  checked={formData.learningStyles.includes(style.toLowerCase())}
                  onChange={() => handleCheckboxChange(style.toLowerCase())}
                  disabled={!formData.skillLevel}
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
            disabled={formData.learningStyles.length === 0}
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