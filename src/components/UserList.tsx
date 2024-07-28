import React from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  onFollow: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onFollow }) => {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.name}</p>
          <button onClick={() => onFollow(user.id)}>Follow</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
