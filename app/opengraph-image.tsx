import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Open Directory | Open-source agent skills';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '32px',
          boxShadow: '0 0 100px rgba(133, 111, 230, 0.15)',
        }}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '40px' }}>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#856FE6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8L16 12L12 16" stroke="#856FE6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12H16" stroke="#856FE6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              marginBottom: '20px',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Open Directory
          </div>
          
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.6)',
              letterSpacing: '-0.02em',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Agent Skills & Automation Pipelines
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
