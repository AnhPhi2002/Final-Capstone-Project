import Header from "@/components/header";
import ProfileForm from "./components/ProfileForm";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  email: string;
}

// Mock function to simulate fetching current user data
const getCurrentUser = async () => {
  return {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  };
};

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);

  return (
    <div>
      <Header
        title="Semesters"
        href="/"
        currentPage="Quản lý năm học và học kỳ"
      />
      <div className="container mx-auto px-5">
        <div className="flex justify-end mt-5">
          <Link to="/profile-page/update">
            <Button className="text-sm">Edit My Profile</Button>
          </Link>
        </div>
        {currentUser && <ProfileForm currentUser={currentUser} />}
      </div>
    </div>
  );
}

