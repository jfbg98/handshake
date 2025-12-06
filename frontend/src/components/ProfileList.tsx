// ProfileList component - Displays profiles in a table with edit/delete actions
import { useNavigate } from 'react-router-dom';
import type { Profile } from '../types';

interface ProfileListProps {
  profiles: Profile[];
  onEdit: (profile: Profile) => void;
  onDelete: (id: string) => void;
}

function ProfileList({ profiles, onEdit, onDelete }: ProfileListProps) {
  const navigate = useNavigate();

  // Helper to get initials for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Navigate to profile page
  const handleRowClick = (profileId: string) => {
    navigate(`/profile/${profileId}`);
  };

  // Show empty state if no profiles
  if (profiles.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-12 md:p-20 text-center transition-colors duration-300">
        <svg className="mx-auto h-16 w-16 md:h-20 md:w-20 text-neutral-400 dark:text-neutral-500 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-200 font-semibold font-display">No profiles yet</p>
        <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mt-2">Click "New Profile" to add your first one</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View - Shows on all but mobile screens */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="min-w-full">
          {/* Table Header */}
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-t-xl border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 px-3 py-3 text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              <div className="w-36 flex-shrink-0">Name</div>
              <div className="w-20 flex-shrink-0 text-center">Role</div>
              <div className="flex-1 min-w-[150px]">Bio</div>
              <div className="w-20 flex-shrink-0 text-center">Stage</div>
              <div className="w-32 flex-shrink-0">Contact</div>
              <div className="w-32 flex-shrink-0 text-right">Actions</div>
            </div>
          </div>
          
          {/* Table Body */}
          <div className="space-y-2 mt-2">
            {profiles.map((profile) => (
              <div 
                key={profile.id}
                onClick={() => handleRowClick(profile.id)}
                className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-primary-900/30 hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer"
              >
                <div className="flex items-center gap-2 px-3 py-3">
                  {/* Name with Avatar */}
                  <div className="w-36 flex-shrink-0 flex items-center gap-2 min-w-0">
                    <div className="relative flex-shrink-0">
                      {profile.avatar ? (
                        <img 
                          src={profile.avatar} 
                          alt={profile.name}
                          className="h-8 w-8 rounded-full object-cover shadow-md ring-2 ring-primary-100 dark:ring-primary-900/50"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-400 dark:via-primary-500 dark:to-primary-600 flex items-center justify-center text-white font-bold text-xs shadow-md ring-2 ring-primary-100 dark:ring-primary-900/50">
                          {getInitials(profile.name)}
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-400 dark:bg-green-500 border-2 border-white dark:border-neutral-800 rounded-full"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">{profile.name}</div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                        {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {/* Role Tag */}
                  <div className="w-20 flex-shrink-0 flex items-center justify-center">
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
                      profile.role === 'dev' 
                        ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-sm' 
                        : 'bg-purple-600 dark:bg-purple-500 text-white shadow-sm'
                    }`}>
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        {profile.role === 'dev' ? (
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        ) : (
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        )}
                      </svg>
                      {profile.role === 'dev' ? 'Dev' : 'Founder'}
                    </span>
                  </div>

                  {/* Bio */}
                  <div className="flex-1 min-w-[150px]">
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 line-clamp-1 leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>

                  {/* Stage Tag */}
                  <div className="w-20 flex-shrink-0 flex items-center justify-center">
                    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
                      profile.stage === 'idea' ? 'bg-amber-500 dark:bg-amber-600 text-white shadow-sm' :
                      profile.stage === 'mvp' ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm' :
                      'bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm'
                    }`}>
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        {profile.stage === 'idea' ? (
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        ) : profile.stage === 'mvp' ? (
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        ) : (
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        )}
                      </svg>
                      {profile.stage === 'idea' ? 'IDEA' : profile.stage === 'mvp' ? 'MVP' : 'GROWTH'}
                    </span>
                  </div>

                  {/* Contact */}
                  <div className="w-32 flex-shrink-0 min-w-0">
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate">
                      {profile.contact}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="w-32 flex-shrink-0 flex items-center justify-end gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(profile);
                      }}
                      className="inline-flex items-center gap-1 px-2 py-1 text-primary-700 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-neutral-700 rounded-lg font-semibold text-[10px] transition-all"
                      title="Edit profile"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(profile.id);
                      }}
                      className="inline-flex items-center gap-1 px-2 py-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-neutral-700 rounded-lg font-semibold text-[10px] transition-all"
                      title="Delete profile"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Card View - Below 640px */}
      <div className="sm:hidden space-y-3">
        {profiles.map((profile) => (
          <div 
            key={profile.id}
            onClick={() => handleRowClick(profile.id)}
            className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-primary-900/30 hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer"
          >
            <div className="p-4 space-y-4">
              {/* Header: Avatar, Name, Actions */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative flex-shrink-0">
                    {profile.avatar ? (
                      <img 
                        src={profile.avatar} 
                        alt={profile.name}
                        className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover shadow-md ring-2 ring-primary-100 dark:ring-primary-900/50"
                      />
                    ) : (
                      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-400 dark:via-primary-500 dark:to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-md ring-2 ring-primary-100 dark:ring-primary-900/50">
                        {getInitials(profile.name)}
                      </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-green-400 dark:bg-green-500 border-2 border-white dark:border-neutral-800 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 truncate">{profile.name}</h3>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                      {new Date(profile.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(profile);
                    }}
                    className="p-2 text-primary-700 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-neutral-700 rounded-lg transition-all"
                    title="Edit profile"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(profile.id);
                    }}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-neutral-700 rounded-lg transition-all"
                    title="Delete profile"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Tags: Role & Stage */}
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                  profile.role === 'dev' 
                    ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-sm' 
                    : 'bg-purple-600 dark:bg-purple-500 text-white shadow-sm'
                }`}>
                  {profile.role === 'dev' ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Developer
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                      Founder
                    </>
                  )}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                  profile.stage === 'idea' ? 'bg-amber-500 dark:bg-amber-600 text-white shadow-sm' :
                  profile.stage === 'mvp' ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm' :
                  'bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm'
                }`}>
                  {profile.stage === 'idea' ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                      </svg>
                      IDEA
                    </>
                  ) : profile.stage === 'mvp' ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      MVP
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      GROWTH
                    </>
                  )}
                </span>
              </div>

              {/* Bio */}
              <div>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              {/* Contact */}
              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                <a 
                  href={`mailto:${profile.contact}`}
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors break-all"
                >
                  {profile.contact}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileList;

