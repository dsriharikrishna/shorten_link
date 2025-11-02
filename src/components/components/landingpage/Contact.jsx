import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import img from "../../../../public/assets/contact.jpg";
import { brandColor } from "../../styles/InputStyles";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: add backend/email service
  };

  return (
    <Box
      sx={{
        backgroundColor: brandColor.background,
        py: 8,
        px: { xs: 6, md: 17 },
      }}
    >
      {/* Title */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight={600}
          gutterBottom
          sx={{ color: brandColor.primary }}
        >
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We'd love to hear from you! Our team is here to help.
        </Typography>
      </Box>

      {/* Contact Image + Form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          mb: 6,
        }}
      >
        {/* Left Image */}
        <Box
          component="img"
          src={img}
          alt="Customer support"
          sx={{
            flex: 1,
            borderRadius: 2,
            height: "450px",
            objectFit: "cover",
          }}
        />

        {/* Right Form */}
        <Box
          sx={{
            flex: 1,
            px: 3,
            py: 3,
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
            sx={{ color: brandColor.primary }}
          >
            Send Us a Message
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}
            >
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                label="Your Name"
                size="small"
                fullWidth
                required
                variant="standard"
              />
              <TextField
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="Email Address"
                type="email"
                size="small"
                fullWidth
                required
                variant="standard"
              />
              <TextField
                name="message"
                value={formData.message}
                onChange={handleChange}
                label="Message"
                multiline
                rows={4}
                size="small"
                fullWidth
                required
                variant="standard"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
                mt: 2,
              }}
            >
              <Button
                type="submit"
                sx={{
                  color: "#14b8a6",
                  fontWeight: "bold",
                  textTransform: "none",
                  px: 2.5,
                  py: 0.5,
                  border: "1px solid #14b8a6",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#14b8a6",
                    color: "#fff",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Map + Address */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Map */}
        <Box
          sx={{
            flex: 1,
            minHeight: 300,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 1,
          }}
        >
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.793268032994!2d78.3438777!3d17.4236358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93eb57ad799f%3A0x5e0d15311d0f5476!2sVijaya%20Krishna%20Towers!5e0!3m2!1sen!2sin!4v1719228491329!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </Box>

        {/* Address */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            border: `1px solid #e0e0e0`,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
            sx={{ color: brandColor.primary }}
          >
            ShortLink Headquarters
          </Typography>
          <Typography variant="body2">
            19th Floor, Vijaya Krishna Towers
          </Typography>
          <Typography variant="body2">Madhava Reddy Colony</Typography>
          <Typography variant="body2">Gachibowli – 500032</Typography>
          <Typography variant="body2">Hyderabad, Telangana</Typography>
          <Typography variant="body2">India</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: brandColor.primary }}>
            info@signitives.net
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
