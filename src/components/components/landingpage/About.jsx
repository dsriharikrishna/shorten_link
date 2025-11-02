import { Box, Typography, List, ListItem, ListItemIcon } from "@mui/material";
import { Users, Target, Award, Heart } from "lucide-react";
import { brandColor } from "../../styles/InputStyles";

const About = () => {
  const stats = [
    { icon: <Users size={32} />, value: "10,000+", label: "Active Users" },
    { icon: <Award size={32} />, value: "2M+", label: "Links Shortened" },
    { icon: <Heart size={32} />, value: "99.99%", label: "Uptime" },
    { icon: <Target size={32} />, value: "120+", label: "Countries Served" },
  ];

  const values = [
    "Reliability and Security",
    "User-Centric Design",
    "Continuous Innovation",
    "Transparency and Trust",
  ];

  const features = [
    "Shorten URLs Instantly: Transform long links into short, shareable URLs.",
    "Advanced Analytics: Track clicks, locations, devices, referrers, and more.",
    "QR Code Generation: Instantly create QR codes for every short link.",
    "UTM Builder: Add and manage UTM parameters for campaign tracking.",
    "Custom Domains: Use your own branded domain for short links.",
    "Link Management: Organize, edit, and manage all your links in one dashboard.",
    "Security & Privacy: HTTPS, password protection, and privacy-first design.",
    "API Access: Integrate with your own apps and workflows.",
    "Team Collaboration: Invite team members and manage permissions.",
  ];

  const contact = [
    "Email: info@signitives.net",
    "Phone: +1 (555) 123-4567",
    "Address: 19th Floor, Vijaya Krishna Towers, Madhava Reddy Colony, Gachibowli – 500032, Hyderabad, Telangana, India",
  ];

  return (
    <Box sx={{ backgroundColor: brandColor.background, py: 8, px: { xs: 2, md: 4 } }}>
      {/* Hero Section */}
      <Box sx={{ maxWidth: 1200, mx: "auto", textAlign: "center", mb: 8 }}>
        <Typography variant="h2" sx={{ fontWeight: 700, color: brandColor.primary, mb: 2 }}>
          About <Box component="span" sx={{ color: brandColor.secondary }}>ShortLink</Box>
        </Typography>
        <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 800, mx: "auto", lineHeight: 1.6 }}>
          ShortLink is on a mission to make the internet more accessible and efficient by providing a reliable, secure, and user-friendly URL shortening service.
        </Typography>
      </Box>

      {/* Stats Section */}
      <Box sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 3,
        mb: 8,
        maxWidth: 1200,
        mx: "auto"
      }}>
        {stats.map((stat, index) => (
          <Box key={index} sx={{
            textAlign: "center",
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
            flex: "1 1 200px",
            maxWidth: 250,
          }}>
            <Box sx={{
              display: "inline-flex",
              bgcolor: brandColor.secondary,
              color: "common.white",
              p: 1.5,
              borderRadius: "50%",
              mb: 2,
            }}>
              {stat.icon}
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: brandColor.primary, mb: 1 }}>
              {stat.value}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Story + Features Section */}
      <Box sx={{ maxWidth: 1200, mx: "auto", mb: 8, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 6 }}>
        <Box flex={1}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: brandColor.primary, mb: 3 }}>
            Our Story
          </Typography>
          <Typography paragraph sx={{ mb: 3 }}>
            Founded by a passionate team of developers and marketers, ShortLink was created to solve the everyday challenges of sharing and tracking links online.
          </Typography>

          <Typography variant="h5" sx={{ color: brandColor.secondary, mb: 2, mt: 4 }}>
            Our Vision
          </Typography>
          <Typography paragraph>
            To be the most trusted and innovative link management platform, enabling seamless digital experiences for everyone, everywhere.
          </Typography>

          <Typography variant="h5" sx={{ color: brandColor.secondary, mb: 2, mt: 4 }}>
            Our Values
          </Typography>
          <List>
            {values.map((item) => (
              <ListItem key={item} disableGutters>
                <ListItemIcon sx={{ minWidth: 32, color: brandColor.secondary }}>
                  <Box component="span">•</Box>
                </ListItemIcon>
                <Typography>{item}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box flex={1}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: brandColor.primary, mb: 3 }}>
            Main Features
          </Typography>
          <List>
            {features.map((item) => (
              <ListItem key={item} disableGutters>
                <ListItemIcon sx={{ minWidth: 32, color: brandColor.secondary }}>
                  <Box component="span">•</Box>
                </ListItemIcon>
                <Typography>
                  <Box component="span" fontWeight="bold">{item.split(":")[0]}:</Box> {item.split(":")[1]}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Contact Section */}
      <Box sx={{ maxWidth: 1200, mx: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: brandColor.primary }}>
          Contact Us
        </Typography>
        <Typography paragraph>
          Have questions, feedback, or need support? Reach out to our team:
        </Typography>
        <List>
          {contact.map((item) => (
            <ListItem key={item} disableGutters>
              <ListItemIcon sx={{ minWidth: 32, color: brandColor.secondary }}>
                <Box component="span">•</Box>
              </ListItemIcon>
              <Typography>{item}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default About;
