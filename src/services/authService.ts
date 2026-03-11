import bcrypt from 'bcryptjs';

interface User {
  usn: string;
  email: string;
  phone: string;
  password: string; // hashed password
}

const USERS_KEY = 'reward_app_users';
const LOGGED_IN_USER_KEY = 'logged_in_user';

// Get all users from localStorage
const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Save all users to localStorage
const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Register a new user
export const registerUser = async (data: {
  usn: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const users = getUsers();

  // Check if USN already exists
  if (users.find(u => u.usn === data.usn)) {
    return { success: false, message: 'USN already registered.' };
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(data.password, salt);

  const newUser: User = {
    usn: data.usn,
    email: data.email,
    phone: data.phone,
    password: hash
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, message: 'Registration successful!' };
};

// Login a user with USN + password
export const loginUser = async (data: { usn: string; password: string }) => {
  const users = getUsers();
  const user = users.find(u => u.usn === data.usn);

  if (!user) {
    return { success: false, message: 'USN not found.' };
  }

  const passwordMatch = bcrypt.compareSync(data.password, user.password);

  if (!passwordMatch) {
    return { success: false, message: 'Incorrect password.' };
  }

  // Save logged-in user in localStorage
  localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify({ usn: user.usn, email: user.email }));

  return { success: true, message: 'Login successful!' };
};

// Optional: get currently logged-in user
export const getLoggedInUser = () => {
  const user = localStorage.getItem(LOGGED_IN_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Optional: logout user
export const logoutUser = () => {
  localStorage.removeItem(LOGGED_IN_USER_KEY);
};
