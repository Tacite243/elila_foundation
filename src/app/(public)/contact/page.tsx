import { Clock, Heart } from 'lucide-react';
import Image from 'next/image';
import { contactInfo } from './data';
import { AnimatedBlock } from '@/components/AnimatedBlockPrograms';
import ContactForm from '@/components/ContactForm';


export default function ContactPage() {
    return (
        <main className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="py-24 bg-gradient-to-br from-blue-50 to-green-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <AnimatedBlock>
                            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">Contactez <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">Nous</span></h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">Prêt à rejoindre notre mission ? Contactez-nous...</p>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center space-x-2"><Clock size={18} /><span>Réponse sous 24h</span></div>
                                <div className="flex items-center space-x-2"><Heart size={18} /><span>Support gratuit</span></div>
                            </div>
                        </AnimatedBlock>
                        <AnimatedBlock delay={0.2}>
                            <div className="relative h-96">
                                <Image
                                    src="/images/7.jpeg"
                                    alt="Paysage de Goma"
                                    fill
                                    className="rounded-2xl shadow-2xl object-cover"
                                    priority
                                />
                            </div>
                        </AnimatedBlock>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedBlock className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Informations de Contact</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Plusieurs moyens pour nous joindre...</p>
                    </AnimatedBlock>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => {
                            const IconComponent = info.icon;
                            return (
                                <AnimatedBlock key={index} delay={index * 0.1} whileHover={{ y: -10, scale: 1.02 }} className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl text-center">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                                        <IconComponent className="text-white" size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                                    <div className="space-y-2">{info.details.map((detail, i) => <p key={i} className="text-gray-600">{detail}</p>)}</div>
                                </AnimatedBlock>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedBlock className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Envoyez-nous un Message</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Utilisez le formulaire ci-dessous...</p>
                    </AnimatedBlock>
                    <ContactForm />
                </div>
            </section>

            {/* ... autres sections (Support, Social Media) ... */}
        </main>
    );
}