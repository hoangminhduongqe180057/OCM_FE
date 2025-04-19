import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { initializeSignalR, stopSignalR } from '../../services/signalr';
import { addNotification } from '../../store/slices/notificationSlice';

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