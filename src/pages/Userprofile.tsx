// src/components/UserProfile.tsx
import React, { useState, useEffect } from 'react';
import { User } from '../types';
//import { followUser, unfollowUser, getUserProfile } from '../services/api';

interface UserProfileProps {
  userId: number;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        //const userData = await getUserProfile(userId);
        //setUser(userData);
        // Assume userData includes a flag indicating whether the current user follows them
        //setIsFollowing(userData.isFollowing);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        //await unfollowUser(userId);
      } else {
        //await followUser(userId);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Failed to follow/unfollow user', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleFollowToggle}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default UserProfile;
