import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Replace with your backend URL
});

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const signupUser = async (name: string, email: string, password: string) => {
  const response = await api.post('/signup', { name, email, password });
  return response.data;
};

export const followUser = async (id: number) => {
const response = await api.post('/signup', { id });
return response.data;
};
export const unfollowUser = async (id : number) => {
const response = await api.post('/login', { id });
return response.data;
};
export const getUserProfile = async (id: number) => {
const response = await api.post('/getuser', { id });
return response.data;
};
export const getDiscussionsList = async () => {
    const response = await api.get('/getPosts');
    return response.data;

};
// Add other API methods as needed
