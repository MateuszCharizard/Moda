import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('moda_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signUp = async (email, password) => {
    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('moda_users') || '[]');
      if (users.find((u) => u.email === email)) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        password: Buffer.from(password).toString('base64'), // Basic encoding (not secure, use bcrypt in production)
        createdAt: new Date().toISOString(),
      };

      // Save to users list
      users.push(newUser);
      localStorage.setItem('moda_users', JSON.stringify(users));

      // Log in the user
      const sessionUser = { id: newUser.id, email: newUser.email };
      setUser(sessionUser);
      localStorage.setItem('moda_user', JSON.stringify(sessionUser));

      return { user: sessionUser, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('moda_users') || '[]');
      const foundUser = users.find((u) => u.email === email);

      if (!foundUser || Buffer.from(password).toString('base64') !== foundUser.password) {
        throw new Error('Invalid email or password');
      }

      const sessionUser = { id: foundUser.id, email: foundUser.email };
      setUser(sessionUser);
      localStorage.setItem('moda_user', JSON.stringify(sessionUser));

      return { user: sessionUser, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  };

  // Sign out function
  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('moda_user');
    return { error: null };
  };

  // Change password function
  const changePassword = async (email, oldPassword, newPassword) => {
    try {
      if (!email || !oldPassword || !newPassword) {
        throw new Error('All fields are required');
      }

      const users = JSON.parse(localStorage.getItem('moda_users') || '[]');
      const userIndex = users.findIndex((u) => u.email === email);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      if (Buffer.from(oldPassword).toString('base64') !== users[userIndex].password) {
        throw new Error('Current password is incorrect');
      }

      users[userIndex].password = Buffer.from(newPassword).toString('base64');
      localStorage.setItem('moda_users', JSON.stringify(users));

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Delete account function
  const deleteAccount = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const users = JSON.parse(localStorage.getItem('moda_users') || '[]');
      const userIndex = users.findIndex((u) => u.email === email);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      if (Buffer.from(password).toString('base64') !== users[userIndex].password) {
        throw new Error('Password is incorrect');
      }

      users.splice(userIndex, 1);
      localStorage.setItem('moda_users', JSON.stringify(users));

      setUser(null);
      localStorage.removeItem('moda_user');

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    changePassword,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
