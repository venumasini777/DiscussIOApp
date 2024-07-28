import React, { useState } from 'react';
import DiscussionList from '../components/DiscussionList';
import { Discussion } from '../types';

const Home = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  const handleLike = (discussionId: number) => {
    // Implement like functionality
  };

  const handleComment = (discussionId: number, text: string) => {
    // Implement comment functionality
  };

  return (
    <div>
      <h1>Discussions</h1>
      <DiscussionList
        discussions={discussions}
        onLike={handleLike}
        onComment={handleComment}
      />
    </div>
  );
};

export default Home;
