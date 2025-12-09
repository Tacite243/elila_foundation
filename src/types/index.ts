


export interface Article {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
    image: string;
}

export interface Program {
    icon: React.ElementType;
    title: string;
    description: string;
    features: string[];
    color: string;
    image: string;
}

export interface UpcomingEvent {
    date: string;
    title: string;
    location: string;
    type: string;
}

export interface MediaItem {
    id: number;
    type: 'image' | 'video'; // Soyons plus précis
    src: string;
    title: string;
    category: string;
    date: string;
    location: string;
    description: string;
}

export interface ContactInfo {
    icon: React.ElementType;
    title: string;
    details: string[];
    color: string;
}

export interface SocialLink {
    icon: React.ElementType;
    href: string;
    label: string;
    color: string;
}

export interface SupportOption {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
}