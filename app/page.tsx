import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Snapshot from '@/components/sections/Snapshot';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import CVViewer from '@/components/sections/CVViewer';
import Contact from '@/components/sections/Contact';
import Portfolio from '@/components/sections/Portfolio';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Snapshot />
        <Skills />
        <Portfolio />
        <Experience />
        <CVViewer />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
