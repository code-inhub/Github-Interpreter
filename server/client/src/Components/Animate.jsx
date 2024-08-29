import { motion } from "framer-motion";

const Animate = () => {
  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 4.5,
            duration: 0.4,
            ease: "easeIn",
          },
        }}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 3,
              duration: 0.4,
              ease: "easeIn",
            },
          }}
          className="absolute top-4 left-8 bottom-20 right-20 w-[298px] h-[298px] xl:w-[300px] xl:h-[300px] rounded-full overflow-hidden"
        ></motion.div>

        <motion.svg
          className="w-[350px] xl:w-[350px] h-[350px] xl:h-[350px] "
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#fffffd"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Animate;
