require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET
}

export {config}
