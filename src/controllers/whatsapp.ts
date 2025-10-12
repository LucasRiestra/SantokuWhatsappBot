import { Request, Response } from 'express';
import FAQ from '../models/FAQ';

// Verificación del webhook (requerido por WhatsApp)
export const verifyWebhook = (req: Request, res: Response): void => {
  console.log('🔍 Webhook verification request received');
  console.log('Query params:', req.query);

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

  console.log('Mode:', mode);
  console.log('Token received:', token);
  console.log('Token expected:', VERIFY_TOKEN);
  console.log('Challenge:', challenge);

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verified successfully!');
    res.status(200).send(challenge);
  } else {
    console.log('❌ Webhook verification failed');
    res.sendStatus(403);
  }
};

// Procesar mensajes entrantes de WhatsApp
export const handleMessage = async (req: Request, res: Response): Promise<void> => {
  console.log('\n📨 ===== INCOMING WEBHOOK POST REQUEST =====');
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('==========================================\n');

  try {
    const body = req.body;

    console.log('🔍 Checking body.object:', body.object);

    // Verificar que sea una notificación de WhatsApp
    if (body.object === 'whatsapp_business_account') {
      console.log('✅ body.object is whatsapp_business_account');
      const entries = body.entry;
      console.log('📋 Number of entries:', entries?.length);

      for (const entry of entries) {
        console.log('🔄 Processing entry:', JSON.stringify(entry, null, 2));
        const changes = entry.changes;
        console.log('📋 Number of changes:', changes?.length);

        for (const change of changes) {
          console.log('🔄 Processing change:', JSON.stringify(change, null, 2));
          console.log('🔍 change.field:', change.field);

          if (change.field === 'messages') {
            console.log('✅ change.field is messages');
            const messageData = change.value.messages?.[0];
            console.log('📨 messageData:', JSON.stringify(messageData, null, 2));

            if (messageData && messageData.type === 'text') {
              const from = messageData.from;
              const messageText = messageData.text.body;

              console.log(`\n🎯 MESSAGE RECEIVED!`);
              console.log(`📞 From: ${from}`);
              console.log(`💬 Text: ${messageText}\n`);

              // Buscar respuesta en la base de datos
              console.log('🔍 Searching for answer in database...');
              const response = await findAnswer(messageText);
              console.log('📝 Answer found:', response.substring(0, 100) + '...');

              // Enviar respuesta a WhatsApp
              console.log('📤 Sending response to WhatsApp...');
              await sendWhatsAppMessage(from, response);
            } else {
              console.log('⚠️ messageData is not text type or is undefined');
              console.log('messageData:', messageData);
            }
          } else {
            console.log('⚠️ change.field is not messages, it is:', change.field);
          }
        }
      }
    } else {
      console.log('⚠️ body.object is not whatsapp_business_account, it is:', body.object);
    }

    console.log('✅ Sending 200 response to Meta\n');
    res.sendStatus(200);
  } catch (error) {
    console.error('❌ ERROR handling message:', error);
    res.sendStatus(500);
  }
};

// Buscar respuesta basada en keywords
async function findAnswer(message: string): Promise<string> {
  try {
    console.log('🔍 findAnswer - Original message:', message);
    const messageLower = message.toLowerCase();
    console.log('🔍 findAnswer - Lowercase message:', messageLower);
    const words = messageLower.split(' ');
    console.log('🔍 findAnswer - Words array:', words);

    // Buscar FAQ que coincida con alguna keyword
    console.log('🔍 findAnswer - Searching in MongoDB with query:', { keywords: { $in: words }, active: true });
    const faq = await FAQ.findOne({
      keywords: { $in: words },
      active: true,
    });

    console.log('🔍 findAnswer - FAQ found:', faq ? 'YES' : 'NO');
    if (faq) {
      console.log('✅ findAnswer - FAQ matched:', faq.question);
      console.log('✅ findAnswer - Answer:', faq.answer);
      return faq.answer;
    }

    // Respuesta por defecto si no se encuentra una FAQ
    console.log('⚠️ findAnswer - No FAQ matched, returning default response');
    return `Hola! Gracias por contactar con Santoku. Para reservas, puedes llamarnos al +34 668 532 954 o visitar nuestra web: https://www.san-toku.es/\n\nEscribe "ayuda" para ver las preguntas más frecuentes.`;
  } catch (error) {
    console.error('❌ findAnswer - Error:', error);
    return 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo más tarde.';
  }
}

// Enviar mensaje a WhatsApp usando la API de Meta
async function sendWhatsAppMessage(to: string, message: string): Promise<void> {
  try {
    const WHATSAPP_API_URL = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

    console.log('📤 sendWhatsAppMessage - Sending to:', to);
    console.log('📤 sendWhatsAppMessage - Message:', message.substring(0, 100));
    console.log('📤 sendWhatsAppMessage - API URL:', WHATSAPP_API_URL);
    console.log('📤 sendWhatsAppMessage - Phone Number ID:', process.env.WHATSAPP_PHONE_NUMBER_ID);
    console.log('📤 sendWhatsAppMessage - Access Token exists:', !!ACCESS_TOKEN);

    const payload = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: {
        body: message,
      },
    };
    console.log('📤 sendWhatsAppMessage - Payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(WHATSAPP_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📤 sendWhatsAppMessage - Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ sendWhatsAppMessage - WhatsApp API error:', JSON.stringify(errorData, null, 2));
    } else {
      const responseData = await response.json();
      console.log(`✅ sendWhatsAppMessage - Message sent successfully to ${to}`);
      console.log('✅ sendWhatsAppMessage - Response:', JSON.stringify(responseData, null, 2));
    }
  } catch (error) {
    console.error('❌ sendWhatsAppMessage - Error:', error);
  }
}
