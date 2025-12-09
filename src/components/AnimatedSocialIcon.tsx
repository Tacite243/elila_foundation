'use client';

import { motion } from 'framer-motion';

interface AnimatedSocialIconProps {
    href: string;
    className: string;
    children: React.ReactNode;
}

export const AnimatedSocialIcon: React.FC<AnimatedSocialIconProps> = ({ href, className, children }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className={className}
        >
            {children}
        </motion.a>
    );
};