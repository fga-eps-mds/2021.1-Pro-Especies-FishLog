import { Schema, model, Document } from 'mongoose';

interface IFishLog extends Document {
  userId: number;
  fishType: string;
  specie: string;
  coordenates: [number, number][];
  photo: string;
  lenght: number;
  reviewed: boolean;
  reviewedBy: number;
  createdAt: Date;
  updatedAt: Date;
  deletedBy: number;
  updatedBy: number;
  deletedAt: Date;
}

const fishLogSchema = new Schema<IFishLog>({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  fishType: {
    type: String,
    enum: ['escama', 'couro', 'arraia', 'outros'],
    required: false,
  },
  specie: {
    type: String,
    required: false,
  },
  coordenates: {
    type: [],
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  lenght: {
    type: Number,
    required: false,
  },
  reviewed: {
    type: Boolean,
    default: false,
  },
  reviewedBy: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  createdAt: {
    type: Date,
  },
  updateAt: {
    type: [Date],
  },
  deletedAt: {
    type: Date,
  },
  deletedBy: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  updatedBy: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
});

export default model<IFishLog>('FishLog', fishLogSchema);
