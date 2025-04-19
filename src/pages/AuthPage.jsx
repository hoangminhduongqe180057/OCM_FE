import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../store/slices/authSlice';
import AuthLayout from '../components/Auth/AuthLayout';
import AuthForm from '../components/Auth/AuthForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import * as Yup from 'yup';
import { Snackbar, Alert } from '@mui/material';

// Schema cho đăng nhập
const loginSchema = Yup.object().shape({
  username: Yup.string().required('Tài khoản là bắt buộc'),
  password: Yup.string()
  .required('Mật khẩu là bắt buộc'),
});

// Schema cho đăng ký
const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Họ và tên phải có từ 3 đến 50 ký tự')
    .max(50, 'Họ và tên phải có từ 3 đến 50 ký tự')
    .required('Họ và tên là bắt buộc'),
  username: Yup.string()
    .min(3, 'Tên người dùng phải có từ 3 đến 50 ký tự')
    .max(50, 'Tên người dùng phải có từ 3 đến 50 ký tự')
    .required('Tài khoản là bắt buộc'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email là bắt buộc'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
    .matches(/[0-9]/, 'Mật khẩu phải có ít nhất 1 số')
    .required('Mật khẩu là bắt buộc'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
    .required('Xác nhận mật khẩu là bắt buộc'),
});

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error, role } = useSelector((state) => state.auth);

  // Xác định trạng thái: đăng nhập hay đăng ký dựa trên URL
  const isLogin = location.pathname === '/login';

  useEffect(() => {
    if (isLogin && status === 'succeeded' && role) {
      if (['Admin', 'Instructor'].includes(role)) {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [status, role, isLogin, navigate]);

  // State cho form
  const initialCredentials = isLogin
    ? { username: '', password: '' }
    : { username: '', password: '', fullName: '', email: '', confirmPassword: '', role: 'Student' };
  const [credentials, setCredentials] = useState(initialCredentials);
  const [validationErrors, setValidationErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  // State cho toast
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Đóng toast
  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  // Reset state khi chuyển trang
  useEffect(() => {
    setCredentials(initialCredentials); // Reset dữ liệu form
    setValidationErrors({}); // Reset lỗi validation
    setGeneralError(''); // Reset lỗi chung
  }, [location.pathname]); // Theo dõi sự thay đổi của location.pathname

  // Logic xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setGeneralError('');

    // Chọn schema phù hợp
    const schema = isLogin ? loginSchema : registerSchema;

    try {
      // Validate form với Yup
      await schema.validate(credentials, { abortEarly: false });

      // Nếu validation qua, gửi request lên server
      const action = isLogin ? login(credentials) : register(credentials);
      const result = await dispatch(action);

      if ((isLogin ? login.fulfilled : register.fulfilled).match(result)) {
        setToastMessage(isLogin ? 'Đăng nhập thành công!' : 'Đăng ký thành công!');
        setOpenToast(true);

        if (!isLogin) {
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        }

      } else if (result.payload) {
        // Chỉ hiển thị lỗi xác thực từ backend
        const errorArray = result.payload;
        let general = '';

        errorArray.forEach((err) => {
          general = err;
        });

        setGeneralError(general);
      }
    } catch (err) {
      // Xử lý lỗi validation từ Yup
      if (err.name === 'ValidationError') {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setValidationErrors(errors);
      }
    }
  };
  // Cấu hình các trường nhập liệu
  const fields = isLogin
    ? [
        {
          name: 'username',
          label: 'Tài khoản',
          icon: <AccountCircleIcon sx={{ color: '#0277bd' }} />,
          autoComplete: 'username',
        },
        {
          name: 'password',
          label: 'Mật khẩu',
          type: 'password',
          icon: <LockIcon sx={{ color: '#0277bd' }} />,
          autoComplete: 'current-password',
        },
      ]
    : [
        {
          name: 'fullName',
          label: 'Họ và tên',
          icon: <AccountCircleIcon sx={{ color: '#0277bd' }} />,
          autoComplete: 'name',
        },
        {
          name: 'username',
          label: 'Tài khoản',
          icon: <AccountCircleIcon sx={{ color: '#0277bd' }} />,
          autoComplete: 'username',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          icon: <EmailIcon sx={{ color: '#0277bd' }} />,
          autoComplete: 'email',
        },
        {
          name: 'password',
          label: 'Mật khẩu',
          type: 'password',
          icon: <LockIcon sx={{ color: '#0277bd' }} />,
          autoComplete: 'current-password',
        },
        {
          name: 'confirmPassword',
          label: 'Xác nhận mật khẩu',
          type: 'password',
          icon: <LockIcon sx={{ color: '#0277bd' }} />,
          autoComplete: 'current-password',
        },
      ];

  return (
    <>
      <AuthLayout
        welcomeTitle={isLogin ? 'Chào mừng bạn!' : 'Tạo tài khoản mới!'}
        welcomeSubtitle={
          isLogin
            ? 'Đăng nhập để khám phá các khóa học trực tuyến.'
            : 'Tham gia ngay để bắt đầu hành trình học tập.'
        }
      >
        <AuthForm
          title={isLogin ? 'Đăng nhập' : 'Đăng ký'}
          fields={fields}
          handleSubmit={handleSubmit}
          status={status}
          generalError={generalError}
          showRememberMe={isLogin}
          linkText={isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
          linkTo={isLogin ? '/register' : '/login'}
          credentials={credentials}
          setCredentials={setCredentials}
          fieldErrors={validationErrors}
        />
      </AuthLayout>

      <Snackbar
      open={openToast}
      autoHideDuration={3000} // Tự động đóng sau 3 giây
      onClose={handleCloseToast}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Vị trí: góc trên bên phải
      >
      <Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }}>
        {toastMessage}
      </Alert>
      </Snackbar>
    </>
  );
};

export default AuthPage;