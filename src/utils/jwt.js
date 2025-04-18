export const decodeJwt = (token) => {
    try {
      if (!token || typeof token !== 'string' || token.split('.').length < 3) {
        return null;
      }

      const base64Url = token.split('.')[1]; // Lấy payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };