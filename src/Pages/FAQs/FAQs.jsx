import React from 'react';
import './FAQs.css';
import ScrollToTop from '../../components/ScrollToTop';

const FAQs = () => {
    return (
        <div>
            <ScrollToTop/>
            <main className="content">
                <h2>Frequently Asked Questions</h2>

                <div className="faq-section">
                    <h3>General Questions</h3>
                    <div className="faq">
                        <h4>What is the NRI Shopping Service?</h4>
                        <p>Our service allows NRIs to purchase products from India for various occasions like festivals, housewarming functions, etc. We offer products as well as personal shoppers who can shop on your behalf and arrange delivery to your relatives or friends in India.</p>
                    </div>
                    <div className="faq">
                        <h4>How do I book a personal shopper?</h4>
                        <p>You can book a personal shopper through our website. Once booked, we will contact you within 10 minutes to confirm the details of your booking.</p>
                    </div>
                </div>

                <div className="faq-section">
                    <h3>Shopping and Delivery</h3>
                    <div className="faq">
                        <h4>What delivery options are available?</h4>
                        <p>We offer multiple delivery options, including:
                           <ul>
                               <li>Delivering the products to your parents or relatives in India.</li>
                               <li>Handing over the products to your preferred courier service provider.</li>
                               <li>Shipping through our own delivery service.</li>
                           </ul>
                        </p>
                    </div>
                    <div className="faq">
                        <h4>Can I participate in the shopping process?</h4>
                        <p>Yes, you can join a video call for a live shopping experience or have our shopper send you pictures of the products for your approval.</p>
                    </div>
                </div>

                <div className="faq-section">
                    <h3>Payment and Refunds</h3>
                    <div className="faq">
                        <h4>What payment methods do you accept?</h4>
                        <p>We accept various payment methods including credit/debit cards, net banking, and digital wallets.</p>
                    </div>
                    <div className="faq">
                        <h4>What is your cancellation and refund policy?</h4>
                        <p>If you wish to cancel your booking, please contact us within 1 hour of the booking confirmation. Refunds will be processed according to our refund policy, which will be provided at the time of booking.</p>
                    </div>
                </div>

                <div className="faq-section">
                    <h3>Contact Us</h3>
                    <div className="faq">
                        <h4>How can I contact customer support?</h4>
                        <p>If you have any questions or need assistance, please contact us at support@nri-shopping-service.com.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FAQs;
