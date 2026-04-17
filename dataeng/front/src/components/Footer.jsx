import React from 'react';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <Container>
        <div className="py-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2026 DataEng. Built with React, Vite, and Tailwind CSS.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
