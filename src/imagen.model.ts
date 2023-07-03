import mongoose, { Schema, Document } from 'mongoose';

interface Imagen extends Document {
  titulo: string;
  rutaImagen: string;
}

const ImagenSchema = new Schema({
  titulo: { type: String, required: true },
  rutaImagen: { type: String, required: true }
});

const ImagenModel = mongoose.model<Imagen>('Imagen', ImagenSchema);

export default ImagenModel;
