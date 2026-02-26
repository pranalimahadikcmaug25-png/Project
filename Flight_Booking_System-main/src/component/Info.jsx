import React, { useState } from "react";
import "./Info.css";

function Info() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const team = [
    {
      name: "Hanuman Jadhav",
      role: "Developer",
      img: "250840320072.png",
      bio: "Hanuman is the driving force behind Team38, leading with clarity, vision, and technical depth. As a skilled Full-Stack Developer, he specializes in frontend architecture and backend integration. His work fosters clean coding practices, timely delivery, and innovation.",

    },
    {
      name: "Pranali Mahadik",
      role: "Developer",
      img: "250840320128.jpg",
      bio: "Pranali combines a sharp analytical mind with deep technical knowledge across the MERN stack. Whether crafting intuitive UIs or architecting RESTful APIs, she ensures reliability and performance go hand in hand.",
    },
    {
      name: "Yukta Jadhav",
      role: "Developer",
      img: "yukta.jpg",
      bio: "Yukta thrives in both frontend and backend roles. With a deep understanding of React, Express, and Mysql, he excels at building scalable full-stack applications and maintaining a collaborative spirit.",

    }
  ];
    
  const faqs = [
    {
      question: "1. How can I book a flight?",
      answer:
        "Search your destination, select a flight, and complete payment easily on our website.",
    },
    {
      question: "2. Can I cancel or reschedule my booking?",
      answer:
        "Yes, you can cancel or reschedule your booking through the 'Manage Booking' section.",
    },
    {
      question: "3. How will I receive my ticket?",
      answer:
        "Your e-ticket will be sent to your registered email once the booking is confirmed.",
    },
    {
      question: "4. What payment methods do you accept?",
      answer:
        "We accept UPI, net banking, credit/debit cards, and popular digital wallets.",
    },
    {
      question: "5. What should I do if I don’t receive confirmation?",
      answer:
        "Please check your spam folder or contact our customer support team for help.",
    }
  ];

  return (
    <div className="info">
      <h2>Why Book With Us?</h2>
      <p>Travel to make memories all around the world.</p>

      <div className="info-cards">
        <div className="card1">
          <h3>Book & Relax</h3>
          <p>You can easily book your flight ticket online and relax.</p>
        </div>

        <div className="card1">
          <h3>Save More</h3>
          <p>Get great discounts and offers on your bookings.</p>
        </div>

        <div className="card1">
          <h3>Smart Checklist</h3>
          <p>Keep all your travel essentials organized easily.</p>
        </div>
      </div>

      {/*  New About Us Section */}
      <div className="about-us">
        <h2>Meet Our Team ✨</h2>
        <div className="team-cards">
          {team.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="faq">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="question">
            <h4 onClick={() => toggleQuestion(index)}>
              {faq.question}
              <span className="toggle">{openIndex === index ? "−" : "+"}</span>
            </h4>
            {openIndex === index && <p>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Info;