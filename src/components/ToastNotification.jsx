// import { useRef, useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Snackbar, Alert } from '@mui/material';
// import { initializeSignalR, stopSignalR } from '../services/signalr';
// import { addNotification } from '../store/slices/notificationSlice';

// function ToastNotification() {
//   const { user } = useSelector((state) => state.auth);
//   const isMountedRef = useRef(false);

//   const dispatch = useDispatch();
//   const [openToast, setOpenToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');

//   useEffect(() => {
//     isMountedRef.current = true;
//     if (user) {
//       initializeSignalR((message) => {
//         if (isMountedRef.current) {
//           dispatch(addNotification(message));
//           setToastMessage(message);
//           setOpenToast(true);
//         }
//       });
//     }

//     return () => {
//       isMountedRef.current = false;
//       stopSignalR();
//     };
//   }, [user, dispatch]);

//   const handleCloseToast = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setOpenToast(false);
//   };

//   return (
//       <Snackbar
//         open={openToast}
//         autoHideDuration={6000}
//         onClose={handleCloseToast}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseToast} severity="info" sx={{ width: '100%' }}>
//           {toastMessage}
//         </Alert>
//       </Snackbar>
//   );
// }

// export default ToastNotification;

import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { initializeSignalR, stopSignalR } from '../services/signalr';
import { addNotification } from '../store/slices/notificationSlice';

function ToastNotification() {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    if (role) {
      initializeSignalR((message) => {
        if (isMountedRef.current) {
          dispatch(addNotification(message));
          toast.info(message, {
            position: 'top-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      });
    }

    return () => {
      isMountedRef.current = false;
      stopSignalR();
    };
  }, [role, dispatch]);

  return null;
}

export default ToastNotification;