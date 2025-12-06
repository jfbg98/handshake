// ProfileFormModal component - Modal form for creating/editing profiles
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Profile } from '../types';

interface ProfileFormModalProps {
  isOpen: boolean;
  initialProfile?: Profile;
  onSubmit: (profile: Omit<Profile, "id"> | Profile) => void;
  onClose: () => void;
}

function ProfileFormModal({ isOpen, initialProfile, onSubmit, onClose }: ProfileFormModalProps) {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    role: 'dev' as 'dev' | 'founder',
    bio: '',
    skills: '',
    stage: 'idea' as 'idea' | 'mvp' | 'growth',
    contact: '',
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (initialProfile) {
      setFormData({
        name: initialProfile.name,
        role: initialProfile.role,
        bio: initialProfile.bio,
        skills: initialProfile.skills,
        stage: initialProfile.stage,
        contact: initialProfile.contact,
      });
    } else {
      // Reset form for new profile
      setFormData({
        name: '',
        role: 'dev',
        bio: '',
        skills: '',
        stage: 'idea',
        contact: '',
      });
    }
    setErrors({});
  }, [initialProfile, isOpen]);

  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    }
    if (!formData.skills.trim()) {
      newErrors.skills = 'Skills is required';
    }
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // If editing, include the id and created_at
    if (initialProfile) {
      onSubmit({ ...formData, id: initialProfile.id, created_at: initialProfile.created_at });
    } else {
      // For new profiles, include current timestamp
      onSubmit({ ...formData, created_at: new Date().toISOString() });
    }
  };

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

  return (
    // Modal overlay with backdrop blur
    <div className="fixed inset-0 bg-neutral-900 dark:bg-black bg-opacity-70 dark:bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 md:p-6 animate-fadeIn">
      {/* Modal container */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-neutral-200 dark:border-neutral-700 transform transition-all animate-slideUp">
        {/* Modal header */}
        <div className="flex justify-between items-start sm:items-center bg-gradient-to-r from-secondary-50 to-secondary-100 dark:from-neutral-900 dark:to-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-4 sm:px-6 lg:px-7 py-4 sm:py-5 lg:py-6">
          <div className="flex-1 min-w-0 pr-3">
            <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
              {initialProfile ? '✏️ Edit Profile' : '➕ New Profile'}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1.5 font-medium">
              {initialProfile ? 'Update profile information' : 'Add a new developer or founder profile'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full p-2.5 transition-all duration-200"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="px-6 py-6 space-y-5">
            {/* Name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 transition-all ${
                  errors.name 
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/20 dark:border-red-500' 
                    : 'border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-slate-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100'
                }`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="text-red-600 dark:text-red-400 text-sm mt-2 flex items-center font-medium">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </p>}
            </div>

            {/* Role field */}
            <div>
              <label htmlFor="role" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                Role *
              </label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 hover:border-neutral-400 dark:hover:border-slate-500 transition-all bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
              >
                <option value="dev">💻 Developer</option>
                <option value="founder">🚀 Founder</option>
              </select>
            </div>

            {/* Bio field */}
            <div>
              <label htmlFor="bio" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                Bio *
              </label>
              <input
                type="text"
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 transition-all ${
                  errors.bio 
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/20 dark:border-red-500' 
                    : 'border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-slate-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100'
                }`}
                placeholder="Brief description of what you're working on or looking for"
              />
              {errors.bio && <p className="text-red-600 dark:text-red-400 text-sm mt-2 flex items-center font-medium">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.bio}
              </p>}
            </div>

            {/* Skills field */}
            <div>
              <label htmlFor="skills" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                Skills *
              </label>
              <textarea
                id="skills"
                value={formData.skills}
                onChange={(e) => handleChange('skills', e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 transition-all resize-none ${
                  errors.skills 
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/20 dark:border-red-500' 
                    : 'border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-slate-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100'
                }`}
                placeholder="For developers: your skills and technologies. For founders: what you need in a co-founder."
              />
              {errors.skills && <p className="text-red-600 dark:text-red-400 text-sm mt-2 flex items-center font-medium">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.skills}
              </p>}
            </div>

            {/* Stage field */}
            <div>
              <label htmlFor="stage" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                Stage *
              </label>
              <select
                id="stage"
                value={formData.stage}
                onChange={(e) => handleChange('stage', e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 hover:border-neutral-400 dark:hover:border-slate-500 transition-all bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
              >
                <option value="idea">💡 Idea</option>
                <option value="mvp">🛠️ MVP</option>
                <option value="growth">📈 Growth</option>
              </select>
            </div>

            {/* Contact field */}
            <div>
              <label htmlFor="contact" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                Contact *
              </label>
              <input
                type="text"
                id="contact"
                value={formData.contact}
                onChange={(e) => handleChange('contact', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 transition-all ${
                  errors.contact 
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/20 dark:border-red-500' 
                    : 'border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-slate-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100'
                }`}
                placeholder="Email or other contact method"
              />
              {errors.contact && <p className="text-red-600 dark:text-red-400 text-sm mt-2 flex items-center font-medium">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.contact}
              </p>}
            </div>
          </div>
          
          {/* Modal footer */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 px-7 py-5 bg-secondary-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 sticky bottom-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 text-neutral-700 dark:text-neutral-300 font-semibold bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 border border-neutral-300 dark:border-neutral-600 rounded-xl transition-all shadow-sm hover:shadow"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-white font-bold bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 rounded-xl transition-all shadow-lg hover:shadow-xl dark:shadow-primary-900/50 transform hover:scale-105 hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Profile
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileFormModal;

