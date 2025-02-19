import { Button } from '@/components/ui/button';

import { Link } from 'react-router';

interface User {
  avatar?: string;
  fullName?: string;
  role?: string;
  userName?: string;
  phoneNumber?: string;
  birthDate?: string;
  email?: string;
  gender?: string;
  address?: string;
  level?: string;
}

export default function ProfileForm({ currentUser }: { currentUser: User }) {
  if (!currentUser) return null;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {/* Left Side */}
        <div className="bg-white rounded-lg p-6 border shadow-sm">
          <h2 className="text-purple-700 text-lg font-semibold mb-4">Avatar</h2>
          <div className="flex flex-col items-center">
            <img
              src={currentUser.avatar || 'https://avatar.iran.liara.run/public/boy?username=FAMS'}
              className="w-24 h-24 bg-gray-300 rounded-full mb-4 shrink-0 object-cover"
            />
          </div>
          <h2 className="text-purple-700 text-lg font-semibold mt-6">Contact Information</h2>
          <div className="mt-4 space-y-2">
            <p><strong>Phone Number: </strong> {currentUser.phoneNumber || 'N/A'}</p>
            <p><strong>Facebook: </strong> <a href="#" className="text-blue-600">Link</a></p>
            <p><strong>Alternative Email: </strong> {currentUser.email}</p>
        
            <p><strong>Password: </strong></p>

          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white rounded-lg p-6 border shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-purple-700 text-lg font-semibold">Basic Information</h2>
            <Link to="/profile-page/update">
              <Button className="text-sm">Edit My Profile</Button>
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            <p><strong>Name: </strong> Nguyen Hoang Anh Phi</p>
            <p><strong>Roll Number: </strong> SE161377</p>
            <p><strong>Semester: </strong> SPRING 2025</p>
            <p><strong>Profession: </strong> Information Technology</p>
            <p><strong>Specialty: </strong> Software Engineering</p>
            <p><strong>Gender: </strong> Male</p>
            <p><strong>Email: </strong> phinhase161377@fpt.edu.vn</p>
            <p><strong>Expect Role: </strong> 
              <select className="border p-2 rounded">
                <option value="BE">Backend</option>
                <option value="FE">Frontend</option>
                <option value="Fullstack">Fullstack</option>
              </select>
            </p>
            <h2 className="text-red-500 font-semibold">Be Grouped</h2>
            <p>Do you want to be grouped in a random group?</p>
            <div className="flex gap-4 mt-2">
              <label><input type="radio" name="group" value="yes" /> Yes</label>
              <label><input type="radio" name="group" value="no" checked /> No</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
