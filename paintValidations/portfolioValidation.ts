import Joi from "joi";
import {
  PointOfProgressEvidence,
  PortfolioAttachment,
  PortfolioItem,
} from "../penhTypes/penh-types";


export function validatePortfolioItem(
  portfolioItem: PortfolioItem
) {
  const schema = Joi.object({
    title: Joi.string().max(50),
    description: Joi.string().max(255),
    feedback: Joi.string().max(500),
    area_of_growth: Joi.string().max(500),
    next_steps: Joi.string().max(500),

  });

  return schema.validate(portfolioItem);
}

export function validatePortfolioItemAsEvidence(
  pointOfProgressEvidence: PointOfProgressEvidence
) {
  const schema = Joi.object({
  //  point_of_progress_evidence_id: Joi.number().required(),
    learning_area_proficiency_id: Joi.number().required(),
  });

  return schema.validate(pointOfProgressEvidence);
}

export function validatePortfolioAttachment(
  portfolioAttachment: PortfolioAttachment
) {
  const schema = Joi.object({
    title: Joi.string().max(50),
    description: Joi.string().max(255),
    portfolio_id: Joi.number().required(),
    file_path: Joi.string().max(500)
  });

  return schema.validate(portfolioAttachment);
}

export function validatePortfolioAttachmentAsEvidence(
  portfolioAttachment: PortfolioAttachment
) {
  const schema = Joi.object({
    title: Joi.string().max(50),
    description: Joi.string().max(255),
    learning_area_ids: Joi.array().items(Joi.string()).required(),
    //learning_area_ids: Joi.string().required(),
    portfolio_id: Joi.number().required(),
    file_path: Joi.string().max(500),
  //  report_date: Joi.string(),
  point_of_progress_id: Joi.number().required()
  });
  return schema.validate(portfolioAttachment);
}

// export function validatePortfolioItemAsEvidence(
//   pointOfProgressEvidence: PointOfProgressEvidence
// ) {
//   const schema = Joi.object({
//     point_of_progress_summary_id: Joi.number().required(),
//     portfolio_id: Joi.number().required(),
//   });

//   return schema.validate(pointOfProgressEvidence);
// }

