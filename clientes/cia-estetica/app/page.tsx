import { Hero } from '@/components/sections/Hero';
import { AuthorityBar } from '@/components/sections/AuthorityBar';
import { PathChoice } from '@/components/sections/PathChoice';
import { CoursesSection } from '@/components/sections/CoursesSection';
import { FeaturedCourse } from '@/components/sections/FeaturedCourse';
import { About } from '@/components/sections/About';
import { Benefits } from '@/components/sections/Benefits';
import { Testimonials } from '@/components/sections/Testimonials';
import { GoogleReviews } from '@/components/sections/GoogleReviews';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Products } from '@/components/sections/Products';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { FaqSection } from '@/components/sections/FaqSection';
import { Location } from '@/components/sections/Location';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/ui/JsonLd';
import { buildGraph, courseListSchema, faqSchema } from '@/lib/schema';
import { homeFaqs } from '@/data/faq';

/**
 * HOME — ordem definida no requisito 44 do briefing.
 * O title/description/canonical vêm do metadata padrão em app/layout.tsx.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={buildGraph(courseListSchema(), faqSchema(homeFaqs))} />

      <Hero />
      <AuthorityBar />
      <PathChoice />
      <CoursesSection />
      <FeaturedCourse />
      <About />
      <Benefits />
      <Testimonials />
      <GoogleReviews />
      <HowItWorks />
      <Products />
      <BlogPreview />
      <FaqSection />
      <Location />
      <FinalCta />
    </>
  );
}
