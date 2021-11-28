import { motion } from "framer-motion";
import Image from "next/image";

function Card({ post, onSelect, prefix, type }) {
  return (
    <motion.div
      className={`${
        type === "featured" ? "rounded-lg h-[440px]" : "rounded-3xl h-[400px]"
      } overflow-clip w-full select-none`}
      layoutId={`${prefix ? `${prefix}-` : ""}${post.id}`}
      transition={{ type: "spring", bounce: 0.2 }}
      whileTap={{ scale: 0.97 }}
      initial={{ borderRadius: type === "featured" ? 8 : 24 }}
      animate={{ borderRadius: type === "featured" ? 8 : 24 }}
      exit={{ borderRadius: 0 }}
    >
      <motion.div
        layout
        layoutId={`${prefix ? `${prefix}-` : ""}${post.id}-img`}
        transition={{ type: "spring", bounce: 0.2 }}
        onClick={() => onSelect({ post, prefix })}
        initial={{ borderRadius: type === "featured" ? 8 : 24 }}
        animate={{ borderRadius: type === "featured" ? 8 : 24 }}
        exit={{ borderRadius: 0 }}
      >
        <Image
          src={`images/${post.fileName}`}
          width={"100%"}
          height={400}
          className={`object-cover object-center w-full ${
            type === "featured" ? "h-[calc(100%-48px)]" : "h-full"
          }`}
          alt={`shot by ${post.name}`}
        />
      </motion.div>
      {type === "featured" ? (
        <motion.div
          className="inline-block"
          transition={{ type: "spring", bounce: 0.2 }}
          layoutId={`${prefix ? `${prefix}-` : ""}${post.id}-info`}
          layout
        >
          <h2 className="pt-1 font-semibold">@{post.username}</h2>
          <h3 className="py-0 mt-[-2px] text-gray-500 transition hover:text-blue-500 text-xs">
            <a href={post.link} target={"_blank"}>
              By {post.name}
            </a>
          </h3>
        </motion.div>
      ) : (
        <motion.div
          className="absolute bottom-0 px-4 pb-2 text-white text-shadow-sm"
          transition={{ type: "spring", bounce: 0.2 }}
          layoutId={`${prefix ? `${prefix}-` : ""}${post.id}-info`}
          layout
        >
          <h2 className="text-2xl font-bold text-white text-shadow-lg">
            {post.date}
          </h2>
          <h3 className="text-sm transition hover:text-blue-500 opacity-80">
            <a href={post.link} target={"_blank"}>
              By {post.name}
            </a>
          </h3>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Card;
