import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Chip,
  Grid,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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

const RateLimits = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        fontWeight="bold"
        sx={{ color: brandColor.primary }}
      >
        Rate Limits
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="body1" paragraph>
        To ensure service stability and prevent abuse, ShortURL implements rate limits on API requests.
        These limits vary based on your subscription plan and are applied on a per-API key basis.
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
        icon={<InfoIcon />}
      >
        <Typography variant="body2">
          Rate limits are reset hourly. All rate limits are based on UTC time.
        </Typography>
      </Alert>

      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ mt: 4, color: brandColor.primary }}
      >
        Rate Limit By Plan
      </Typography>
      
      <TableContainer component={Paper} variant="outlined" sx={{ my: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: brandColor.background }}>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Plan</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>URLs Created (per hour)</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>API Requests (per hour)</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Concurrent Requests</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Free</TableCell>
              <TableCell>50</TableCell>
              <TableCell>100</TableCell>
              <TableCell>5</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Basic</TableCell>
              <TableCell>500</TableCell>
              <TableCell>1,000</TableCell>
              <TableCell>10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Premium</TableCell>
              <TableCell>5,000</TableCell>
              <TableCell>10,000</TableCell>
              <TableCell>25</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Enterprise</TableCell>
              <TableCell>Unlimited</TableCell>
              <TableCell>Unlimited</TableCell>
              <TableCell>100</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ mt: 4, color: brandColor.primary }}
      >
        Rate Limit By Endpoint
      </Typography>
      
      <Typography variant="body1" paragraph>
        Different API endpoints have different rate limits to ensure fair usage:
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ my: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: brandColor.background }}>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Endpoint</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Method</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Free Plan</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Basic Plan</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Premium Plan</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>/shorten</TableCell>
              <TableCell>
                <Chip 
                  label="POST" 
                  size="small" 
                  sx={{ 
                    backgroundColor: brandColor.primary,
                    color: '#fff'
                  }} 
                />
              </TableCell>
              <TableCell>50/hour</TableCell>
              <TableCell>500/hour</TableCell>
              <TableCell>5,000/hour</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>/urls</TableCell>
              <TableCell>
                <Chip 
                  label="GET" 
                  size="small" 
                  sx={{ 
                    backgroundColor: brandColor.secondary,
                    color: '#fff'
                  }} 
                />
              </TableCell>
              <TableCell>100/hour</TableCell>
              <TableCell>1,000/hour</TableCell>
              <TableCell>10,000/hour</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>/urls/{'{id}'}</TableCell>
              <TableCell>
                <Chip 
                  label="GET" 
                  size="small" 
                  sx={{ 
                    backgroundColor: brandColor.secondary,
                    color: '#fff'
                  }} 
                />
              </TableCell>
              <TableCell>100/hour</TableCell>
              <TableCell>1,000/hour</TableCell>
              <TableCell>10,000/hour</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>/urls/{'{id}'}</TableCell>
              <TableCell>
                <Chip 
                  label="DELETE" 
                  size="small" 
                  color="error" 
                />
              </TableCell>
              <TableCell>25/hour</TableCell>
              <TableCell>250/hour</TableCell>
              <TableCell>2,500/hour</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>/analytics/{'{id}'}</TableCell>
              <TableCell>
                <Chip 
                  label="GET" 
                  size="small" 
                  sx={{ 
                    backgroundColor: brandColor.secondary,
                    color: '#fff'
                  }} 
                />
              </TableCell>
              <TableCell>50/hour</TableCell>
              <TableCell>500/hour</TableCell>
              <TableCell>5,000/hour</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>/qr/{'{id}'}</TableCell>
              <TableCell>
                <Chip 
                  label="GET" 
                  size="small" 
                  sx={{ 
                    backgroundColor: brandColor.secondary,
                    color: '#fff'
                  }} 
                />
              </TableCell>
              <TableCell>50/hour</TableCell>
              <TableCell>500/hour</TableCell>
              <TableCell>5,000/hour</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>/qr/customize</TableCell>
              <TableCell>
                <Chip 
                  label="POST" 
                  size="small" 
                  sx={{ 
                    backgroundColor: brandColor.primary,
                    color: '#fff'
                  }} 
                />
              </TableCell>
              <TableCell>10/hour</TableCell>
              <TableCell>100/hour</TableCell>
              <TableCell>1,000/hour</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ mt: 4, color: brandColor.primary }}
      >
        Rate Limit Headers
      </Typography>
      
      <Typography variant="body1" paragraph>
        All API responses include headers that provide information about your current rate limit status:
      </Typography>

      <CodeBlock language="http">
{`HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1623766800`}
      </CodeBlock>

      <TableContainer component={Paper} variant="outlined" sx={{ my: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: brandColor.background }}>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Header</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Description</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>X-RateLimit-Limit</TableCell>
              <TableCell>The maximum number of requests allowed in the current period</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>X-RateLimit-Remaining</TableCell>
              <TableCell>The number of requests remaining in the current period</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>X-RateLimit-Reset</TableCell>
              <TableCell>The time at which the current rate limit window resets (Unix timestamp)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ mt: 4, color: brandColor.primary }}
      >
        Handling Rate Limit Errors
      </Typography>
      
      <Typography variant="body1" paragraph>
        When you exceed a rate limit, the API will return a 429 Too Many Requests response with a JSON error message:
      </Typography>

      <CodeBlock language="json">
{`{
  "error": true,
  "code": "rate_limit_exceeded",
  "message": "Rate limit exceeded. Please try again later.",
  "status": 429,
  "details": {
    "limit": 100,
    "remaining": 0,
    "reset": 1623766800
  }
}`}
      </CodeBlock>

      <Alert 
        severity="warning" 
        sx={{ 
          my: 3,
          borderLeft: `4px solid #ff9800`,
          '& .MuiAlert-icon': {
            color: '#ff9800'
          }
        }}
        icon={<WarningIcon />}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, color: '#d84315' }}>
          Best Practices for Handling Rate Limits
        </Typography>
        <Typography variant="body2">
          • Implement exponential backoff for retries<br />
          • Cache responses when possible to reduce API calls<br />
          • Monitor your usage with the rate limit headers<br />
          • Distribute requests evenly instead of sending in bursts
        </Typography>
      </Alert>

      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ mt: 4, color: brandColor.primary }}
      >
        Rate Limit Implementation Examples
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: brandColor.primary }}>
                JavaScript Example
              </Typography>
              <CodeBlock language="javascript">
{`// Example of handling rate limits with exponential backoff
async function makeApiRequest(url, options, retries = 3, backoff = 300) {
  try {
    const response = await fetch(url, options);
    
    // Check rate limit headers
    const remaining = parseInt(response.headers.get('X-RateLimit-Remaining') || '0');
    console.log(\`Rate limit remaining: \${remaining}\`);
    
    if (response.status === 429 && retries > 0) {
      // Rate limited, implement backoff
      console.log(\`Rate limited. Retrying in \${backoff}ms\`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      
      // Retry with exponential backoff
      return makeApiRequest(url, options, retries - 1, backoff * 2);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}`}
              </CodeBlock>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: brandColor.primary }}>
                Python Example
              </Typography>
              <CodeBlock language="python">
{`import requests
import time

def make_api_request(url, headers, params=None, retries=3, backoff=0.3):
    """Make API request with rate limit handling"""
    for attempt in range(retries):
        response = requests.get(url, headers=headers, params=params)
        
        # Check rate limit headers
        remaining = int(response.headers.get('X-RateLimit-Remaining', 0))
        print(f"Rate limit remaining: {remaining}")
        
        if response.status_code == 429 and attempt < retries - 1:
            # Rate limited, implement backoff
            wait_time = backoff * (2 ** attempt)
            print(f"Rate limited. Retrying in {wait_time:.1f}s")
            time.sleep(wait_time)
            continue
            
        # Return successful response or final error
        response.raise_for_status()
        return response.json()
        
    raise Exception("Max retries exceeded")`}
              </CodeBlock>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ mt: 4, color: brandColor.primary }}
      >
        Increasing Your Rate Limits
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
        <SpeedIcon sx={{ fontSize: 40, mr: 2, color: brandColor.primary }} />
        <Box>
          <Typography variant="h6" gutterBottom sx={{ color: brandColor.primary }}>
            Need Higher Limits?
          </Typography>
          <Typography variant="body2">
            If you need higher rate limits than what's provided in our standard plans, please contact our sales team to discuss custom Enterprise solutions tailored to your specific needs.
          </Typography>
        </Box>
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
        icon={<CheckCircleOutlineIcon />}
      >
        <Typography variant="body2">
          Enterprise customers can request custom rate limits and dedicated infrastructure for high-volume applications.
        </Typography>
      </Alert>
    </Box>
  );
};

export default RateLimits;