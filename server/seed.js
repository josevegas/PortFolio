require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Social = require('./models/Social');
const Info = require('./models/Info');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Seed Admin
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const admin = new Admin({
        username: 'admin',
        password: 'adminpassword123' // This will be hashed by the pre-save hook
      });
      await admin.save();
      console.log('Admin user created: admin / adminpassword123');
    }

    // Seed Socials (GitHub and LinkedIn only)
    await Social.deleteMany({});
    await Social.create([
      { platform: 'github', url: 'https://github.com/yourusername', icon: 'Github' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/yourusername', icon: 'Linkedin' }
    ]);
    console.log('Socials seeded (GitHub & LinkedIn)');

    // Seed Info
    const infoCount = await Info.countDocuments();
    if (infoCount === 0) {
      await Info.create([
        { key: 'hero_name', value: 'Jose Vegas', type: 'text' },
        { key: 'hero_title', value: 'Full Stack Developer', type: 'text' },
        { key: 'about_text', value: 'Apasionado por crear soluciones tecnológicas innovadoras...', type: 'textarea' },
        { key: 'cv_url', value: 'https://example.com/cv.pdf', type: 'url' }
      ]);
      console.log('Initial Info seeded');
    }

    console.log('Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
