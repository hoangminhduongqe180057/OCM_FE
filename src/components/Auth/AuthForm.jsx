import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,  Button,  TextField,  Typography,  Paper,  InputAdornment,  Checkbox,  FormControlLabel,
} from '@mui/material';

const AuthForm = ({
  title, fields, handleSubmit, status, generalError, showRememberMe = false, linkText, linkTo, credentials, setCredentials, fieldErrors
}) => {
  return (
    <Paper
      elevation={6}
      sx={{
        p: { xs: 1, sm: 2, md: 4 },
        borderRadius: 2,
        width: '100%',
        maxWidth: { xs: 360, md: 450 },
        minWidth: { xs: 300, md: 400 },
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        m: { xs: 1, sm: 1, md: 2 },
        animation: 'fadeIn 0.8s ease-in',
        zIndex: 2,
        position: 'relative',
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 2, color: '#0277bd', fontWeight: 'medium' }}
      >
        {title}
      </Typography>

      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            type={field.type || 'text'}
            fullWidth
            margin="normal"
            value={credentials[field.name] || ''}
            autoComplete={field.autoComplete}
            onChange={(e) =>
              setCredentials({ ...credentials, [field.name]: e.target.value })
            }
            error={Boolean(fieldErrors[field.name])}
            helperText={fieldErrors[field.name]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{field.icon}</InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '&:hover fieldset': { borderColor: '#0277bd' },
              },
            }}
          />
        ))}

        {generalError && (
          <Typography
            variant="body2" // Giảm cỡ chữ
            color="error"
            align="left"
            sx={{ mt: 1 }} // Khoảng cách trên và dưới
          >
            {generalError}
          </Typography>
        )}

        {showRememberMe && (
          <FormControlLabel
            control={<Checkbox />}
            label="Ghi nhớ tôi"
            sx={{ mt: 1 }}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={status === 'loading'}
          sx={{
            mt: 2,
            py: 1.2,
            borderRadius: '8px',
            bgcolor: '#0277bd',
            '&:hover': {
              bgcolor: '#01579b',
              transform: 'scale(1.01)',
              transition: 'all 0.2s',
            },
          }}
        >
          {status === 'loading' ? `Đang ${title.toLowerCase()}...` : title}
        </Button>
      </form>

      <Typography align="center" sx={{ mt: 2 }}>
        {linkText} <Link to={linkTo}>{linkTo === '/login' ? 'Đăng nhập' : 'Đăng ký'}</Link>
      </Typography>
    </Paper>
  );
};

export default AuthForm;