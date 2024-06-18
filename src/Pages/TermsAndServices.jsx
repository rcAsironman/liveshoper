import React from 'react';
import ScrollToTop from '../components/ScrollToTop';
// import './TermsAndServices.css';

const TermsAndServices = () => {
    return (
        <div>
            <ScrollToTop/>
            <main className="content" style={{padding: "20px"}}>
                <h2>Terms and Services</h2>
                <p>Welcome to liveshoper. These terms and services outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use our services if you do not agree to all the terms and conditions stated on this page.</p>
                
                <h3>1. Introduction</h3>
                <p>We provide a unique service for NRIs who want to purchase products from India for various occasions such as festivals, housewarming functions, and more. Our services include providing products as well as personal shoppers who can buy products on your behalf.</p>
                
                <h3>2. Booking a Shopper</h3>
                <p>When you book a shopper through our website, we will contact you within 10 minutes to confirm the booking. Our shopper will start shopping on your behalf as soon as the booking is confirmed.</p>
                
                <h3>3. Delivery Options</h3>
                <p>We offer multiple delivery options:
                   <ul>
                       <li>Delivering the products to your parents or relatives in India.</li>
                       <li>Handover to your preferred courier service provider.</li>
                       <li>Shipping through our own delivery service.</li>
                   </ul>
                </p>
                
                <h3>4. Live Shopping Experience</h3>
                <p>Once the shopper starts shopping on your behalf, you have the option to join a video call for a live shopping experience. Alternatively, the shopper can send you pictures of the products for your approval.</p>
                
                <h3>5. Payment</h3>
                <p>All payments must be made through our website. We accept various payment methods including credit/debit cards, net banking, and digital wallets.</p>
                
                <h3>6. Cancellation and Refund Policy</h3>
                <p>If you wish to cancel your booking, please contact us within 1 hour of the booking confirmation. Refunds will be processed according to our refund policy, which will be provided at the time of booking.</p>
                
                <h3>7. Changes to Terms and Services</h3>
                <p>We reserve the right to update these terms and services at any time. We will notify you of any changes by posting the new terms on this page.</p>
                
                <h3>8. Contact Us</h3>
                <p>If you have any questions about these Terms and Services, please contact us at support@nri-shopping-service.com.</p>
            </main>
        </div>
    );
};

export default TermsAndServices;
