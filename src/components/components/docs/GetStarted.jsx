import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Divider,
  Alert,
  Button,
  Link,
  Stack,
  Chip,
  useTheme
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

const GetStarted = () => {
  return (
    <Box>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        fontWeight="bold"
        sx={{ color: brandColor.primary }}
      >
        Getting Started with ShortURL
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="body1" paragraph>
        Welcome to ShortURL! This guide will help you get started with our URL shortening service
        and show you how to create your first shortened URL.
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }} variant="outlined">
        <Typography variant="h6" gutterBottom sx={{ color: brandColor.primary }}>
          Quick Start Checklist
        </Typography>
        <Stack spacing={1}>
          <Box display="flex" alignItems="center">
            <CheckCircleIcon sx={{ mr: 1, color: brandColor.secondary }} />
            <Typography>Create an account or sign in</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CheckCircleIcon sx={{ mr: 1, color: brandColor.secondary }} />
            <Typography>Generate your first short URL</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CheckCircleIcon sx={{ mr: 1, color: brandColor.secondary }} />
            <Typography>Track clicks and analytics</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CheckCircleIcon sx={{ mr: 1, color: brandColor.secondary }} />
            <Typography>Customize your URLs (optional)</Typography>
          </Box>
        </Stack>
      </Paper>

      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ mt: 4, color: brandColor.primary }}
      >
        1. Creating Your First Short URL
      </Typography>
      
      <Typography variant="body1" paragraph>
        Creating a short URL is simple. You can use our dashboard interface or the API.
      </Typography>
      
      <Typography variant="h6" gutterBottom sx={{ color: brandColor.primary }}>
        Using the Dashboard
      </Typography>
      
      <Typography variant="body1" paragraph>
        1. Log in to your ShortURL dashboard
      </Typography>
      <Typography variant="body1" paragraph>
        2. Click on the "Create Link" button
      </Typography>
      <Typography variant="body1" paragraph>
        3. Enter your long URL in the input field
      </Typography>
      <Typography variant="body1" paragraph>
        4. (Optional) Customize your short URL or add a custom slug
      </Typography>
      <Typography variant="body1" paragraph>
        5. Click "Shorten" to generate your short URL
      </Typography>

      <Alert 
        severity="info" 
        sx={{ 
          my: 3,
          borderLeft: `4px solid ${brandColor.primary}`,
          '& .MuiAlert-icon': {
            color: brandColor.primary
          }
        }}
      >
        Pro Tip: You can also create QR codes for your shortened URLs directly from the dashboard!
      </Alert>

      <Typography variant="h6" gutterBottom sx={{ color: brandColor.primary }}>
        Using the API
      </Typography>
      
      <Typography variant="body1" paragraph>
        You can also create short URLs programmatically using our API:
      </Typography>

      <CodeBlock language="javascript">
{`// Example using fetch API
fetch('https://api.shorturl.com/v1/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    longUrl: 'https://example.com/very/long/url/that/needs/shortening',
    customSlug: 'my-custom-url' // Optional
  })
})
.then(response => response.json())
.then(data => console.log(data.shortUrl))`}
      </CodeBlock>

      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ mt: 4, color: brandColor.primary }}
      >
        2. Tracking and Analytics
      </Typography>
      
      <Typography variant="body1" paragraph>
        Every short URL comes with built-in analytics. You can track:
      </Typography>

      <Box component="ul" sx={{ pl: 4 }}>
        <Box component="li">
          <Typography variant="body1">Click count and click-through rates</Typography>
        </Box>
        <Box component="li">
          <Typography variant="body1">Geographic location of visitors</Typography>
        </Box>
        <Box component="li">
          <Typography variant="body1">Referrer sources</Typography>
        </Box>
        <Box component="li">
          <Typography variant="body1">Device and browser information</Typography>
        </Box>
        <Box component="li">
          <Typography variant="body1">Time-based analytics (hourly, daily, monthly)</Typography>
        </Box>
      </Box>

      <Typography variant="body1" paragraph sx={{ mt: 2 }}>
        To view analytics for a specific URL:
      </Typography>
      
      <Typography variant="body1" paragraph>
        1. Go to your dashboard
      </Typography>
      <Typography variant="body1" paragraph>
        2. Find the URL in your links list
      </Typography>
      <Typography variant="body1" paragraph>
        3. Click on "Analytics" or the stats icon
      </Typography>

      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ mt: 4, color: brandColor.primary }}
      >
        3. Advanced Features
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ color: brandColor.primary }}>
        Custom Domains
      </Typography>
      
      <Typography variant="body1" paragraph>
        With our premium plans, you can use your own domain for shortened URLs.
        See the <Link href="#" sx={{ color: brandColor.primary }}>Custom Domains</Link> section for setup instructions.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ color: brandColor.primary }}>
        UTM Parameters
      </Typography>
      
      <Typography variant="body1" paragraph>
        Add UTM parameters to your URLs for better campaign tracking:
      </Typography>

      <CodeBlock language="javascript">
{`// Example with UTM parameters
fetch('https://api.shorturl.com/v1/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    longUrl: 'https://example.com/product',
    utmParams: {
      source: 'newsletter',
      medium: 'email',
      campaign: 'summer_sale'
    }
  })
})`}
      </CodeBlock>

      <Typography variant="h6" gutterBottom sx={{ color: brandColor.primary }}>
        QR Codes
      </Typography>
      
      <Typography variant="body1" paragraph>
        Every short URL automatically generates a QR code that you can download and use in your marketing materials.
      </Typography>

      <Box sx={{ mt: 4, mb: 2 }}>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: brandColor.primary,
            '&:hover': {
              backgroundColor: '#00796b', // Darker shade
            }
          }}
        >
          Create Your First Short URL
        </Button>
      </Box>

      <Alert 
        severity="success" 
        sx={{ 
          mt: 4,
          borderLeft: `4px solid ${brandColor.secondary}`,
          '& .MuiAlert-icon': {
            color: brandColor.secondary
          }
        }}
      >
        <Typography variant="body1">
          Need help? Contact our support team at support@shorturl.com
        </Typography>
      </Alert>
    </Box>
  );
};

export default GetStarted;