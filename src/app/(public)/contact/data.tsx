import type { ContactInfo, SocialLink, SupportOption } from '@/types';
import { Mail, Phone, MapPin, Clock, Heart, User, MessageSquare, ExternalLink } from "lucide-react";

export const contactInfo: ContactInfo[] = [
    { icon: MapPin, title: "Notre Adresse", details: ["Goma, RDC; Bujumbura, Burundi", "République Démocratique du Congo"], color: "from-blue-500 to-cyan-500" },
    { icon: Mail, title: "Email", details: ["info.welead.africa@gmail.com", "weleadtodevelop1@gmail.com"], color: "from-green-500 to-emerald-500" },
    { icon: Phone, title: "Téléphone", details: ["+243 972 834 702", "+257 65 036 970"], color: "from-purple-500 to-indigo-500" },
    { icon: Clock, title: "Horaires", details: ["Lun - Ven: 8h00 - 17h00", "Sam: 9h00 - 13h00"], color: "from-pink-500 to-rose-500" }
];

export const socialLinks: SocialLink[] = [
    { icon: ExternalLink, href: "#", label: "Facebook", color: "hover:text-blue-600" },
    { icon: ExternalLink, href: "#", label: "Twitter", color: "hover:text-sky-500" },
    { icon: ExternalLink, href: "#", label: "Instagram", color: "hover:text-pink-600" },
    { icon: ExternalLink, href: "#", label: "LinkedIn", color: "hover:text-blue-700" },
];

export const supportOptions: SupportOption[] = [
    { title: "Dons Financiers", description: "Soutenez nos programmes par des contributions financières", icon: Heart, color: "from-red-500 to-pink-500" },
    { title: "Bénévolat", description: "Rejoignez notre équipe de bénévoles pour nos événements", icon: User, color: "from-green-500 to-emerald-500" },
    { title: "Partenariats", description: "Créons ensemble des synergies pour plus d'impact", icon: MessageSquare, color: "from-blue-500 to-cyan-500" }
];