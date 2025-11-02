import React from "react";
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
  Chip,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { brandColor } from "../../styles/InputStyles";

// Code block component
const CodeBlock = ({ children, language = "javascript" }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? "#1e1e1e" : brandColor.background,
        p: 2,
        borderRadius: 1,
        overflowX: "auto",
        my: 2,
        fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
        fontSize: "0.875rem",
        position: "relative",
      }}
    >
      <Chip
        label={language}
        size="small"
        icon={<CodeIcon fontSize="small" />}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: brandColor.primary,
          color: "#fff",
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

// Endpoint component
const Endpoint = ({
  method,
  path,
  description,
  requestParams,
  responseExample,
}) => {
  const theme = useTheme();
  const methodColors = {
    GET: brandColor.secondary,
    POST: brandColor.primary,
    PUT: "#ff9800",
    DELETE: "#f44336",
    PATCH: "#2196f3",
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Chip
          label={method}
          sx={{
            mr: 2,
            fontWeight: "bold",
            backgroundColor: methodColors[method],
            color: "#fff",
          }}
        />
        <Typography
          variant="h6"
          component="span"
          sx={{ fontFamily: "monospace", fontWeight: "medium" }}
        >
          {path}
        </Typography>
      </Box>

      <Typography variant="body1" paragraph>
        {description}
      </Typography>

      {requestParams && (
        <>
          <Typography
            variant="subtitle1"
            sx={{ mt: 2, fontWeight: "medium", color: brandColor.primary }}
          >
            Request Parameters
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ my: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
                  <TableCell>
                    <Typography variant="subtitle2">Parameter</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">Type</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">Required</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">Description</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requestParams.map((param, index) => (
                  <TableRow key={index}>
                    <TableCell>{param.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={param.type}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: brandColor.primary,
                          color: brandColor.primary,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {param.required ? (
                        <Chip
                          label="Required"
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: brandColor.primary,
                            color: brandColor.primary,
                          }}
                        />
                      ) : (
                        <Chip
                          label="Optional"
                          size="small"
                          variant="outlined"
                          color="default"
                        />
                      )}
                    </TableCell>
                    <TableCell>{param.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {responseExample && (
        <>
          <Typography
            variant="subtitle1"
            sx={{ mt: 3, fontWeight: "medium", color: brandColor.primary }}
          >
            Response Example
          </Typography>
          <CodeBlock language="json">{responseExample}</CodeBlock>
        </>
      )}
    </Box>
  );
};

const APISReference = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
        API Reference
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Typography variant="body1" paragraph>
        Our RESTful API allows you to programmatically create, manage, and track
        shortened URLs. All API requests should be made to the base URL:{" "}
        <code>https://api.shorturl.com/v1</code>
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ mt: 3, color: brandColor.primary }}
      >
        Authentication
      </Typography>

      <Typography variant="body1" paragraph>
        All API requests require authentication using an API key. You can
        generate an API key from your dashboard. Include your API key in the
        request headers:
      </Typography>

      <CodeBlock language="javascript">
        {`// Example API request with authentication
const response = await fetch('https://api.shorturl.com/v1/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    longUrl: 'https://example.com/very/long/url'
  })
});`}
      </CodeBlock>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="API endpoints tabs"
          autoScroll
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: brandColor.primary,
            },
            "& .MuiTab-root": {
              color: theme.palette.text.secondary,
              "&.Mui-selected": {
                color: brandColor.primary,
                fontWeight: 600,
              },
            },
          }}
        >
          <Tab label="URLs" id="tab-0" />
          <Tab label="Analytics" id="tab-1" />
          <Tab label="QR Codes" id="tab-2" />
        </Tabs>
      </Box>

      {/* URLs Endpoints */}
      <Box
        role="tabpanel"
        hidden={tabValue !== 0}
        id="tabpanel-0"
        sx={{ py: 3 }}
      >
        <Endpoint
          method="POST"
          path="/shorten"
          description="Create a new shortened URL."
          requestParams={[
            {
              name: "longUrl",
              type: "string",
              required: true,
              description: "The original URL to be shortened",
            },
            {
              name: "customSlug",
              type: "string",
              required: false,
              description: "Custom path for the shortened URL",
            },
            {
              name: "title",
              type: "string",
              required: false,
              description: "Title for the URL (for your reference)",
            },
            {
              name: "expiresAt",
              type: "date",
              required: false,
              description: "Expiration date for the URL",
            },
            {
              name: "utmParams",
              type: "object",
              required: false,
              description: "UTM parameters to add to the URL",
            },
          ]}
          responseExample={`{
  "id": "abc123",
  "shortUrl": "https://short.url/abc123",
  "originalUrl": "https://example.com/very/long/url",
  "createdAt": "2023-06-15T10:30:00Z",
  "expiresAt": null,
  "clicks": 0,
  "qrCode": "https://short.url/qr/abc123"
}`}
        />

        <Endpoint
          method="GET"
          path="/urls"
          description="Get a list of your shortened URLs."
          requestParams={[
            {
              name: "page",
              type: "integer",
              required: false,
              description: "Page number for pagination",
            },
            {
              name: "limit",
              type: "integer",
              required: false,
              description: "Number of results per page",
            },
            {
              name: "sortBy",
              type: "string",
              required: false,
              description: "Field to sort by (createdAt, clicks, etc.)",
            },
            {
              name: "order",
              type: "string",
              required: false,
              description: "Sort order (asc or desc)",
            },
          ]}
          responseExample={`{
  "data": [
    {
      "id": "abc123",
      "shortUrl": "https://short.url/abc123",
      "originalUrl": "https://example.com/very/long/url",
      "createdAt": "2023-06-15T10:30:00Z",
      "clicks": 42
    },
    {
      "id": "def456",
      "shortUrl": "https://short.url/def456",
      "originalUrl": "https://another-example.com/path",
      "createdAt": "2023-06-14T08:15:00Z",
      "clicks": 17
    }
  ],
  "pagination": {
    "total": 24,
    "pages": 3,
    "currentPage": 1,
    "limit": 10
  }
}`}
        />

        <Endpoint
          method="GET"
          path="/urls/{id}"
          description="Get details for a specific shortened URL."
          requestParams={[
            {
              name: "id",
              type: "string",
              required: true,
              description: "The ID of the shortened URL",
            },
          ]}
          responseExample={`{
  "id": "abc123",
  "shortUrl": "https://short.url/abc123",
  "originalUrl": "https://example.com/very/long/url",
  "createdAt": "2023-06-15T10:30:00Z",
  "expiresAt": null,
  "title": "Example URL",
  "clicks": 42,
  "qrCode": "https://short.url/qr/abc123"
}`}
        />

        <Endpoint
          method="DELETE"
          path="/urls/{id}"
          description="Delete a shortened URL."
          requestParams={[
            {
              name: "id",
              type: "string",
              required: true,
              description: "The ID of the shortened URL to delete",
            },
          ]}
          responseExample={`{
  "success": true,
  "message": "URL successfully deleted"
}`}
        />
      </Box>

      {/* Analytics Endpoints */}
      <Box
        role="tabpanel"
        hidden={tabValue !== 1}
        id="tabpanel-1"
        sx={{ py: 3 }}
      >
        <Endpoint
          method="GET"
          path="/analytics/{id}"
          description="Get analytics data for a specific shortened URL."
          requestParams={[
            {
              name: "id",
              type: "string",
              required: true,
              description: "The ID of the shortened URL",
            },
            {
              name: "period",
              type: "string",
              required: false,
              description: "Time period (day, week, month, year, all)",
            },
            {
              name: "startDate",
              type: "date",
              required: false,
              description: "Start date for custom period",
            },
            {
              name: "endDate",
              type: "date",
              required: false,
              description: "End date for custom period",
            },
          ]}
          responseExample={`{
  "urlId": "abc123",
  "totalClicks": 42,
  "uniqueClicks": 38,
  "clicksByDate": [
    { "date": "2023-06-15", "clicks": 12 },
    { "date": "2023-06-16", "clicks": 15 },
    { "date": "2023-06-17", "clicks": 15 }
  ],
  "clicksByCountry": [
    { "country": "United States", "clicks": 20 },
    { "country": "Germany", "clicks": 8 },
    { "country": "Japan", "clicks": 6 },
    { "country": "Other", "clicks": 8 }
  ],
  "clicksByDevice": [
    { "device": "Desktop", "clicks": 25 },
    { "device": "Mobile", "clicks": 15 },
    { "device": "Tablet", "clicks": 2 }
  ],
  "clicksByBrowser": [
    { "browser": "Chrome", "clicks": 22 },
    { "browser": "Safari", "clicks": 10 },
    { "browser": "Firefox", "clicks": 7 },
    { "browser": "Other", "clicks": 3 }
  ],
  "referrers": [
    { "referrer": "Direct", "clicks": 15 },
    { "referrer": "Twitter", "clicks": 12 },
    { "referrer": "Facebook", "clicks": 8 },
    { "referrer": "LinkedIn", "clicks": 5 },
    { "referrer": "Other", "clicks": 2 }
  ]
}`}
        />

        <Endpoint
          method="GET"
          path="/analytics/summary"
          description="Get a summary of analytics across all your URLs."
          requestParams={[
            {
              name: "period",
              type: "string",
              required: false,
              description: "Time period (day, week, month, year, all)",
            },
            {
              name: "startDate",
              type: "date",
              required: false,
              description: "Start date for custom period",
            },
            {
              name: "endDate",
              type: "date",
              required: false,
              description: "End date for custom period",
            },
          ]}
          responseExample={`{
  "totalUrls": 24,
  "totalClicks": 1256,
  "averageClicksPerUrl": 52.3,
  "topPerformingUrls": [
    {
      "id": "abc123",
      "shortUrl": "https://short.url/abc123",
      "clicks": 245,
      "conversionRate": 12.5
    },
    {
      "id": "def456",
      "shortUrl": "https://short.url/def456",
      "clicks": 187,
      "conversionRate": 9.3
    }
  ],
  "clicksByDate": [
    { "date": "2023-06-10", "clicks": 120 },
    { "date": "2023-06-11", "clicks": 145 },
    { "date": "2023-06-12", "clicks": 132 }
  ]
}`}
        />
      </Box>

      {/* QR Codes Endpoints */}
      <Box
        role="tabpanel"
        hidden={tabValue !== 2}
        id="tabpanel-2"
        sx={{ py: 3 }}
      >
        <Endpoint
          method="GET"
          path="/qr/{id}"
          description="Get the QR code for a shortened URL."
          requestParams={[
            {
              name: "id",
              type: "string",
              required: true,
              description: "The ID of the shortened URL",
            },
            {
              name: "size",
              type: "integer",
              required: false,
              description: "Size of the QR code in pixels",
            },
            {
              name: "format",
              type: "string",
              required: false,
              description: "Image format (png, svg, pdf)",
            },
          ]}
          responseExample="Binary image data or a URL to the QR code image"
        />

        <Endpoint
          method="POST"
          path="/qr/customize"
          description="Create a customized QR code for a shortened URL."
          requestParams={[
            {
              name: "urlId",
              type: "string",
              required: true,
              description: "The ID of the shortened URL",
            },
            {
              name: "color",
              type: "string",
              required: false,
              description: "Foreground color (hex code)",
            },
            {
              name: "backgroundColor",
              type: "string",
              required: false,
              description: "Background color (hex code)",
            },
            {
              name: "logo",
              type: "string",
              required: false,
              description: "URL to a logo image to embed in the QR code",
            },
            {
              name: "margin",
              type: "integer",
              required: false,
              description: "Margin size in pixels",
            },
            {
              name: "errorCorrection",
              type: "string",
              required: false,
              description: "Error correction level (L, M, Q, H)",
            },
          ]}
          responseExample={`{
  "id": "qr123",
  "urlId": "abc123",
  "qrCodeUrl": "https://short.url/qr/custom/qr123",
  "downloadUrls": {
    "png": "https://short.url/qr/custom/qr123.png",
    "svg": "https://short.url/qr/custom/qr123.svg",
    "pdf": "https://short.url/qr/custom/qr123.pdf"
  }
}`}
        />
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Error Handling
      </Typography>

      <Typography variant="body1" paragraph>
        The API uses standard HTTP status codes to indicate the success or
        failure of a request. In case of an error, the response will include an
        error message and details:
      </Typography>

      <CodeBlock language="json">
        {`{
  "error": true,
  "code": "invalid_url",
  "message": "The provided URL is not valid",
  "status": 400,
  "details": {
    "field": "longUrl",
    "reason": "URL format is invalid"
  }
}`}
      </CodeBlock>

      <TableContainer component={Paper} variant="outlined" sx={{ my: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Status Code</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">Description</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>200 OK</TableCell>
              <TableCell>The request was successful</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>201 Created</TableCell>
              <TableCell>A new resource was successfully created</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>400 Bad Request</TableCell>
              <TableCell>The request was invalid or cannot be served</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>401 Unauthorized</TableCell>
              <TableCell>Authentication is required or has failed</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>403 Forbidden</TableCell>
              <TableCell>
                The request is understood but has been refused or access is not
                allowed
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>404 Not Found</TableCell>
              <TableCell>The requested resource could not be found</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>429 Too Many Requests</TableCell>
              <TableCell>Rate limit has been exceeded</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>500 Internal Server Error</TableCell>
              <TableCell>An error occurred on the server</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default APISReference;
