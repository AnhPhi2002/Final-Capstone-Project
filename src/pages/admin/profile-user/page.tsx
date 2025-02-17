
import Header from '@/components/header';
import ProfileForm from './components/ProfileForm';
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

// Mock function to simulate fetching current user data
const getCurrentUser = async () => {
  return {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com'
  };
};

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch the current user data from an API or other source
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);

  return (
    <div>
      <div>
      <Header title="Semesters" href="/" currentPage="Quản lý năm học và học kỳ " />
        {currentUser && <ProfileForm currentUser={currentUser} />}
      </div>
    </div>
  );
}
