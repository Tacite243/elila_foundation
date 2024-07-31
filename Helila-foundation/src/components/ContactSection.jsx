import ContactForm from "./ContactForm";
import WhatsappButton from "./WhatsappButton";


export default function ContactSection() {
    return (
        <div className="contact">
            <h1>Nous contacter</h1>
            <WhatsappButton />
            <p>Rejoignez-nous dans notre engagement à transformer positivement l'espace Lega et à bâtir un avenir meilleur pour les générations à venir.</p>
            <div>
                <div className="contact-form">
                    <h2>Ou bien nous contacter dircetement !</h2>
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}