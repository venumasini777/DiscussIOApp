import React from 'react';
import { Discussion } from '../types';

interface DiscussionListProps {
  discussions: Discussion[];
  onLike: (discussionId: number) => void;
  onComment: (discussionId: number, text: string) => void;
}

const DiscussionList = ({ discussions, onLike, onComment }: DiscussionListProps) => {
  return (
    <div>
      {discussions.map(discussion => (
        <div key={discussion.id}>
          <h3>{discussion.author.name}</h3>
          <p>{discussion.text}</p>
          {discussion.image && <img src={discussion.image} alt="Discussion" />}
          <button onClick={() => onLike(discussion.id)}>Like</button>
          <input
            type="text"
            placeholder="Add a comment..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onComment(discussion.id, e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DiscussionList;
