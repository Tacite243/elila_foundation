'use client'
import React from "react";

const IdentificationPage: React.FC = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '1rem' }}>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSd3E9XXy09W9QppBahqDGzreVPqVG29_oW7rlec7oBiJQL6kw/viewform?embedded=true"
          width="700"
          height="520"
        //   frameBorder="0"
        //   marginHeight={0}
        //   marginWidth={0}
          style={{
            border: 'none',
            maxWidth: '100%',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden', // Empêche le scroll interne
            scrollbarWidth: 'none', // Pour certains navigateurs
          }}
          title="Identification Form"
        ></iframe>
        <style jsx>{`
          iframe {
            scrollbar-width: none; /* Firefox */
          }
          iframe::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge */
          }
        `}</style>
      </div>
    );
  };
  export default IdentificationPage;