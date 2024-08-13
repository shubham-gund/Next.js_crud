import mongoose, { Document, Schema } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description: string;
}

const ItemSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this item.'],
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);
