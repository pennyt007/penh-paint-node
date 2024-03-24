import Joi from "joi";
import { EngageBehave, PointOfProgress, PointOfProgressState, PopDetail, PopSummary } from "../penhTypes/penh-types";

export function validateEngageBehave(engageBehave: EngageBehave) {
  const schema = Joi.object({
    feedback: Joi.string().max(5000),
    next_steps: Joi.string().max(5000),
  });

  return schema.validate(engageBehave);
}

export function validatePointOfProgress(pointOfProgress: PointOfProgress) {

    const schema = Joi.object({
        point_of_progress_id: Joi.number().required()
        // number_of_lates: Joi.number().max(25),
        // number_of_absents: Joi.number().max(25)
    });

    return schema.validate(pointOfProgress);

}
export function validatePointOfProgressState(pointOfProgressState: PointOfProgressState) {

  const schema = Joi.object({
      point_of_progress_id: Joi.number().required(),
      point_of_progress_state_type_id: Joi.number().required(),
      user_id: Joi.number().required()
      // number_of_lates: Joi.number().max(25),
      // number_of_absents: Joi.number().max(25)
  });

  return schema.validate(pointOfProgressState);

}


export function validatePopSummary(popSummary: PopSummary) {
  const schema = Joi.object({
    feedback: Joi.string().max(5000),
    area_of_growth: Joi.string().max(5000),
    next_steps: Joi.string().max(5000),
    learning_area_proficiency_id: Joi.number()
  });

  return schema.validate(popSummary);
}

export function validatePopDetail(popDetail: PopDetail) {
  const schema = Joi.object({
    point_of_progress_summary_id: Joi.number().required(),
    curriculum_proficiency_id: Joi.number(),
    // curriculum_proficiency_id: Joi.number()
    //   .optional()
    //   .integer()
    //   .min(0)
    //   .allow(null),
    curriculum_id: Joi.number()
  });

  return schema.validate(popDetail);
}
