import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import PageContainer from "./PageContainer";

const ProfilePage: React.FC = () => {
  const { user } = useAuth(); // Access user data from the AuthContext

  return (
    <PageContainer title={"Personal Dashboard"}>
      <div className=" rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 text-lg text-gray-900">{user?.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <p className="mt-1 text-lg text-gray-900">{user?.role}</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
