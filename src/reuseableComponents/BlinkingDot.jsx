import { motion } from "framer-motion";
const BlinkingDot = ({
  size = 4,
  color = "#00BFFF", // blue
  pulseColor = "rgba(0, 191, 255, 0.4)", // soft glow
  speed = 1,
}) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow pulse */}
      <motion.span
        className="absolute rounded-full"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          backgroundColor: pulseColor,
        }}
        animate={{
          scale: [1, 1.8],
          opacity: [0.8, 0.2],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Solid inner dot */}
      <span
        className="rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default BlinkingDot