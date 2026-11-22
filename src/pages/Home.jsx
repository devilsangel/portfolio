import Hero from "../components/Hero";
import Work from "../components/Work";
import About from "../components/About";
import LatestPosts from "../components/LatestPosts";
import Contact from "../components/Contact";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Home() {
  usePageMeta();
  return (
    <>
      <Hero />
      <Work />
      <About />
      <LatestPosts />
      <Contact />
    </>
  );
}
