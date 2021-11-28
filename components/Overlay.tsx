import { motion } from "framer-motion";

function Overlay({ post, handleClose, prefix }) {
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  return (
    <motion.div
      className="fixed inset-0 z-10 flex items-start justify-center w-full h-screen mx-auto bg-white"
      layoutId={`${prefix ? `${prefix}-` : ""}${post.id}`}
      transition={{ type: "spring", bounce: 0.1 }}
    >
      <motion.div
        transition={{ type: "spring", bounce: 0.1 }}
        initial={{ borderRadius: 24 }}
        animate={{ borderRadius: 0 }}
        exit={{ borderRadius: 24 }}
        layoutId={`${prefix ? `${prefix}-` : ""}${post.id}-img`}
        layout
        onClick={handleClose}
        className="flex items-center justify-center h-screen"
        drag="y"
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.y, velocity.y);
          if (
            swipe < -swipeConfidenceThreshold ||
            swipe > swipeConfidenceThreshold
          ) {
            handleClose();
          }
        }}
      >
        <img
          src={`images/${post.fileName}`}
          className="object-cover object-center w-full h-full max-w-full max-h-screen pointer-events-none"
          alt={`shot by ${post.name}`}
        />
      </motion.div>
      <motion.div
        className="absolute p-2 border rounded-md bottom-2 left-2 backdrop-filter backdrop-blur-lg backdrop-brightness-120 backdrop-saturate-150 bg-black/40 text-white/75 border-white/10"
        transition={{ type: "spring", bounce: 0.1 }}
        layoutId={`${prefix ? `${prefix}-` : ""}${post.id}-info`}
        layout
      >
        <h3>
          <a href={post.link} target="_blank">
            @{post.username}
          </a>
        </h3>
      <p className="text-sm">{post.name}</p>
      </motion.div>
    </motion.div>
  );
}

export default Overlay;
