// ConnectModal - Modal for sending connection requests
import { useState } from 'react';
import type { Profile } from '../types';

interface ConnectModalProps {
  isOpen: boolean;
  profile: Profile;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

// Quick message templates for user convenience
const messageTemplates = [
  "Hi! I'd love to connect and discuss potential collaboration.",
  "Your project sounds interesting! Let's chat about how we can work together.",
  "I think we'd make a great team. Would love to hear more about your vision.",
];

function ConnectModal({ isOpen, profile, onClose, onSubmit }: ConnectModalProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate slight delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    onSubmit(message);
    setMessage('');
    setIsSubmitting(false);
  };

  const handleTemplateClick = (template: string) => {
    setMessage(template);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">
                Connect with {profile.name}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Send a connection request
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-all"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-5">
            {/* Profile Preview */}
            <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-12 w-12 rounded-full object-cover shadow-md ring-2 ring-primary-100 dark:ring-primary-900/50"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-400 dark:via-primary-500 dark:to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-primary-100 dark:ring-primary-900/50">
                  {profile.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-neutral-900 dark:text-white">{profile.name}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 truncate">{profile.bio}</div>
              </div>
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Introduction Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all resize-none"
                placeholder="Introduce yourself and explain why you'd like to connect..."
                required
              />
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                {message.length} / 500 characters
              </p>
            </div>

            {/* Quick Templates */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Quick Templates
              </label>
              <div className="space-y-2">
                {messageTemplates.map((template, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleTemplateClick(template)}
                    className="w-full text-left px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-all border border-neutral-200 dark:border-neutral-600"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-700/50 border-t border-neutral-200 dark:border-neutral-700 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConnectModal;

