// controllers/produd.controller.js
const cloudinary = require('cloudinary').v2;
const Prod = require('../models/Product');

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET_API_KEY } = process.env;

// Configurar Cloudinary
cloudinary.config({
  cloud_name: `${CLOUD_NAME}`,
  api_key: `${CLOUD_API_KEY}`,
  api_secret: `${CLOUD_SECRET_API_KEY}`
});

// Función para subir una imagen a Cloudinary
const subirImagen = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error);
    throw error;
  }
};

module.exports = subirImagen;