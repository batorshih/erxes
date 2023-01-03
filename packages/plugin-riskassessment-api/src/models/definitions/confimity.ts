import { Document, Schema } from 'mongoose';
import { field } from './utils';

type RiskConformityFormType = {
  status: string;
  statusColor: string;
  resultScores: string;
  formId: string;
};
export interface IRiskConformityDocument extends Document {
  _id: string;
  cardId: string;
  cardType: string;
  riskAssessmentId: string;
  status: string;
  statusColor: string;
  resultScore: string;
  forms: RiskConformityFormType[];
}

export interface IRiskFormSubmissionDocument extends Document {
  _id: string;
  cardId: string;
  userId: string;
  formId: string;
  fieldId: string;
  value: Number;
}

const conformityFormsResultSchema = new Schema({
  formId: field({ type: String, label: 'Form Id' }),
  status: field({ type: String, label: 'Status', default: 'In Progress' }),
  statusColor: field({
    type: String,
    label: 'Status Status Color',
    default: '#3B85F4'
  }),
  resultScore: field({ type: Number, label: 'Result Score', default: 0 })
});

export const riskConformitySchema = new Schema({
  _id: field({ pkey: true }),
  cardId: field({ type: String, label: 'Card Id' }),
  cardType: field({ type: String, label: 'Card Type' }),
  riskAssessmentId: field({
    type: String,
    label: 'Answer Risk assessment Ids'
  }),
  createdAt: field({ type: Date, label: 'Created At', default: Date.now }),
  closedAt: field({ type: Date, optional: true, label: 'Closed At' }),
  status: field({ type: String, label: 'Status', default: 'In Progress' }),
  statusColor: field({
    type: String,
    label: 'Status Status Color',
    default: '#3B85F4'
  }),
  resultScore: field({ type: Number, label: 'Result Score', default: 0 }),
  forms: field({
    type: [conformityFormsResultSchema],
    optional: true,
    label: 'Forms results'
  })
});

export const riskConformityFormSubmissionSchema = new Schema({
  _id: field({ pkey: true }),
  cardId: field({ type: String, label: 'Card Id' }),
  cardType: field({ type: String, label: 'Card Type' }),
  userId: field({ type: String, label: 'User Id' }),
  formId: field({ type: String, label: 'Form ID' }),
  riskAssessmentId: field({ type: String, label: 'risk assessment ID' }),
  fieldId: field({ type: String, label: 'Form Field Id' }),
  value: field({ type: String, lablel: 'Form Field Value' })
});
