import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TournamentsSection from '@/components/TournamentsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TournamentsSection />
      </main>
      <Footer />
    </>
  );
}