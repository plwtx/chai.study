import { Panda } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

function AnimatedPanda() {
  return (
    <motion.div
      animate={{ rotate: [-15, 15, -15] }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      }}
      className="inline-block origin-bottom"
    >
      <Panda className="stroke-brown-600 m-3 size-20 stroke-[0.5px] dark:stroke-white/65" />
    </motion.div>
  );
}
export default function Settings() {
  return (
    <>
      <div className="font-poppins text-brown-600/75 dark:text-dark-100 h-full w-full">
        <div className="flex h-full w-full flex-col items-center justify-center">
          {/* Title */}
          <AnimatedPanda />
          <h1 className="font-poppins px-3 text-lg font-light">
            <span className="font-medium">Sorry</span>, this page is still being
            developed ...
          </h1>
          <Link
            to="/"
            className="text-brown-500 hover:text-brown-700 dark:hover:text-dark-100 text-sm underline underline-offset-4 transition-colors dark:text-white"
          >
            Go home
          </Link>
        </div>
      </div>
    </>
  );
}
