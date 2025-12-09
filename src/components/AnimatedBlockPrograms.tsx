'use client';

import { motion, type TargetAndTransition } from 'framer-motion';

interface AnimatedBlockProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    // possibilité de changer l'animation pour whileHover
    whileHover?: TargetAndTransition;
}

export const AnimatedBlock: React.FC<AnimatedBlockProps> = ({ children, delay = 0, className, whileHover }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            whileHover={whileHover}
            className={className}
        >
            {children}
        </motion.div>
    );
};