import React from 'react';
import { Accordion, Container } from 'react-bootstrap';

const faqs = [
  { question: "What is MediBot?", answer: "MediBot is an AI-powered virtual health assistant that provides instant preliminary medical guidance and support." },
  { question: "How can MediBot assist with my health concerns?", answer: "MediBot analyzes symptoms, offers basic diagnosis suggestions, and gives follow-up advice for general health issues." },
  { question: "Is MediBot safe to use for sharing personal health data?", answer: "Yes, your data is encrypted and stored securely in accordance with HIPAA standards." },
  { question: "Can I upload images or test reports for analysis?", answer: "Yes, you can securely upload medical documents and images for a more accurate assessment." },
  { question: "Can I rely on MediBot in a medical emergency?", answer: "No, MediBot is not for emergencies. Always contact local emergency services in such cases." },
  { question: "Does MediBot replace seeing a real doctor?", answer: "MediBot is a supportive tool, not a replacement for professional medical consultation." },
];

const FAQAccordion = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg,rgb(7, 3, 22),rgb(46, 46, 122))',
      minHeight: '100vh',
      padding: '50px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Container style={{
        background: 'linear-gradient(135deg, #2b2d8f, #4e1a88)',
        borderRadius: '16px',
        padding: '40px 30px',
        boxShadow: '0 0 30px rgba(0,0,0,0.6)',
        maxWidth: '800px',
        width: '100%'
      }}>
        <div className="text-center mb-4">
          <h2 style={{ fontWeight: '700', color: '#ffffff' }}>Have Questions? We’ve Got Answers</h2>
          <p style={{ color: '#cccccc' }}>Discover More About MediBot</p>
        </div>
        <Accordion flush>
          {faqs.map((faq, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header style={{ fontSize: '16px', fontWeight: '500' }}>{faq.question}</Accordion.Header>
              <Accordion.Body style={{ fontSize: '15px', color: '#e0e0e0' }}>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <p className="text-center mt-4" style={{ fontSize: '14px', color: '#aaaaaa' }}>
          Feel free to reach out if you have more questions or need further assistance.
        </p>
      </Container>
    </div>
  );
};

export default FAQAccordion;
