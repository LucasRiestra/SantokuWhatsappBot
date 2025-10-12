import dotenv from 'dotenv';
import mongoose from 'mongoose';
import FAQ from '../models/FAQ';

// Cargar variables de entorno
dotenv.config();

const faqs = [
  {
    keywords: ['horario', 'hora', 'abierto', 'cerrado', 'cuando'],
    question: '¿Cuál es el horario del restaurante?',
    answer: 'Nuestro horario es:\n🕐 Martes a Domingo: 13:00-16:00 y 20:00-23:00\n❌ Lunes: Cerrado',
    category: 'horario',
    active: true,
  },
  {
    keywords: ['reserva', 'reservar', 'mesa', 'booking'],
    question: '¿Cómo puedo hacer una reserva?',
    answer: 'Puedes hacer tu reserva de estas formas:\n📞 Llamando al +34 668 53 29 54\n🌐 A través de nuestra web: https://www.san-toku.es/',
    category: 'reservas',
    active: true,
  },
  {
    keywords: ['ubicacion', 'direccion', 'donde', 'como llegar', 'sitio', 'lugar'],
    question: '¿Dónde está ubicado el restaurante?',
    answer: 'Visita nuestra web para ver la ubicación exacta:\n📍 https://www.san-toku.es/\n\nEncontrarás el mapa y las indicaciones de cómo llegar.',
    category: 'ubicacion',
    active: true,
  },
  {
    keywords: ['menu', 'carta', 'comida', 'platos', 'que tienen', 'cocina'],
    question: '¿Qué tipo de comida ofrecen?',
    answer: '🍱 Ofrecemos auténtica cocina japonesa.\n\nPuedes consultar nuestra carta completa en:\n🌐 https://www.san-toku.es/',
    category: 'menu',
    active: true,
  },
  {
    keywords: ['ayuda', 'help', 'informacion', 'preguntas'],
    question: 'Necesito ayuda',
    answer: '¡Hola! 👋 Bienvenido a San-Toku.\n\nPuedo ayudarte con información sobre:\n• Horario\n• Reservas\n• Ubicación\n• Menú\n\n¿En qué puedo ayudarte?',
    category: 'general',
    active: true,
  },
  {
    keywords: ['precio', 'precios', 'cuanto', 'cuesta', 'coste'],
    question: '¿Cuáles son los precios?',
    answer: 'Para información sobre precios y nuestra carta, visita:\n🌐 https://www.san-toku.es/\n\nO llámanos al 📞 +34 668 53 29 54',
    category: 'precios',
    active: true,
  },
  {
    keywords: ['contacto', 'telefono', 'llamar', 'email', 'correo'],
    question: '¿Cómo puedo contactar con el restaurante?',
    answer: 'Puedes contactarnos:\n📞 Teléfono: +34 668 53 29 54\n🌐 Web: https://www.san-toku.es/',
    category: 'contacto',
    active: true,
  },
];

async function seedDatabase() {
  try {
    // Conectar a MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI no está definida en el archivo .env');
    }

    console.log('Conectando a MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Conectado a MongoDB');

    // Verificar si ya existen FAQs
    const existingFAQs = await FAQ.countDocuments();

    if (existingFAQs > 0) {
      console.log(`⚠️  Ya existen ${existingFAQs} FAQs en la base de datos.`);
      console.log('¿Deseas continuar? Esto agregará más FAQs sin eliminar las existentes.');

      // Si quieres limpiar la base de datos antes de insertar, descomenta la siguiente línea:
      // await FAQ.deleteMany({});
      // console.log('🗑️  FAQs existentes eliminadas.');
    }

    // Insertar FAQs
    console.log('\n📝 Insertando FAQs...');
    const insertedFAQs = await FAQ.insertMany(faqs);
    console.log(`✅ ${insertedFAQs.length} FAQs insertadas correctamente\n`);

    // Mostrar resumen
    console.log('📊 Resumen de FAQs insertadas:');
    insertedFAQs.forEach((faq, index) => {
      console.log(`${index + 1}. ${faq.question} (${faq.keywords.length} keywords)`);
    });

    console.log('\n✨ Seed completado exitosamente');
  } catch (error) {
    console.error('❌ Error al ejecutar seed:', error);
    process.exit(1);
  } finally {
    // Cerrar conexión
    await mongoose.connection.close();
    console.log('\n🔌 Conexión a MongoDB cerrada');
    process.exit(0);
  }
}

// Ejecutar seed
seedDatabase();
