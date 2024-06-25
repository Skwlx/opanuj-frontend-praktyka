import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

const API_URL = '/api/data/users?timeout=10000';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isTimeoutError, setIsTimeoutError] = useState(false);
  const TIMEOUT_DURATION = 5000;

  const getUsers = async () => {
    const controller = new AbortController();
    try {
      setIsTimeoutError(false);
      const timeoutId = setTimeout(() => {
        controller.abort();
        setIsTimeoutError(true);
      }, TIMEOUT_DURATION);

      const res = await fetch(API_URL, { signal: controller.signal });
      clearTimeout(timeoutId);

      const { users } = await res.json();
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users, getUsers, isTimeoutError };
};
