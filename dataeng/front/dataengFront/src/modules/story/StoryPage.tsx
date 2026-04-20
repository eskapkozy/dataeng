import { HeroSection } from './heroSection';
import { OrigineSection, ConstatSection, VisionSection, PiliersSection, ChiffresSection } from './chapterSection';
import { CommunauteSection, FuturSection, CtaSection } from './finalSection';
import { StoryProgress } from './StoryProgress';
import './brand.css';
import './styles.css';

export function StoryPage() {

  return (
    <div className="story-container">
      <StoryProgress />
      
      <main>
        <HeroSection />
        
        <section id="origine">
          <OrigineSection />
        </section>
        
        <section id="constat">
          <ConstatSection />
        </section>
        
        <section id="vision">
          <VisionSection />
        </section>
        
        <section id="piliers">
          <PiliersSection />
        </section>
        
        <section id="chiffres">
          <ChiffresSection />
        </section>
        
        <section id="communaute">
          <CommunauteSection />
        </section>
        
        <section id="futur">
          <FuturSection />
        </section>
        
        <CtaSection />
      </main>
    </div>
  );
}
