const admin = require('firebase-admin');

const initializeFirebase = () => {
  try {
    const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
    
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig)
    });
    
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization error:', error);
    process.exit(1);
  }
};

module.exports = { initializeFirebase }; 