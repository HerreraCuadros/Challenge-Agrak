import axios, { AxiosResponse } from 'axios';
import { User } from '../models/user';

const baseURL = 'https://635017b9df22c2af7b630c3e.mockapi.io/api/v1';

const api = axios.create({
  baseURL,
});

export const fetchUsers = async (): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await api.get('/users');
  return response.data;
};

export const fetchUserById = async (userId: string): Promise<User> => {
  const response: AxiosResponse<User> = await api.get(`/users/${userId}`)
  return response.data;
}

export const createUser = async (userData: User): Promise<User> => {
  const response: AxiosResponse<User> = await api.post('/users', userData);
  return response.data;
};

export const updateUser = async (userId: string, userData: User): Promise<User> => {
  const response: AxiosResponse<User> = await api.put(`/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await api.delete(`/users/${userId}`);
};