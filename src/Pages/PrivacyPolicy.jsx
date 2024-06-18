import React from 'react';
import ScrollToTop from '../components/ScrollToTop';

const PrivacyPolicy = () => {
    return (
        <div>
            <ScrollToTop/>
            <main className="content" style={{padding: "20px"}}>
                <h2>Privacy Policy</h2>
                <p>We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your information when you use our services.</p>
                
                <h3>1. Information Collection</h3>
                <p>We collect information from you when you register on our site, place an order, subscribe to our newsletter, or fill out a form. The information collected may include your name, email address, mailing address, phone number, and payment information.</p>
                
                <h3>2. Use of Information</h3>
                <p>The information we collect from you may be used in the following ways:
                   <ul>
                       <li>To process transactions and provide the services you request.</li>
                       <li>To send periodic emails regarding your order or other products and services.</li>
                       <li>To improve our website and customer service.</li>
                   </ul>
                </p>
                
                <h3>3. Information Protection</h3>
                <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. These measures include encryption, secure servers, and regular security audits.</p>
                
                {/* <h3>4. Cookies</h3>
                <p>We use cookies to enhance your experience on our website. Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your web browser (if you allow) that enables the site’s or service provider’s systems to recognize your browser and capture and remember certain information.</p>
                 */}
                <h3>4. Third-Party Disclosure</h3>
                <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide you with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
                
                <h3>5. Changes to Our Privacy Policy</h3>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
                
                <h3>6. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at privacy@nri-shopping-service.com.</p>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
