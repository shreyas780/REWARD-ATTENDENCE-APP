import { User } from '../types/User';

const USERS_KEY = 'reward_attendance_users';

export function getUsers(): Record<string, User> {
  const usersData = localStorage.getItem(USERS_KEY);
  return usersData ? JSON.parse(usersData) : {};
}

export function saveUsers(users: Record<string, User>): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUserByUSN(usn: string): User | null {
  const users = getUsers();
  return users[usn] || null;
}

export function saveUser(user: User): void {
  const users = getUsers();
  users[user.usn] = user;
  saveUsers(users);
}

export function userExists(usn: string): boolean {
  return getUserByUSN(usn) !== null;
}