import React, { useState } from 'react';

export default function ContactForm() {
    const [message, setMessage] = useState('');
    const [charCount, setCharCount] = useState(0);
    const maxWords = 500;

    const handleMessageChange = (event) => {
        event.preventDefault();
        const text = event.target.value;
        const words = text.split(' ').filter(word => word !== '');
        if (words.length <= maxWords) {
            setMessage(text);
            setCharCount(words.length);
        }
    };

    return (
        <div className="form-container">
            <form className="form">
                <div className="input-group">
                    <input type="text" id="prenom" name="prenom" placeholder="Prénom" />
                    <label htmlFor="prenom">Prénom</label>
                </div>
                <div className="input-group">
                    <input type="text" id="nom" name="nom" placeholder="Nom" />
                    <label htmlFor="nom">Nom</label>
                </div>
                <div className="input-group">
                    <input type="email" id="email" name="email" placeholder="E-mail..." />
                    <label htmlFor="email">E-mail</label>
                </div>
                <div className="input-group">
                    <input type="tel" id="telephone" name="telephone" placeholder="Téléphone" />
                    <label htmlFor="telephone">Téléphone</label>
                </div>
                <div className="input-group">
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Message"
                        value={message}
                        onChange={handleMessageChange}
                    />
                    <label htmlFor="message">Message</label>
                </div>
                <small>{charCount} sur {maxWords} mots maximum.</small>
                <button type="submit" className="submit-button">Envoyer</button>
            </form>
        </div>
    );
};