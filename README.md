# Santoku WhatsApp Bot

Bot automatizado de WhatsApp para el restaurante Santoku que responde preguntas frecuentes (FAQs) de manera inteligente utilizando la API de WhatsApp Business.

## Descripción del Proyecto

Este proyecto implementa un chatbot inteligente que automatiza las respuestas a consultas comunes de clientes del restaurante Santoku. El bot utiliza un sistema de matching de palabras clave para identificar la intención del usuario y responder con información relevante sobre horarios, reservas, ubicación, menú y más.

## Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución para JavaScript
- **Express.js** - Framework web minimalista y flexible
- **TypeScript** - Superset de JavaScript con tipado estático

### Base de Datos
- **MongoDB Atlas** - Base de datos NoSQL en la nube
- **Mongoose** - ODM (Object Data Modeling) para MongoDB

### APIs Externas
- **WhatsApp Business API** (Meta) - Integración con WhatsApp

### Deployment
- **Render.com** - Plataforma de hosting para aplicaciones web
- **GitHub** - Control de versiones y repositorio de código

### Desarrollo
- **Nodemon** - Hot reload durante desarrollo
- **dotenv** - Gestión de variables de entorno
- **ts-node** - Ejecución de TypeScript en desarrollo

## Arquitectura del Sistema

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Cliente   │────────▶│  WhatsApp    │────────▶│   Render    │
│  WhatsApp   │         │   Business   │         │   Server    │
└─────────────┘         │     API      │         └─────────────┘
                        └──────────────┘               │
                                                       │
                                                       ▼
                                              ┌─────────────┐
                                              │  MongoDB    │
                                              │    Atlas    │
                                              └─────────────┘
```

## Características Principales

### 1. Sistema de FAQs Inteligente
- Matching de palabras clave en mensajes del usuario
- Base de datos escalable con MongoDB
- Respuestas categorizadas por temas

### 2. Webhook Integration
- Recepción en tiempo real de mensajes de WhatsApp
- Verificación segura de webhooks con tokens
- Procesamiento asíncrono de mensajes

### 3. Logging Detallado
- Sistema de logs completo para debugging
- Emojis para identificación visual rápida
- Tracking de todas las operaciones críticas

### 4. Escalabilidad y Mantenimiento
- Arquitectura modular y extensible
- Separación de responsabilidades (MVC pattern)
- Fácil adición de nuevas FAQs

## FAQs Disponibles

El bot puede responder a las siguientes preguntas frecuentes:

### Información General
- **Horario**: Pregunta por el horario de apertura y cierre
  - Keywords: horario, hora, abierto, cerrado, cuando
- **Reservas**: Información sobre cómo hacer una reserva
  - Keywords: reserva, reservar, mesa, booking
- **Ubicación**: Dónde se encuentra el restaurante
  - Keywords: ubicacion, direccion, donde, como llegar, sitio, lugar
- **Menú**: Información sobre la carta y tipo de cocina
  - Keywords: menu, carta, comida, platos, que tienen, cocina
- **Precios**: Información sobre precios
  - Keywords: precio, precios, cuanto, cuesta, coste
- **Contacto**: Teléfono y formas de contacto
  - Keywords: contacto, telefono, llamar, email, correo

### Necesidades Especiales y Dietas
- **Carrito de bebé**: Accesibilidad para familias con niños pequeños
  - Keywords: carrito, bebe, bebé, carriola, cochecito, niño, niños
- **Menú celíaco**: Adaptación del menú sin gluten
  - Keywords: celiaco, celiaca, celiacos, celiacas, gluten, sin gluten
- **Opciones veganas/vegetarianas**: Disponibilidad de opciones plant-based
  - Keywords: vegano, vegana, veganos, veganas, vegetariano, vegetariana, vegetarianos, vegetarianas, veggie
- **Menú para embarazadas**: Seguridad alimentaria durante el embarazo
  - Keywords: embarazada, embarazo, gestacion, gestación, encinta

### Ayuda
- **Ayuda general**: Listado de temas sobre los que el bot puede ayudar
  - Keywords: ayuda, help, informacion, preguntas

## Estructura del Proyecto

```
SantokuWhatsappBot/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuración MongoDB
│   ├── controllers/
│   │   └── whatsapp.ts          # Lógica de negocio del bot
│   ├── models/
│   │   └── FAQ.ts               # Modelo de datos FAQ
│   ├── routes/
│   │   └── webhook.ts           # Rutas del webhook
│   ├── scripts/
│   │   └── seed.ts              # Script para poblar BD
│   └── index.ts                 # Punto de entrada
├── dist/                        # Código compilado (TypeScript → JavaScript)
├── .env                         # Variables de entorno (no en Git)
├── .gitignore                   # Archivos ignorados por Git
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración TypeScript
└── README.md                    # Documentación
```

## Configuración e Instalación

### Prerrequisitos

- Node.js v18 o superior
- Cuenta de MongoDB Atlas
- Cuenta de Meta for Developers
- Cuenta de Render.com (opcional, para deployment)

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGODB_URI=tu_connection_string_de_mongodb

# WhatsApp Business API Configuration
WHATSAPP_PHONE_NUMBER_ID=tu_phone_number_id
WHATSAPP_ACCESS_TOKEN=tu_access_token
WEBHOOK_VERIFY_TOKEN=tu_token_de_verificacion_personalizado
```

### Instalación Local

1. Clonar el repositorio:
```bash
git clone https://github.com/LucasRiestra/SantokuWhatsappBot.git
cd SantokuWhatsappBot
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno (crear archivo `.env`)

4. Poblar la base de datos con FAQs iniciales:
```bash
npm run seed
```

5. Ejecutar en modo desarrollo:
```bash
npm run dev
```

6. Para producción:
```bash
npm run build
npm start
```

## Configuración de WhatsApp Business API

### 1. Crear App en Meta for Developers

1. Ir a [Meta for Developers](https://developers.facebook.com/)
2. Crear nueva aplicación de tipo "Business"
3. Agregar producto "WhatsApp"

### 2. Configurar Webhook

1. En la consola de Meta, ir a **WhatsApp** → **Configuración** → **Webhook**
2. Configurar:
   - **URL de devolución de llamada**: `https://tu-dominio.com/webhook`
   - **Identificador de verificación**: El mismo que pusiste en `WEBHOOK_VERIFY_TOKEN`
3. Suscribirse al campo **"messages"**

### 3. Obtener Credenciales

- **Phone Number ID**: En WhatsApp → API Setup
- **Access Token**: Generar token temporal o permanente (System User)

## Deployment en Render.com

1. Conectar repositorio de GitHub a Render
2. Configurar el servicio:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
3. Agregar variables de entorno en el dashboard de Render
4. Configurar Network Access en MongoDB Atlas:
   - Agregar `0.0.0.0/0` (Allow from anywhere) para permitir conexiones desde Render

## FAQs Predefinidas

El bot responde automáticamente a las siguientes consultas:

| Categoría | Palabras Clave | Respuesta |
|-----------|----------------|-----------|
| Horario | horario, hora, abierto, cerrado, cuando | Horario completo del restaurante |
| Reservas | reserva, reservar, mesa, booking | Información de cómo reservar |
| Ubicación | ubicacion, direccion, donde, como llegar | Enlace a Google Maps |
| Menú | menu, carta, comida, platos | Información sobre la cocina japonesa |
| Precios | precio, precios, cuanto, cuesta | Referencia a la carta online |
| Contacto | contacto, telefono, llamar, email | Teléfono y web del restaurante |
| Ayuda | ayuda, help, informacion | Menú de opciones disponibles |

## Cómo Funciona

### Flujo de Mensajes

1. **Recepción**: Cliente envía mensaje por WhatsApp
2. **Webhook**: Meta envía POST request a `/webhook`
3. **Procesamiento**:
   - Extraer texto del mensaje
   - Convertir a minúsculas y dividir en palabras
   - Buscar en MongoDB FAQs con keywords coincidentes
4. **Respuesta**:
   - Si hay coincidencia: enviar respuesta de la FAQ
   - Si no hay coincidencia: enviar mensaje por defecto
5. **Envío**: Utilizar WhatsApp Business API para enviar respuesta

### Código Principal

```typescript
// Búsqueda de respuesta basada en keywords
async function findAnswer(message: string): Promise<string> {
  const messageLower = message.toLowerCase();
  const words = messageLower.split(' ');

  const faq = await FAQ.findOne({
    keywords: { $in: words },
    active: true,
  });

  return faq ? faq.answer : defaultMessage;
}
```

## Scripts Disponibles

```json
{
  "dev": "nodemon src/index.ts",        // Desarrollo con hot reload
  "build": "tsc",                       // Compilar TypeScript a JavaScript
  "start": "node dist/index.js",        // Ejecutar versión compilada
  "seed": "ts-node src/scripts/seed.ts" // Poblar base de datos
}
```

## Mejoras Futuras

- [ ] Implementar NLP (Natural Language Processing) para mejor comprensión
- [ ] Sistema de respuestas en cascada para conversaciones más complejas
- [ ] Panel de administración para gestionar FAQs sin tocar código
- [ ] Soporte multiidioma (español/inglés)
- [ ] Integración con sistema de reservas real
- [ ] Analytics de preguntas más frecuentes
- [ ] Rate limiting para prevenir spam
- [ ] Sistema de feedback de usuarios

## Seguridad

- ✅ Variables de entorno protegidas (`.env` en `.gitignore`)
- ✅ Verificación de webhook con token secreto
- ✅ Validación de origen de mensajes (firma de Meta)
- ✅ Conexión segura a MongoDB con SSL
- ✅ HTTPS obligatorio para webhooks

## Testing

Para probar el bot localmente con túnel (desarrollo):

```bash
# Terminal 1: Iniciar servidor
npm run dev

# Terminal 2: Crear túnel con ngrok
ngrok http 3000

# Usar la URL de ngrok en la configuración del webhook de Meta
```

## Troubleshooting

### Error: MongoDB Connection Failed
- Verificar que la IP esté en la whitelist de MongoDB Atlas
- Revisar credenciales en `MONGODB_URI`

### Error: Webhook Verification Failed
- Asegurarse de que `WEBHOOK_VERIFY_TOKEN` coincida en .env y Meta
- Verificar que el servidor esté accesible públicamente

### Error: Access Token Invalid
- Los tokens temporales expiran cada 24 horas
- Generar nuevo token en Meta for Developers
- Considerar usar System User Token para tokens permanentes

## Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork del proyecto
2. Crear rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia ISC.

## Contacto

**Lucas Riestra**
- GitHub: [@LucasRiestra](https://github.com/LucasRiestra)
- LinkedIn: [Lucas Riestra](https://www.linkedin.com/in/lucas-riestra/)

## Agradecimientos

- [Meta for Developers](https://developers.facebook.com/) - WhatsApp Business API
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Base de datos en la nube
- [Render.com](https://render.com/) - Hosting gratuito
- [Santoku Restaurant](https://www.san-toku.es/) - Cliente del proyecto

---

**Desarrollado con TypeScript, Node.js y mucho café**
