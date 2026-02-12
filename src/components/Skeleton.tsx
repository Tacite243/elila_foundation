import React from 'react';



// Une fonction pour fusionner les classes Tailwind de manière conditionnelle
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// Le composant Skeleton accepte n'importe quelle props d'un div HTML
const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn('animate-pulse rounded-md bg-gray-200', className)}
            {...props}
        />
    );
};

export default Skeleton;