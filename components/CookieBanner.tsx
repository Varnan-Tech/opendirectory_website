"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedConsent = localStorage.getItem("cookie-acknowledgement");
    
    // Use an actual browser session cookie instead of sessionStorage
    // This allows the dismiss state to be shared across all tabs in the same browser session
    const dismissedSession = document.cookie.split('; ').find(row => row.startsWith('cookie-dismissed='));
    
    if (!storedConsent && !dismissedSession) {
      setShowBanner(true);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem("cookie-acknowledgement", "true");
    setShowBanner(false);
  };

  const handleDismiss = () => {
    // Set a session cookie (no max-age/expires means it clears when the browser is completely closed)
    document.cookie = "cookie-dismissed=true; path=/";
    setShowBanner(false);
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Unconditional Tracking Scripts */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wovm99w2ci");
        `}
      </Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4F6TGC8J60"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4F6TGC8J60');
        `}
      </Script>

      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-[340px] z-50 bg-white/95 backdrop-blur-md text-black border border-[#856FE6]/30 rounded-2xl p-4 shadow-[0_8px_40px_-12px_rgba(133,111,230,0.4)]"
          >
            <div className="flex flex-col gap-3">
              <p className="text-[13px] text-black/70 leading-relaxed font-medium">
                We use cookies to improve your experience and analyze platform traffic. By continuing, you agree to our <a href="/privacy" className="text-[#856FE6] hover:underline font-semibold">Privacy Policy</a>.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 text-[13px] font-semibold text-black/60 bg-transparent hover:bg-black/5 transition-colors rounded-lg shadow-none"
                >
                  Dismiss
                </button>
                <button
                  onClick={handleAcknowledge}
                  className="flex-1 px-4 py-2 text-[13px] font-semibold bg-[#856FE6] text-white hover:bg-[#856FE6]/90 transition-colors rounded-lg shadow-sm"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
