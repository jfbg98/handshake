// Main App component - Entry point for the Handshake application
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { Profile } from './types';
import { mockProfiles } from './types';
import Layout from './components/Layout';
import ProfileList from './components/ProfileList';
import ProfileFormModal from './components/ProfileFormModal';
import ProfilePage from './pages/ProfilePage';

function App() {
  // Store profiles in state (initialized with mock data)
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | undefined>(undefined);

  // Handler for opening modal to edit a profile
  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setIsModalOpen(true);
  };

  // Handler for Delete button with confirmation
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      setProfiles(profiles.filter(profile => profile.id !== id));
    }
  };

  // Handler for opening modal to create new profile
  const handleNewProfile = () => {
    setEditingProfile(undefined);
    setIsModalOpen(true);
  };

  // Handler for form submission (create or update)
  const handleFormSubmit = (profileData: Omit<Profile, "id"> | Profile) => {
    if ('id' in profileData) {
      // Editing existing profile
      setProfiles(profiles.map(p => p.id === profileData.id ? profileData as Profile : p));
    } else {
      // Creating new profile - generate random ID and avatar
      const randomAvatarId = Math.floor(Math.random() * 70) + 1;
      const newProfile: Profile = {
        ...profileData,
        id: Math.random().toString(36).substring(2, 9),
        avatar: `https://i.pravatar.cc/150?img=${randomAvatarId}`,
      };
      setProfiles([...profiles, newProfile]);
    }
    setIsModalOpen(false);
    setEditingProfile(undefined);
  };

  // Handler for closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProfile(undefined);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Home: Profile list page */}
        <Route 
          path="/" 
          element={
            <>
              <Layout>
                <div className="min-h-[calc(100vh-200px)] flex flex-col pb-12">
                  {/* Header with New Profile Button */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-5 mb-8 sm:mb-10">
                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white">All Profiles</h2>
                      <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1.5 sm:mt-2">Manage developer and founder profiles</p>
                    </div>
                    <button
                      onClick={handleNewProfile}
                      className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-lg hover:shadow-2xl dark:shadow-primary-900/50 transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 whitespace-nowrap"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      New Profile
                    </button>
                  </div>

                  {/* Profiles Table */}
                  <div className="flex-1">
                    <ProfileList 
                      profiles={profiles} 
                      onEdit={handleEdit} 
                      onDelete={handleDelete} 
                    />
                  </div>
                </div>
              </Layout>

              {/* Profile Form Modal */}
              <ProfileFormModal
                isOpen={isModalOpen}
                initialProfile={editingProfile}
                onSubmit={handleFormSubmit}
                onClose={handleCloseModal}
              />
            </>
          } 
        />
        
        {/* Profile Details Page */}
        <Route 
          path="/profile/:id" 
          element={<ProfilePage profiles={profiles} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

