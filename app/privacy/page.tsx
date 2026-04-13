import React from "react";
import { Footer } from "@/components/Footer";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white text-black overflow-x-hidden selection:bg-black selection:text-white">
      <div className="bg-noise" />
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      
      <header className="w-full max-w-[1200px] mx-auto px-6 py-6 flex justify-between items-center z-30 relative border-b border-black/[0.05]">
        <div className="flex items-center gap-3">
          <Link href="/">
            <AnimatedLogo />
          </Link>
        </div>
      </header>

      <section className="relative w-full z-10 flex-1">
        <div className="w-full max-w-[800px] mx-auto px-6 pt-20 pb-32">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter mb-8 text-black">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg prose-black max-w-none text-black/70">
            <p className="mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-black mt-12 mb-6 border-b border-black/10 pb-4">
              1. Information We Collect
            </h2>
            <p className="mb-4">
              We collect information you provide directly to us when you use our services. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Information provided when you contact us for support or other inquiries.</li>
              <li>Usage data related to how you interact with our website and open-source skills.</li>
            </ul>

            <h2 className="text-2xl font-semibold tracking-tight text-black mt-12 mb-6 border-b border-black/10 pb-4">
              2. How We Use Your Information
            </h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Provide, maintain, and improve our services.</li>
              <li>Respond to your comments, questions, and requests.</li>
              <li>Analyze usage trends and measure the effectiveness of our platform.</li>
            </ul>

            <h2 className="text-2xl font-semibold tracking-tight text-black mt-12 mb-6 border-b border-black/10 pb-4">
              3. Open Source Repositories
            </h2>
            <p className="mb-8">
              Our skills and tools are distributed as open-source repositories on GitHub. When you clone, fork, or interact with these repositories, your interactions are subject to GitHub's privacy policy and terms of service.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-black mt-12 mb-6 border-b border-black/10 pb-4">
              4. Contact Us
            </h2>
            <p className="mb-8">
              If you have any questions about this Privacy Policy, please contact us through our official GitHub organization page at <a href="https://github.com/Varnan-Tech" className="text-[#856FE6] hover:underline">Varnan-Tech</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
