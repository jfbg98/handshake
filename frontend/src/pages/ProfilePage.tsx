// ProfilePage - Full profile details view with connection request feature
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Profile } from '../types';
import { useConnections } from '../hooks/useConnections';
import ConnectModal from '../components/ConnectModal';
import Layout from '../components/Layout';

interface ProfilePageProps {
  profiles: Profile[];
}

function ProfilePage({ profiles }: ProfilePageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const connections = useConnections();
  
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Find the profile by ID
  const profile = profiles.find((p) => p.id === id);

  if (!profile) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-neutral-400 dark:text-neutral-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">Profile not found</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">The profile you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Profiles
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Mock current user ID (in real app, this would come from auth context)
  const currentUserId = 'current-user-123';
  
  // Check if connection request already exists
  const existingRequest = connections.getRequest(currentUserId, profile.id);
  const hasRequested = !!existingRequest;

  const handleConnectClick = () => {
    setIsConnectModalOpen(true);
  };

  const handleConnectSubmit = (message: string) => {
    connections.sendRequest(currentUserId, profile.id, message);
    setIsConnectModalOpen(false);
    setShowSuccessToast(true);
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] pb-12">
        {/* Success Toast */}
        {showSuccessToast && (
          <div className="fixed top-6 right-6 z-50 animate-slide-in">
            <div className="bg-green-600 dark:bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="font-semibold">Connection request sent!</div>
                <div className="text-sm text-green-100">You'll hear back from {profile.name.split(' ')[0]} soon.</div>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-semibold mb-8 transition-colors group"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Profiles
        </button>

        {/* Profile Content - Linear-inspired centered column */}
        <div className="max-w-2xl mx-auto pt-6">
          {/* Avatar & Header */}
          <div className="text-center mb-10">
            <div className="relative inline-block mb-6">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover shadow-xl ring-4 ring-primary-100 dark:ring-primary-900/50"
                />
              ) : (
                <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-400 dark:via-primary-500 dark:to-primary-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl ring-4 ring-primary-100 dark:ring-primary-900/50">
                  {getInitials(profile.name)}
                </div>
              )}
              <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-400 dark:bg-green-500 border-4 border-white dark:border-neutral-800 rounded-full"></div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-3">
              {profile.name}
            </h1>
            
            {/* Role & Stage Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold ${
                profile.role === 'dev' 
                  ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-md' 
                  : 'bg-purple-600 dark:bg-purple-500 text-white shadow-md'
              }`}>
                {profile.role === 'dev' ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Developer
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    Founder
                  </>
                )}
              </span>
              
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold ${
                profile.stage === 'idea' ? 'bg-amber-500 dark:bg-amber-600 text-white shadow-md' :
                profile.stage === 'mvp' ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-md' :
                'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
              }`}>
                {profile.stage === 'idea' ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                    IDEA STAGE
                  </>
                ) : profile.stage === 'mvp' ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    MVP STAGE
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    GROWTH STAGE
                  </>
                )}
              </span>
            </div>

            {/* Connect Button */}
            <div className="mt-6">
              {hasRequested ? (
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 dark:bg-green-500 text-white font-semibold rounded-xl shadow-lg cursor-not-allowed opacity-90"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Request Sent ✓
                </button>
              ) : (
                <button
                  onClick={handleConnectClick}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Connect
                </button>
              )}
            </div>
          </div>

          {/* Profile Sections */}
          <div className="space-y-6">
            {/* About */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-display font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                About
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {profile.bio}
              </p>
            </div>

            {/* Skills / Needs */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-display font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                {profile.role === 'dev' ? 'Skills & Expertise' : 'Looking For'}
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {profile.skills}
              </p>
            </div>

            {/* Contact */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-display font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </h2>
              <a
                href={`mailto:${profile.contact}`}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors inline-flex items-center gap-2 group"
              >
                {profile.contact}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            {/* Member Since */}
            <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 pt-4">
              Member since {new Date(profile.created_at).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Connect Modal */}
      <ConnectModal
        isOpen={isConnectModalOpen}
        profile={profile}
        onClose={() => setIsConnectModalOpen(false)}
        onSubmit={handleConnectSubmit}
      />
    </Layout>
  );
}

export default ProfilePage;