// utils/auth.js
//create user and store cookie and delete 
export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const currentUser = () => {
    try {
      const userString = localStorage.getItem('user') || "";
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error retrieving user from localStorage:', error.message);
      return null;
    }
  };
  
  export const removeUser = () => {
    localStorage.setItem('user', null);
  };
  