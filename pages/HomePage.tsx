import React from 'react';
import { Hero } from '../components/Hero';
import { TrustSignals } from '../components/TrustSignals';
import { Services } from '../components/Services';
import { HowItWorks } from '../components/HowItWorks';
import { SampleShowcase } from '../components/SampleShowcase';
import { Testimonials } from '../components/Testimonials';
import { Faq } from '../components/Faq';
import { Service, Sample } from '../types';

interface HomePageProps {
  onOrderAttempt: (price: number) => void;
  services: Service[];
  samples: Sample[];
}

export const HomePage = ({ onOrderAttempt, services, samples }: HomePageProps) => {
  return (
    <>
      <Hero onOrderAttempt={onOrderAttempt} services={services} />
      <TrustSignals />
      <section id="services">
        <Services services={services} />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="samples">
          <SampleShowcase samples={samples} />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="faq">
        <Faq />
      </section>
    </>
  );
};