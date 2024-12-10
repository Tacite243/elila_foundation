'use client'
import React, { useEffect, useState } from 'react';
import AOS from 'aos';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState({
        loading: false,
        errorMessage: '',
        successMessage: '',
    });

    // Fonction de gestion du changement des champs du formulaire
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Fonction de soumission du formulaire
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus({ ...status, loading: true });

        try {
            // Simulation d'une soumission (remplacer par une vraie requête)
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Délai de simulation
            setStatus({
                loading: false,
                errorMessage: '',
                successMessage: 'Votre message a été envoyé. Merci!',
            });
        } catch (error) {
            setStatus({
                loading: false,
                errorMessage: 'Il y a eu un problème lors de l\'envoi. Essayez de nouveau.',
                successMessage: '',
            });
            console.log(error)
        }
    };

    // Initialisation d'AOS dans useEffect
    useEffect(() => {
        if (typeof window !== 'undefined') {
            AOS.init(); // Initialisation d'AOS
        }
    }, []);

    return (
        <section id="contact" className="contact section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>Contact</h2>
                <p>Petit message captivant pour insiter les utilisateurs à nous écrire</p>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row gy-4">
                    {/* Contact Info */}
                    <div className="col-lg-4">
                        <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                            <i className="bi bi-geo-alt flex-shrink-0"></i>
                            <div>
                                <h3>Adresse</h3>
                                <p>A108 Katoy, 23</p>
                            </div>
                        </div>

                        <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                            <i className="bi bi-telephone flex-shrink-0"></i>
                            <div>
                                <h3>Appellez-nous au</h3>
                                <p>+123 456 7890</p>
                            </div>
                        </div>

                        <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
                            <i className="bi bi-envelope flex-shrink-0"></i>
                            <div>
                                <h3>Ou bien laissez un mail</h3>
                                <p>info@example.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                            <div className="row gy-4">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Votre nom"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Votre adresse mail"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="col-md-12">
                                    <textarea
                                        name="message"
                                        className="form-control"
                                        rows={6}
                                        placeholder="Message"
                                        required
                                        value={formData.message}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <div className="col-md-12 text-center">
                                    {status.loading && <div className="loading">Loading...</div>}
                                    {status.errorMessage && <div className="error-message">{status.errorMessage}</div>}
                                    {status.successMessage && <div className="sent-message">{status.successMessage}</div>}
                                    <button type="submit">Envoyer</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;