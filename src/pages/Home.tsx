import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Modal,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import PostForm from '../components/PostForm';
import { Discussion, DiscussionResponse } from '../types';
import DiscussionList from '../components/DiscussionList';
import { createPost } from '../services/api';
import { useNavigate } from 'react-router-dom';
// Import the PostForm component

const Home = () => {
  const [openPostForm, setOpenPostForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<Discussion[]>([]); // Replace with actual posts data
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const navigate = useNavigate();


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Filter posts based on searchTerm
    setFilteredPosts(posts.filter(post => post.content.includes(searchTerm)));
  };

  const handlePostSubmit = async (post: { imageUrl: string; text: string; hashtags: string[] }) => {
    // Add logic to send post data to your API or state management
    try {
      // Call the createPost function to send post data to the backend API
      console.log(post.imageUrl);
      // Optionally update the state to display the new post
      // Update your discussions state or UI here if needed
    } catch (error) {
      console.error('Failed to create post:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleOpenPostForm = () => setOpenPostForm(true);
  const handleClosePostForm = () => setOpenPostForm(false);
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body1">Name: John Doe</Typography>
            <Typography variant="body1">Email: john.doe@example.com</Typography>
            <Typography variant="body1">Mobile: (123) 456-7890</Typography>
            <Typography variant="body1">Posts: 42</Typography>
            <Typography variant="body1">Followers: 150</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Update Profile
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 3, height: 'calc(100vh - 60px)' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenPostForm}
              sx={{ mb: 2 }}
            >
              Add New Post
            </Button>
            <DiscussionList />
          </Paper>
        </Grid>
        <Grid sx={{paddingBottom: "300px", marginLeft: "100px"}}>
          <Button
              variant="contained"
              color="primary"
              //startIcon={<AddIcon />}
              onClick={handleLogout}
              sx={{ mb: 2 }}
            >
              Logout
            </Button>
        </Grid>
      </Grid>

      <Modal open={openPostForm} onClose={handleClosePostForm}>
        <Box
          sx={{
            width: 400,
            margin: 'auto',
            mt: 5,
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <IconButton
            onClick={handleClosePostForm}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <PostForm open={openPostForm} onClose={handleClosePostForm} onSubmit={handlePostSubmit}/>
        </Box>
      </Modal>
    </Container>
  );
};

export default Home;
