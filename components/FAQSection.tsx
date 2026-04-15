"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is Open Directory free to use?",
    answer: "Yes, all skills hosted on Open Directory are completely open-source and free to use under the MIT License. Our goal is to democratize access to powerful AI agent capabilities."
  },
  {
    question: "Do I need API keys to use these skills?",
    answer: "It depends on the skill. Many skills work out of the box without any external services. For advanced skills that interact with third-party platforms (like Twitter or Reddit), your AI agent will securely prompt you for the necessary API keys when needed."
  },
  {
    question: "Which AI agents are supported?",
    answer: "We currently support Claude Code natively via our marketplace plugin. We also support OpenCode, Codex, Gemini CLI, and Anti-Gravity through our standard npx installation method."
  },
  {
    question: "Can I contribute my own skills?",
    answer: "Absolutely! Open Directory is built by and for the community. You can submit your own skills by opening a Pull Request on our GitHub repository. We welcome contributions of all kinds."
  },
  {
    question: "Do I need to be a developer to install skills?",
    answer: "Not at all. While the tools run in a terminal, installation is as simple as copying and pasting a single command. Your AI agent handles all the complex configuration and setup automatically."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full max-w-[800px] mx-auto px-6 py-24 z-20 relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-black mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-black/60 text-lg">
          Everything you need to know about Open Directory.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div 
              key={index} 
              className="border border-black/10 rounded-2xl bg-white overflow-hidden transition-all duration-200 hover:border-black/20"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none cursor-pointer"
              >
                <span className="font-medium text-black text-lg">{faq.question}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex-shrink-0 ml-4 text-black/40"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 pb-5 text-black/60 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}