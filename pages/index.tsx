import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useState } from "react";
import Overlay from "../components/Overlay";
import Slider from "../components/Slider";
import { data } from "../public/images/data";


function Home({ posts }: { posts: [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [prefix, setPrefix] = useState(null);
  const handleSelect = ({ post, prefix }) => {
    setIsOpen(true);
    setPost(post);
    setPrefix(prefix);
    console.log(prefix);
  };
  const handleClose = () => {
    setIsOpen(false);
    setPost(null);
    setPrefix(null);
  };
  return (
    <div>
      <Head>
        <title>Project 13</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative max-w-4xl mx-auto mt-6">
        <div className="w-full pb-1 mb-2 border-b border-gray-200">
          <h1 className="px-4 text-3xl font-bold">For You</h1>
        </div>
        {/* <div className="flex justify-between">
          <textarea
            className="w-full h-48 text-xs font-medium bg-transparent border-none outline-none dark:text-gray-50 dark:bg-black"
            readOnly
            value={JSON.stringify(posts, null, "\t")}
          />
          <textarea
            className="w-full h-48 text-xs font-medium bg-transparent border-none outline-none dark:text-gray-50 dark:bg-black"
            readOnly
            value={JSON.stringify(data, null, "\t")}
          />
        </div> */}
        <div>
          <h2 className="px-4 text-lg font-semibold lg:text-xl">Memories</h2>
          <Slider onSelect={handleSelect} posts={posts} />
        </div>
        <hr className="mt-6 text-gray-200" />
        <div className="pt-2">
          <h2 className="px-4 text-lg font-semibold lg:text-xl">
            Featured Photos
          </h2>
          <Slider
            onSelect={handleSelect}
            posts={posts.slice(6)}
            prefix="featured"
            type="featured"
          />
        </div>
        <p className="pt-16 pb-4 text-xs text-center text-gray-400">
          Images from UnSplash. Design by Oliver.
        </p>
      </div>
      <AnimatePresence exitBeforeEnter>
        {isOpen && post && (
          <Overlay post={post} prefix={prefix} handleClose={handleClose} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;

export async function getStaticProps() {
  function shuffle(array) {
    var tmp,
      current,
      top = array.length;

    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }

    return array;
  }
  const posts = shuffle(data);
  return {
    props: {
      posts,
    }, // will be passed tothe page component as props
  };
}
