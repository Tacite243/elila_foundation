'use client';

import React, { useState } from 'react';

const CallToAction: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Simulation d'une requête d'abonnement (vous pouvez remplacer ceci par une requête réelle)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setStatus('sent');
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="call-to-action" className="call-to-action section light-background">
            <div className="content">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h3>Subscribe To Our Newsletter</h3>
                            <p className="opacity-50">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, reprehenderit!
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <form
                                onSubmit={handleSubmit}
                                className="form-subscribe php-email-form"
                            >
                                <div className="form-group d-flex align-items-stretch">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control h-100"
                                        placeholder="Enter your e-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="submit"
                                        className="btn btn-secondary px-4"
                                        value="Subscribe"
                                        disabled={status === 'loading'}
                                    />
                                </div>

                                {status === 'loading' && <div className="loading">Loading</div>}
                                {status === 'error' && <div className="error-message">Something went wrong. Please try again.</div>}
                                {status === 'sent' && <div className="sent-message">Your subscription request has been sent. Thank you!</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;