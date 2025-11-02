import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Button,
  Link,
  useTheme,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import DomainIcon from '@mui/icons-material/Domain';
import { brandColor } from '../../styles/InputStyles';

// Code block component
const CodeBlock = ({ children, language = 'javascript' }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : brandColor.background,
        p: 2,
        borderRadius: 1,
        overflowX: 'auto',
        my: 2,
        fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
        fontSize: '0.875rem',
        position: 'relative',
      }}
    >
      <Chip 
        label={language} 
        size="small" 
        icon={<CodeIcon fontSize="small" />} 
        sx={{ 
          position: 'absolute', 
          top: 8, 
          right: 8,
          backgroundColor: brandColor.primary,
          color: '#fff'
        }}
      />
      <Box component="pre" sx={{ m: 0 }}>
        <Box component="code" sx={{ color: theme.palette.text.primary }}>
          {children}
        </Box>
      </Box>
    </Paper>
  );
};

const CustomDomains = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        fontWeight="bold"
        sx={{ color: brandColor.primary }}
      >
        Custom Domains
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="body1" paragraph>
        With our Premium and Enterprise plans, you can use your own custom domain for shortened URLs.
        This allows you to maintain brand consistency and increase trust with your audience.
      </Typography>

      <Paper sx={{ p: 3, mb: 4, display: 'flex', alignItems: 'center' }} variant="outlined">
        <DomainIcon sx={{ fontSize: 40, mr: 2, color: brandColor.primary }} />
        <Box>
          <Typography variant="h6" gutterBottom sx={{ color: brandColor.primary }}>
            Custom Domain Benefits
          </Typography>
          <Typography variant="body2">
            Using your own domain (e.g., short.yourbrand.com) increases click-through rates by up to 34% compared to generic short URLs.
          </Typography>
        </Box>
      </Paper>

      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ mt: 4, color: brandColor.primary }}
      >
        Setting Up Your Custom Domain
      </Typography>
      
      <Stepper 
        activeStep={activeStep} 
        orientation="vertical" 
        sx={{ 
          mt: 3,
          '& .MuiStepIcon-root.Mui-active': {
            color: brandColor.primary,
          },
          '& .MuiStepIcon-root.Mui-completed': {
            color: brandColor.secondary,
          },
          '& .MuiStepConnector-line': {
            borderColor: '#e0e0e0',
          }
        }}
      >
        <Step>
          <StepLabel>
            <Typography variant="subtitle1" sx={{ color: activeStep >= 0 ? brandColor.primary : 'inherit' }}>
              Choose your domain or subdomain
            </Typography>
          </StepLabel>
          <StepContent>
            <Typography variant="body1" paragraph>
              Decide whether you want to use a dedicated domain (e.g., <code>link.yourbrand.com</code>) or a subdomain of your existing website (e.g., <code>short.yourbrand.com</code>).
            </Typography>
            <Typography variant="body1" paragraph>
              We recommend using a subdomain of your main website for better brand recognition and SEO benefits.
            </Typography>
            <Alert 
              severity="info" 
              sx={{ 
                my: 2,
                borderLeft: `4px solid ${brandColor.primary}`,
                '& .MuiAlert-icon': {
                  color: brandColor.primary
                }
              }}
            >
              <Typography variant="body2">
                Keep it short! Shorter domains make for shorter URLs, which are easier to share and remember.
              </Typography>
            </Alert>
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ 
                  mt: 1, 
                  mr: 1,
                  backgroundColor: brandColor.primary,
                  '&:hover': {
                    backgroundColor: '#00796b', // Darker shade
                  }
                }}
              >
                Continue
              </Button>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>
            <Typography variant="subtitle1" sx={{ color: activeStep >= 1 ? brandColor.primary : 'inherit' }}>
              Add your domain in the dashboard
            </Typography>
          </StepLabel>
          <StepContent>
            <Typography variant="body1" paragraph>
              1. Log in to your ShortURL dashboard
            </Typography>
            <Typography variant="body1" paragraph>
              2. Go to Settings → Custom Domains
            </Typography>
            <Typography variant="body1" paragraph>
              3. Click "Add Domain" and enter your domain or subdomain
            </Typography>
            <Typography variant="body1" paragraph>
              4. Our system will verify that you own the domain and provide you with the necessary DNS records to add
            </Typography>
            
            <Alert 
              severity="warning" 
              sx={{ 
                my: 2,
                borderLeft: `4px solid #ff9800`,
                '& .MuiAlert-icon': {
                  color: '#ff9800'
                }
              }}
            >
              <Typography variant="body2">
                Make sure you have access to manage DNS records for your domain before proceeding.
              </Typography>
            </Alert>
            
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ 
                  mt: 1, 
                  mr: 1,
                  backgroundColor: brandColor.primary,
                  '&:hover': {
                    backgroundColor: '#00796b', // Darker shade
                  }
                }}
              >
                Continue
              </Button>
              <Button
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>
            <Typography variant="subtitle1" sx={{ color: activeStep >= 2 ? brandColor.primary : 'inherit' }}>
              Configure DNS records
            </Typography>
          </StepLabel>
          <StepContent>
            <Typography variant="body1" paragraph>
              You'll need to add the following DNS records to your domain:
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, my: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: brandColor.primary }}>
                CNAME Record
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 'medium' }}>Host:</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>@</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 'medium' }}>Points to:</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>cname.shorturl.com</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                Note: If you're using a subdomain, the host would be the subdomain name (e.g., "short").
              </Typography>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, my: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: brandColor.primary }}>
                TXT Record for Verification
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 'medium' }}>Host:</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>_shorturl-verify</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 'medium' }}>Value:</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>verify_[your-unique-code]</Typography>
              </Box>
            </Paper>

            <Typography variant="body1" paragraph>
              The exact values will be provided in your dashboard after adding the domain.
            </Typography>

            <Alert 
              severity="info" 
              sx={{ 
                my: 2,
                borderLeft: `4px solid ${brandColor.primary}`,
                '& .MuiAlert-icon': {
                  color: brandColor.primary
                }
              }}
            >
              <Typography variant="body2">
                DNS changes can take up to 48 hours to propagate, but typically take effect within a few hours.
              </Typography>
            </Alert>
            
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ 
                  mt: 1, 
                  mr: 1,
                  backgroundColor: brandColor.primary,
                  '&:hover': {
                    backgroundColor: '#00796b', // Darker shade
                  }
                }}
              >
                Continue
              </Button>
              <Button
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>
            <Typography variant="subtitle1" sx={{ color: activeStep >= 3 ? brandColor.primary : 'inherit' }}>
              Verify and activate your domain
            </Typography>
          </StepLabel>
          <StepContent>
            <Typography variant="body1" paragraph>
              Once you've added the DNS records:
            </Typography>
            <Typography variant="body1" paragraph>
              1. Return to the Custom Domains section in your dashboard
            </Typography>
            <Typography variant="body1" paragraph>
              2. Click "Verify Domain" next to your domain
            </Typography>
            <Typography variant="body1" paragraph>
              3. Our system will check if the DNS records are properly configured
            </Typography>
            <Typography variant="body1" paragraph>
              4. Once verified, your domain will be activated and ready to use
            </Typography>
            
            <Alert 
              severity="success" 
              sx={{ 
                my: 2,
                borderLeft: `4px solid ${brandColor.secondary}`,
                '& .MuiAlert-icon': {
                  color: brandColor.secondary
                }
              }}
            >
              <Typography variant="body2">
                After verification, all new short URLs can be created with your custom domain!
              </Typography>
            </Alert>
            
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ 
                  mt: 1, 
                  mr: 1,
                  backgroundColor: brandColor.primary,
                  '&:hover': {
                    backgroundColor: '#00796b', // Darker shade
                  }
                }}
              >
                Continue
              </Button>
              <Button
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>
            <Typography variant="subtitle1" sx={{ color: activeStep >= 4 ? brandColor.primary : 'inherit' }}>
              Start using your custom domain
            </Typography>
          </StepLabel>
          <StepContent>
            <Typography variant="body1" paragraph>
              Now you can start creating short URLs with your custom domain:
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: brandColor.secondary }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Dashboard" 
                  secondary="When creating a new short URL, select your custom domain from the dropdown menu."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: brandColor.secondary }} />
                </ListItemIcon>
                <ListItemText 
                  primary="API" 
                  secondary="You can also use our API to create short URLs with your custom domain."
                />
              </ListItem>
            </List>
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  );
};

export default CustomDomains;