import { Schema, model, Document } from 'mongoose';

export interface IFishLog extends Document {
  userId: number;
  name: string;
  largeGroup: string;
  group: string;
  specie: string;
  coordenates: [number, number][];
  photo: string;
  lenght: number;
  weight: number;
  reviewed: boolean;
  reviewedBy: number;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: number;
  deletedAt: Date;
  deletedBy: number;
}

const fishLogSchema = new Schema<IFishLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    largeGroup: {
      type: String,
      enum: ['escama', 'couro', 'cascudo,', 'arraia', 'outros'],
      required: false,
    },
    group: {
      type: String,
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
    weight: {
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
    updatedBy: {
      type: [Schema.Types.ObjectId],
      required: false,
    },
    deletedAt: {
      type: Date,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model<IFishLog>('FishLog', fishLogSchema);
