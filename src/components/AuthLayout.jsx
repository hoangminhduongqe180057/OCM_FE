import React from 'react';
import { Box, Typography } from '@mui/material';

const AuthLayout = ({ welcomeTitle, welcomeSubtitle, children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'center' },
        background: // 135deg, rgba(255, 107, 107, 0.8), rgba(254, 202, 87, 0.8)   
          'linear-gradient(135deg, rgba(177, 170, 212, 0.8), rgba(144, 181, 183, 0.8)), url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maxWidth: '1600px',
        width: '100%',
        mx: 'auto',
        position: 'relative',
      }}
    >   
      {/* Dòng chữ chào mừng */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'flex-start',
          pl: '15%',
          zIndex: 1,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              mb: 2,
            }}
          >
            {welcomeTitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#fff',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
            }}
          >
            {welcomeSubtitle}
          </Typography>
        </Box>
      </Box>

      {/* Form */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1, sm: 2, md: 2 },
          ml: { xs: 0, md: 80 }, // Dịch form sang trái
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;