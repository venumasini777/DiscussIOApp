
import { Discussion, DiscussionResponse } from '../types';



const baseURI: string = 'http://localhost:8000/api/v1'
export const loginUser = async (email: string, password: string) => {
  const response : any = await fetch(baseURI + "/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic Og==",
      },
      body: JSON.stringify({
        email: email,
        pwd: password
      })
    }
  )
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed (${response.status}): ${error}`,);
  };
  const res = await response.json();
  localStorage.setItem('user_id', res.id);
  localStorage.setItem('email', res.email); // Store email
  localStorage.setItem('token', res.token);
  //const response = await api.post('/login', { email, password });
  return res
};
const encodeCredentials = (username: string, password: string): string => {
  return btoa(`${username}:${password}`);
};

const username = localStorage.getItem('email');
const token = localStorage.getItem('token');

export const fetchDiscussions = async (): Promise<Discussion[]> => {
  
  if(!username || !token){
    throw new Error('Email or password empty');
  }
  const response = await fetch('http://localhost:8000/api/v1/all-discussions',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${encodeCredentials(username, token)}`,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};



export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:8000/api/v1/upload-image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  const data = await response.json();
  return data.image_url; // Assuming the API returns the uploaded image URL as 'url'
};


export const createPost = async (
  imageUrl: string,
  text: string,
  hashtags: string
): Promise<DiscussionResponse> => {

  if (!username || !token) {
    throw new Error('No authentication credentials found');
  }

  const payload = {
    content: text,
    image: imageUrl,
    hashtags: hashtags,
  };

  const response = await fetch('http://localhost:8000/api/v1/createpost/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${username}:${token}`)}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to create post: ${error.detail}`);
  }

  // Return the response JSON as the function result
  return response.json();
};

// Define the response model for a discussion post

// Add other API methods as needed
