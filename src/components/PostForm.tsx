import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios'; // Use axios for API calls

const PostForm = () => {
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleHashtagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const hashtagsArray = input.split(',').map((tag) => tag.trim().toLowerCase()).filter((tag) => tag !== '');
    setHashtags(hashtagsArray);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Create form data
      const formData = new FormData();
      formData.append('text', text);
      if (image) {
        formData.append('image', image);
      }
      formData.append('hashtags', JSON.stringify(hashtags));

      // API call to create post
      const response = await axios.post('http://your-api-url.com/api/v1/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // Post created successfully, reset form fields
        setText('');
        setImage(null);
        setHashtags([]);
        // Optionally, notify the user or refresh the post list
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="What's on your mind?"
          required
        />
      </div>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <input
          type="text"
          onChange={handleHashtagChange}
          placeholder="Enter hashtags separated by commas"
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
