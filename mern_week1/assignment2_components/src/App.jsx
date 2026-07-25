import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Card from './components/Card'
import Button from './components/Button'
import Form from './components/Form'
import './App.css'

function App() {
  const handleFormSubmit = (data) => {
    alert(`Thank you, ${data.name}! We will contact you at ${data.email}.`);
  };

  return (
    <div className="app-container">
      <Header title="React Components" navItems={['Features', 'Pricing', 'Contact']} />
      
      <main className="main-content">
        <section id="features" className="section">
          <h2>Our Features</h2>
          <div className="card-grid">
            <Card 
              title="Responsive Design" 
              description="Our components look great on any device, from mobile phones to desktop monitors."
            >
              <Button onClick={() => alert('Learn more clicked')}>Learn More</Button>
            </Card>
            <Card 
              title="Modern Styling" 
              description="Using the latest CSS features to ensure a premium look and feel."
            >
              <Button variant="outline">View Gallery</Button>
            </Card>
            <Card 
              title="Reusable Code" 
              description="Built with reusability in mind. Just drop them into your project."
            >
              <Button variant="secondary">Get Started</Button>
            </Card>
          </div>
        </section>

        <section id="contact" className="section">
          <h2>Get Updates</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#94a3b8' }}>
            Subscribe to our newsletter for the latest components and updates.
          </p>
          <Form onSubmit={handleFormSubmit} />
        </section>
      </main>

      <Footer text="React Components Practice. All rights reserved." />
    </div>
  )
}

export default App
