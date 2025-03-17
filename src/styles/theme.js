const theme = {
  colors: {
    primary: '#6366F1', // Indigo
    secondary: '#4F46E5', // Darker indigo
    accent: '#EC4899', // Pink
    background: '#F9FAFB', // Light gray background
    card: '#FFFFFF',
    text: '#1F2937', // Dark gray
    lightText: '#6B7280', // Medium gray
    success: '#10B981', // Green
    warning: '#F59E0B', // Amber
    error: '#EF4444', // Red
    info: '#3B82F6', // Blue
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    wide: '1200px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    small: '0.375rem',
    medium: '0.5rem',
    large: '0.75rem',
    xl: '1rem',
    round: '50%',
  },
  shadows: {
    small: '0 1px 2px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  transitions: {
    default: 'all 0.2s ease-in-out',
    slow: 'all 0.3s ease-in-out',
    fast: 'all 0.1s ease-in-out',
  },
};

export default theme;