
import React from 'react';

export const Squiggle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 10C15 10 15 2 28 2C41 2 41 18 54 18C67 18 67 6 80 6C93 6 93 14 98 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const Spiral: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 50C50 50 55 45 60 50C65 55 60 65 50 65C40 65 30 55 35 40C40 25 60 20 70 30C80 40 80 60 65 75C50 90 20 80 10 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
  </svg>
);

export const ArrowDoodle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 25C30 25 50 10 90 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M80 10L90 20L80 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const MessyCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10C20 10 10 30 10 50C10 70 30 90 50 90C70 90 90 70 90 50C90 30 70 10 50 15C35 18 20 40 25 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const StarDoodle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 5L29 18L43 18L32 26L36 40L25 32L14 40L18 26L7 18L21 18L25 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

export const UnderlineDoodle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 20" className={className} fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 15C40 5 150 5 198 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const FlowerDoodle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 25C25 15 35 15 35 25C35 35 25 35 25 25ZM25 25C15 25 15 15 25 15C35 15 35 25 25 25ZM25 25C25 35 15 35 15 25C15 15 25 15 25 25ZM25 25C35 25 35 35 25 35C15 35 15 25 25 25Z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="25" cy="25" r="3" fill="currentColor"/>
  </svg>
);

export const HeartSketch: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 39.7C25 39.7 5 25 5 15C5 8 12 5 17 5C21 5 25 10 25 10C25 10 29 5 33 5C38 5 45 8 45 15C45 25 25 39.7 25 39.7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
