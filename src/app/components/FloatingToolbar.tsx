import { Brain, Bot } from "lucide-react";
import { motion } from "motion/react";

interface FloatingToolbarProps {
  machineMode?: boolean;
  onMachineModeToggle?: () => void;
}

export function FloatingToolbar({ machineMode = false, onMachineModeToggle }: FloatingToolbarProps) {
  const handleToggle = () => {
    if (onMachineModeToggle) {
      onMachineModeToggle();
    }
  };

  return (
    <>
      {/* Barra flotante desktop */}
      <div className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-full shadow-lg shadow-black/5">
          <div className="flex items-center gap-1 px-2 py-2">
            {/* Toggle HUMAN/MACHINE - Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-full relative">
              {/* Background animado que se mueve */}
              <motion.div
                className="absolute bg-white shadow-sm rounded-full"
                initial={false}
                animate={{
                  x: machineMode ? '100%' : '0%',
                  width: machineMode ? 'calc(50% - 2px)' : 'calc(50% - 2px)',
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }}
                style={{
                  height: 'calc(100% - 8px)',
                  top: '4px',
                  left: '4px',
                }}
              />

              {/* Opción HUMAN */}
              <button
                onClick={!machineMode ? undefined : handleToggle}
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors relative z-10"
                title="Human mode"
              >
                <motion.div
                  animate={{
                    scale: !machineMode ? 1 : 0.9,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20
                  }}
                >
                  <Brain 
                    className={`w-4 h-4 transition-colors duration-200 ${
                      !machineMode ? 'text-blue-600' : 'text-gray-400'
                    }`}
                    strokeWidth={2}
                  />
                </motion.div>
                <span className={`text-sm font-mono font-medium tracking-tight transition-colors duration-200 antialiased ${
                  !machineMode ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  HUMAN
                </span>
              </button>

              {/* Opción MACHINE */}
              <button
                onClick={machineMode ? undefined : handleToggle}
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors relative z-10"
                title="Machine mode"
              >
                <motion.div
                  animate={{
                    scale: machineMode ? 1 : 0.9,
                    rotate: machineMode ? 360 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                    rotate: {
                      duration: 3,
                      repeat: machineMode ? Infinity : 0,
                      ease: "linear"
                    }
                  }}
                >
                  <Bot 
                    className={`w-4 h-4 transition-colors duration-200 ${
                      machineMode ? 'text-green-600' : 'text-gray-400'
                    }`}
                    strokeWidth={2}
                  />
                </motion.div>
                <span className={`text-sm font-mono font-medium tracking-tight transition-colors duration-200 antialiased ${
                  machineMode ? 'text-green-600' : 'text-gray-500'
                }`}>
                  MACHINE
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}