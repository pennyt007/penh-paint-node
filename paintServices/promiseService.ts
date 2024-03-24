import { updateEngageBehavePOP } from "../penhModel/engageBehave/engageBehave";
import { updatePopSummaryPOPLA } from "../penhModel/popSummary/popSummary";

export default function createPopSummaryPromise(
  point_of_progress_id: number,
  popSummaryContent: any
) {
  const promises = popSummaryContent.map((section: any) => {
    if (section.feedback && section.areaOfGrowth && section.nextSteps) {
      if (section.id) {
        return updatePopSummaryPOPLA(
          point_of_progress_id,
          {
            learning_area_id: section.id,
            feedback: section.feedback,
            area_of_growth: section.areaOfGrowth,
            next_steps: section.nextSteps,
          }
        );
      } else {
        return updateEngageBehavePOP(
          point_of_progress_id,
          {
            feedback: section.feedback,
            next_steps: section.nextSteps,
          }
        );
      }
    }
  });

  return promises
}
