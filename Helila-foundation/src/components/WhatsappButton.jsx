import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsappButton() {
    const phoneNumber = '+243971736244';
    function handleClick() {
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
    };

    return (
        <button onClick={handleClick} className='whatsapp-btn'>
            <span>Whatsapp</span>
            <FaWhatsapp className='icon'/>
        </button>
    )
};