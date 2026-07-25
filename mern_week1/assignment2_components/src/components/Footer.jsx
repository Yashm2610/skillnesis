import React from 'react';

const Footer = ({ text }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={styles.footer}>
      <p>&copy; {currentYear} {text}</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1e293b',
    color: '#94a3b8',
    textAlign: 'center',
    padding: '2rem',
    marginTop: '4rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  }
};

export default Footer;
