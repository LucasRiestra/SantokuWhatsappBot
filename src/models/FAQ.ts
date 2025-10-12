import mongoose, { Document, Schema } from 'mongoose';

export interface IFAQ extends Document {
  keywords: string[];
  question: string;
  answer: string;
  category?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema: Schema = new Schema(
  {
    keywords: {
      type: [String],
      required: true,
      lowercase: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'general',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Índice para búsqueda rápida por keywords
FAQSchema.index({ keywords: 1 });

export default mongoose.model<IFAQ>('FAQ', FAQSchema);
