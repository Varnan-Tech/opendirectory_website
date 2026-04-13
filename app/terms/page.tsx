import React from "react";
import { Footer } from "@/components/Footer";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import Link from "next/link";

export default function TermsPage() {
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
            Terms of Service
          </h1>
          
          <div className="prose prose-lg prose-black max-w-none text-black/70">
            <p className="mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-black mt-12 mb-6 border-b border-black/10 pb-4">
              1. Acceptance of Terms
            </h2>
            <p className="mb-8">
              By accessing and using the Open Directory platform, skills, tools, and MCP servers provided by Varnan-Tech, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-black mt-12 mb-6 border-b border-black/10 pb-4">
              2. Open Source Licenses
            </h2>
            <p className="mb-8">
              The skills and tools featured in this directory are distributed under various open-source licenses. Please refer to the specific license file (usually `LICENSE.md`) in each GitHub repository for the detailed terms governing the use, modification, and distribution of that specific skill.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-black mt-12 mb-6 border-b border-black/10 pb-4">
              3. Disclaimer of Warranties
            </h2>
            <p className="mb-8">
              Our tools, skills, and documentation are provided "as is" and "as available" without any warranty of any kind, whether express or implied. We do not warrant that the tools will meet your specific requirements, or that they will be uninterrupted, timely, secure, or error-free.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-black mt-12 mb-6 border-b border-black/10 pb-4">
              4. Limitation of Liability
            </h2>
            <p className="mb-8">
              In no event shall Varnan-Tech or its contributors be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of or inability to use the skills and tools provided, including any damages resulting from the execution of our agents or pipelines on your local systems.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-black mt-12 mb-6 border-b border-black/10 pb-4">
              5. Governing Law
            </h2>
            <p className="mb-8">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Varnan-Tech operates, without regard to its conflict of law provisions.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
