import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { fetchDiscussions } from '../services/api'; // Assume you have a function to fetch discussions
import { Discussion } from '../types';


const DiscussionList: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getDiscussions = async () => {
      try {
        const data = await fetchDiscussions();
        setDiscussions(data);
      } catch (err) {
        setError('Failed to fetch discussions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getDiscussions();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
        Discussions
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        {discussions.map((discussion) => (
          <Grid item xs={12} key={discussion.id}>
            <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                {discussion.content}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Posted by User ID: {discussion.user_id} on {new Date(discussion.created_on).toLocaleDateString()}
              </Typography>
              {/* <Box
                component="img"
                src={discussion.image}
                alt="discussion"
                sx={{ width: '100%', height: 'auto', marginTop: 2 }}
              /> */}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DiscussionList;
