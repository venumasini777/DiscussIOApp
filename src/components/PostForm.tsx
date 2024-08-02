import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import { createPost, uploadImage } from '../services/api';
import { DiscussionResponse } from '../types';

interface PostFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (post: { imageUrl: string; text: string; hashtags: string[] }) => void;
}

const PostForm = ({open, onClose, onSubmit} : PostFormProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleImageChange = (e: any ) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      if(!image){
        throw Error("No Image file Uploaded");
      }
      const url = await uploadImage(image);
      if(!url || url==""){
        throw Error("Image upload Failed");
      }
      const hashtagsArray = hashtags.split('#').map((tag) => tag.trim());
      const newPost: DiscussionResponse = await createPost(url, text, hashtags);
      if(newPost){
        alert("Successfully uploaded a discussion")
      }
     
      onClose();
    }catch (error) {
      console.error('Post upload failed', error);
    }
    
    // Handle form submission
  };
  const handleImageUpload = async () => {
    console.log("HJey");
    if (!image) return;
    try {
      const url = await uploadImage(image);
      console.log(url);
    } catch (error) {
      console.error('Image upload failed', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        New Post
      </Typography>
      <input
        accept="image/*"
        id="image-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload">
        <Button
        variant="contained"
        color="secondary"
        component="span"
        sx={{ mb: 2, mr: 2 }}
        >
          Select
        </Button>
      </label>
      <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<UploadIcon />}
          sx={{ mb: 2 }}
          onClick={()=>{
            console.log("Hey");
            //handleImageUpload();
          }}
        >
          Upload Image
        </Button>
      {image && <Typography sx={{ mb: 2 }}>{image.name}</Typography>}
      {imageUrl!="" && <Typography sx={{ mb: 2 }}>Uploaded Image</Typography>}
      <TextField
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        label="Post Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Hashtags"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default PostForm;
