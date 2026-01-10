import { Users, Heart, Sparkles, Code } from "lucide-react";
import { PixelCharacter } from "./PixelCharacter";
import { DevModePadding } from "./DevModePadding";
import { SuggestModal } from "./SuggestModal";
import { useState, useEffect } from "react";

// Random initials for community avatars
const communityInitials = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
  "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
  "U", "V", "W", "X", "Y", "Z"
];

const avatarColors = [
  "border-purple-400", "border-blue-400", "border-pink-400", "border-indigo-400",
  "border-violet-400", "border-fuchsia-400", "border-cyan-400", "border-purple-500",
  "border-blue-500", "border-pink-500"
];

interface BallAvatar {
  id: number;
  initials: string;
  color: string;
  textColor: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  initialY: number;
}

// Random first names for contributors - Spanish, Italian, English
const contributorNames = [
  // Spanish names
  "Alba", "Carmen", "Diego", "Elena", "Fernando", "Gabriela", "Hugo", "Isabel",
  "Javier", "Laura", "Manuel", "Natalia", "Óscar", "Paula", "Roberto", "Sofía",
  "Antonio", "Beatriz", "Carlos", "Dolores", "Enrique", "Francisco", "Gloria", "Héctor",
  "Inés", "José", "Lucía", "Mateo", "Nuria", "Pablo", "Raquel", "Sergio",
  "Teresa", "Vicente", "Alejandra", "Andrés", "Cristina", "Daniel", "Eva", "Guillermo",
  
  // Italian names
  "Alessandro", "Bianca", "Carlo", "Daniela", "Emilia", "Francesco", "Giulia", "Leonardo",
  "Marco", "Nicola", "Olivia", "Pietro", "Rosa", "Simone", "Valentina", "Andrea",
  "Chiara", "Davide", "Elena", "Filippo", "Giorgia", "Lorenzo", "Martina", "Matteo",
  "Sofia", "Tommaso", "Alessia", "Antonio", "Camilla", "Luca", "Sara", "Vittoria",
  
  // English names
  "Alexander", "Emma", "James", "Olivia", "William", "Sophia", "Benjamin", "Charlotte",
  "Lucas", "Amelia", "Henry", "Mia", "Oliver", "Isabella", "Jack", "Ava",
  "Thomas", "Emily", "George", "Lily", "Harry", "Grace", "Oscar", "Ruby",
  "Charlie", "Ella", "Jacob", "Sophie", "Noah", "Chloe", "Arthur", "Daisy",
  
  // More Spanish
  "Adrián", "Clara", "Miguel", "Victoria", "Jorge", "Marina", "Luis", "Ana",
  "Rafael", "María", "Pedro", "Irene", "Marcos", "Silvia", "Rubén", "Julia",
  
  // More Italian
  "Giovanni", "Francesca", "Giuseppe", "Anna", "Riccardo", "Federica", "Gabriele", "Elisa",
  "Michele", "Beatrice", "Stefano", "Claudia", "Fabio", "Laura", "Luca", "Serena",
  
  // More English
  "Edward", "Lucy", "Samuel", "Poppy", "Daniel", "Florence", "Matthew", "Evie",
  "Joseph", "Freya", "David", "Alice", "Leo", "Rose", "Max", "Ivy"
];

export function ContributorsSection() {
  const [avatars, setAvatars] = useState<BallAvatar[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const newAvatars: BallAvatar[] = [];
    const textColorMap: { [key: string]: string } = {
      "border-purple-400": "text-purple-400",
      "border-blue-400": "text-blue-400",
      "border-pink-400": "text-pink-400",
      "border-indigo-400": "text-indigo-400",
      "border-violet-400": "text-violet-400",
      "border-fuchsia-400": "text-fuchsia-400",
      "border-cyan-400": "text-cyan-400",
      "border-purple-500": "text-purple-500",
      "border-blue-500": "text-blue-500",
      "border-pink-500": "text-pink-500"
    };
    
    // Crear bolas con delays escalonados para que aparezcan poco a poco
    for (let i = 0; i < 30; i++) {
      const initials = communityInitials[Math.floor(Math.random() * communityInitials.length)];
      const color = avatarColors[Math.floor(Math.random() * avatarColors.length)];
      const textColor = textColorMap[color] || "text-purple-400";
      const left = Math.floor(Math.random() * 100);
      // Delay escalonado: cada bola aparece con más delay que la anterior
      const delay = i * 300; // 300ms entre cada bola
      const duration = Math.floor(Math.random() * 4000) + 6000;
      const size = Math.floor(Math.random() * 24) + 32;
      const initialY = -10; // Todas empiezan desde arriba, fuera de la vista
      newAvatars.push({ id: i, initials, color, textColor, left, delay, duration, size, initialY });
    }
    setAvatars(newAvatars);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 sm:mb-16 pt-8 sm:pt-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 break-words" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Contributors
        </h1>
        
        <p className="text-base sm:text-xl text-gray-600 max-w-3xl mb-6 sm:mb-8 break-words">
          Amazing people who have contributed to building this resource.
        </p>
      </div>

      {/* WIP Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl border-2 border-dashed border-purple-300/60 p-8 sm:p-12 lg:p-16">
        {/* Falling Ball Avatars - Ball Pit Effect */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              className={`absolute ${avatar.color} border-2 bg-transparent rounded-full flex items-center justify-center ${avatar.textColor} font-bold opacity-60`}
              style={{
                width: `${avatar.size}px`,
                height: `${avatar.size}px`,
                left: `${avatar.left}%`,
                fontSize: `${avatar.size * 0.35}px`,
                fontFamily: 'var(--font-body)',
                animation: `fall ${avatar.duration}ms ease-in ${avatar.delay}ms infinite`,
                top: `${avatar.initialY}%`,
              }}
            >
              {avatar.initials}
            </div>
          ))}
        </div>

        {/* Decorative dots pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-4 left-4 w-2 h-2 bg-purple-400 rounded-full"></div>
          <div className="absolute top-8 right-12 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-12 left-16 w-2 h-2 bg-purple-400 rounded-full"></div>
          <div className="absolute bottom-4 right-8 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
        </div>

        <div className="relative text-center max-w-2xl mx-auto">
          {/* Pixel Characters Row */}
          <div className="flex justify-center items-end gap-4 mb-8">
            <div className="animate-bounce" style={{ animationDelay: '0ms', animationDuration: '2s' }}>
              <PixelCharacter characterIndex={0} />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '200ms', animationDuration: '2s' }}>
              <PixelCharacter characterIndex={1} />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '400ms', animationDuration: '2s' }}>
              <PixelCharacter characterIndex={2} />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '600ms', animationDuration: '2s' }}>
              <PixelCharacter characterIndex={3} />
            </div>
          </div>

          {/* WIP Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-200 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" strokeWidth={2} />
            <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider" style={{ fontFamily: 'var(--font-body)' }}>
              Work in Progress
            </span>
          </div>

          {/* Main Message */}
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
            We're building something special
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            This section will showcase all the amazing contributors who help make this resource better. Stay tuned!
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Users className="w-4 h-4 text-purple-600" strokeWidth={2} />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                Community driven
              </span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Heart className="w-4 h-4 text-red-500" strokeWidth={2} />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                Open source
              </span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Code className="w-4 h-4 text-blue-600" strokeWidth={2} />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                Built together
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <Heart className="w-4 h-4" strokeWidth={2} />
            Start contributing
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
        {/* Card 1 */}
        <DevModePadding paddingValue="24px">
          <div className="bg-white rounded-xl p-6 border border-gray-200/60 hover:border-purple-200 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-purple-600" strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Recognition
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Every contributor will be featured with their name and contributions
            </p>
          </div>
        </DevModePadding>

        {/* Card 2 */}
        <DevModePadding paddingValue="24px">
          <div className="bg-white rounded-xl p-6 border border-gray-200/60 hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Stats
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Track total contributions and see the community impact grow
            </p>
          </div>
        </DevModePadding>

        {/* Card 3 */}
        <DevModePadding paddingValue="24px">
          <div className="bg-white rounded-xl p-6 border border-gray-200/60 hover:border-purple-200 transition-colors sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-5 h-5 text-red-500" strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Appreciation
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Show gratitude to everyone who helps improve this resource
            </p>
          </div>
        </DevModePadding>
      </div>

      {/* Suggest Modal */}
      <SuggestModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}