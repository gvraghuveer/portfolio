import React, { useState } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActive(href.replace('#', ''));
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md mix-blend-difference">
      <div className="flex space-x-6">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="relative text-white uppercase tracking-wider hover:text-[#00FF94]"
          >
            <span>{link.name}</span>
            {active === link.href.replace('#', '') && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#00FF94]"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
