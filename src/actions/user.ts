'use server';

import { cookies } from 'next/headers';

import Http from '@/lib/http';

export async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await Http.post('/auth/login', {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMe() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    if (!accessToken) {
      return;
    }
    const response = await Http.get('/users/profile');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function registerAction(payload: {
  username: string;
  password: string;
  email: string;
  name: string;
  birth_date: string;
  phone_number: string;
  address: string;
  nationality: string;
  cover_url: string;
  image_url: string;
}) {
  try {
    const response = await Http.post('/auth/register', payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserAction(
  id: number,
  payload: {
    email: string;
    name: string;
    birth_date: string;
    phone_number: string;
    address: string;
    nationality: string;
    cover_url: string;
    image_url: string;
  }
) {
  try {
    const response = await Http.put(`/users/${id}`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(
  id: number,
  payload: {
    name: string;
    email: string;
  }
) {
  try {
    const response = await Http.put(`/users/${id}`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserDetail(id: number) {
  try {
    const response = await Http.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSales(params?: { name?: string; email?: string }) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('user_type_id', '3');

    if (params?.name) {
      queryParams.append('name', params.name);
    }
    if (params?.email) {
      queryParams.append('email', params.email);
    }

    const response = await Http.get(`/users?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function registerSale(payload: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const response = await Http.post('/auth/register-sale', payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(id: number) {
  try {
    const response = await Http.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();

    // Remove the access token cookie
    cookieStore.delete('access_token');

    return { success: true };
  } catch (error) {
    console.log('Logout error:', error);
    return { success: false, error: 'Failed to logout' };
  }
}
