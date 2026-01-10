import { X } from "lucide-react";
import { Info } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { useState } from "react";
import { supabase } from "../../../utils/supabase/client";
import { PixelCharacter } from "./PixelCharacter";

interface SuggestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const thankYouMessages = [
  "Thanks for contributing!",
  "You're awesome!",
  "Much appreciated!",
  "You rock!",
  "Amazing contribution!",
  "Thank you so much!",
  "You're a star!",
  "Fantastic!",
];

const happyOnomatopoeias = [
  "Thanks!",
  "You rock!",
  "Amazing!",
  "Awesome!",
  "You're great!",
  "Thank you!",
  "Fantastic!",
  "Much love!",
  "You're the best!",
  "Appreciate it!",
  "Legend!",
  "You're a star!",
  "Incredible!",
  "Brilliant!",
  "Super cool!",
  "You rule!",
];

export function SuggestModal({ isOpen, onClose }: SuggestModalProps) {
  const [category, setCategory] = useState("Design System");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("https://");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [socialUrl, setSocialUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [randomCharacter] = useState(Math.floor(Math.random() * 4)); // 0-3 for the 4 characters
  const [randomMessage] = useState(thankYouMessages[Math.floor(Math.random() * thankYouMessages.length)]);
  const [randomOnomatopoeia] = useState(happyOnomatopoeias[Math.floor(Math.random() * happyOnomatopoeias.length)]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('resource_suggestions')
        .insert([
          {
            name,
            email: email || null, // Email is optional
            resource_url: url,
            category,
            description,
            social_url: socialUrl || null, // Social URL is optional
          },
        ]);

      if (submitError) throw submitError;

      // Show thank you screen (stays open until user closes it)
      setShowThankYou(true);
    } catch (err) {
      console.error('Error submitting suggestion:', err);
      setError('Failed to submit suggestion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
    setCategory("Design System");
    setTitle("");
    setUrl("https://");
    setDescription("");
    setName("");
    setEmail("");
    setSocialUrl("");
    onClose();
  };

  if (!isOpen) return null;

  // Thank you screen
  if (showThankYou) {
    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm"
        onClick={handleCloseThankYou}
      >
        <div 
          className="bg-white rounded-xl shadow-2xl border border-gray-200/60 p-8 sm:p-12 max-w-md mx-4 text-center relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleCloseThankYou}
            className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
            title="Close"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
          
          <div className="flex justify-center mb-6 relative pt-16">
            {/* Speech bubble - positioned above character */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 animate-bubble-appear-disappear z-10">
              <div className="relative bg-white border-2 border-gray-900 rounded-xl px-2.5 py-1 shadow-lg">
                <p className="text-xs font-bold" style={{ fontFamily: 'var(--font-body)' }}>
                  {randomOnomatopoeia}
                </p>
                {/* Speech bubble tail pointing down */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
                <div className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white"></div>
              </div>
            </div>
            
            {/* Animated character with side-to-side movement */}
            <div className="animate-wiggle-happy">
              <PixelCharacter characterIndex={randomCharacter} />
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            {randomMessage}
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base" style={{ fontFamily: 'var(--font-body)' }}>
            Your suggestion has been submitted successfully. We'll review it soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Modal desktop */}
      <div className="hidden md:block fixed inset-0 z-[100]">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-xl shadow-2xl border border-gray-200/60 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200/50">
            <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
              Suggest a resource
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
              title="Close"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Body */}
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Section 1: Resource info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                    Resource info
                  </h4>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                    Type
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <option>Design System</option>
                    <option>Tool</option>
                    <option>Job</option>
                    <option>Reading</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                    Name
                  </label>
                  <input 
                    type="text"
                    placeholder="Something awesome you found ✨"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                    URL
                  </label>
                  <input 
                    type="url"
                    placeholder="Where can we find it? 🔗"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-400"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                    Description
                  </label>
                  <textarea 
                    rows={2}
                    placeholder="Tell us what makes it special..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none placeholder:text-gray-400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100"></div>

              {/* Section 2: Your info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                    Your info
                  </h4>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                    Your name
                  </label>
                  <input 
                    type="text"
                    placeholder="How should we call you? 👋"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                    Social profile <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input 
                    type="url"
                    placeholder="Your X, LinkedIn, or portfolio 🌐"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-400"
                    value={socialUrl}
                    onChange={(e) => setSocialUrl(e.target.value)}
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                  <p className="text-[11px] text-gray-500 mt-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                    We'll link your name to this profile
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                    Email <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input 
                    type="email"
                    placeholder="We'll keep you posted ✉️"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                  <p className="text-[11px] text-gray-500 mt-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                    Your email won't appear on the web. No spam, promise
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600" style={{ fontFamily: 'var(--font-body)' }}>{error}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-2 px-5 py-4 bg-gray-50/50 border-t border-gray-200/50">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <div className="flex-1">
                <PrimaryButton type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </PrimaryButton>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal mobile fullscreen */}
      <div className="md:hidden fixed inset-0 z-[100] bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200/50 flex-shrink-0">
          <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
            Suggest a resource
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
            title="Close"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          {/* Body - scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Section 1: Resource info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                  Resource info
                </h4>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                  Type
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-auto" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <option>Design System</option>
                  <option>Tool</option>
                  <option>Job</option>
                  <option>Reading</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                  Name
                </label>
                <input 
                  type="text"
                  placeholder="Something awesome you found ✨"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-400 cursor-text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                  URL
                </label>
                <input 
                  type="url"
                  placeholder="Where can we find it? 🔗"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-400 cursor-text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                  Description
                </label>
                <textarea 
                  rows={3}
                  placeholder="Tell us what makes it special..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none placeholder:text-gray-400 cursor-text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Section 2: Your info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                  Your info
                </h4>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                  Your name
                </label>
                <input 
                  type="text"
                  placeholder="How should we call you? 👋"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-400 cursor-text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                  Social profile <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input 
                  type="url"
                  placeholder="Your X, LinkedIn, or portfolio 🌐"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-400 cursor-text"
                  value={socialUrl}
                  onChange={(e) => setSocialUrl(e.target.value)}
                  style={{ fontFamily: 'var(--font-body)' }}
                />
                <p className="text-[11px] text-gray-500 mt-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                  We'll link your name to this profile
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                  Email <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input 
                  type="email"
                  placeholder="We'll keep you posted ✉️"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-gray-400 cursor-text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontFamily: 'var(--font-body)' }}
                />
                <p className="text-[11px] text-gray-500 mt-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                  Your email won't appear on the web. No spam, promise
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600" style={{ fontFamily: 'var(--font-body)' }}>{error}</p>
              </div>
            )}
          </div>

          {/* Footer - fixed at bottom */}
          <div className="flex flex-col gap-2 px-5 py-4 pb-20 bg-gray-50/50 border-t border-gray-200/50 flex-shrink-0">
            <PrimaryButton type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </PrimaryButton>
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}