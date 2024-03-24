import PDFparser from "pdf-parse";

function extractTextBetweenMarkers(
  rawText: string,
  startMarker: string,
  endMarker: string
) {
  const regexPattern = new RegExp(`${startMarker}\\s+(.*?)${endMarker}`, "i");
  const match = regexPattern.exec(rawText);
  return match ? match[1].trim() : null;
}

export default async function extractPopSummaryContent(fileBuffer: Buffer) {
  // get text from pdf
  const pdfContent = await PDFparser(fileBuffer);
  if (!pdfContent) return null;

  // remove carridge returns from text
  const rawText = pdfContent.text.replace(/\n/g, " ");

  // extract the feedback, area of growth and next steps from
  // each section of the point of progress summary
  const engageBehaveFeedback = extractTextBetweenMarkers(
    rawText,
    "0-Global Comment",
    "1-Art"
  );

  const engageBehaveAreaOfGrowth = "No Area of Growth."
  const engageBehaveNextSteps = "No Next Steps.";

  const artFeedback = extractTextBetweenMarkers(
    rawText,
    "1-Strength",
    "1-Area of Growth"
  );

  const artAreaOfGrowth = extractTextBetweenMarkers(
    rawText,
    "1-Area of Growth",
    "1-Next Steps"
  );

  const artNextSteps = extractTextBetweenMarkers(
    rawText,
    "1-Next Steps",
    "2-English"
  );

  const englishFeedback = extractTextBetweenMarkers(
    rawText,
    "2-Strength",
    "2-Area of Growth"
  );

  const englishAreaOfGrowth = extractTextBetweenMarkers(
    rawText,
    "2-Area of Growth",
    "2-Next Steps"
  );

  const englishNextSteps = extractTextBetweenMarkers(
    rawText,
    "2-Next Steps",
    "3-Math"
  );
  const mathFeedback = extractTextBetweenMarkers(
    rawText,
    "3-Strength",
    "3-Area of Growth"
  );

  const mathAreaOfGrowth = extractTextBetweenMarkers(
    rawText,
    "3-Area of Growth",
    "3-Next Steps"
  );

  const mathNextSteps = extractTextBetweenMarkers(
    rawText,
    "3-Next Steps",
    "4-PHE"
  );

  const physicalHealthFeedback = extractTextBetweenMarkers(
    rawText,
    "4-Strength",
    "4-Area of Growth"
  );

  const physicalHealthAreaOfGrowth = extractTextBetweenMarkers(
    rawText,
    "4-Area of Growth",
    "4-Next Steps"
  );

  const physicalHealthNextSteps = extractTextBetweenMarkers(
    rawText,
    "4-Next Steps",
    "5-Science"
  );

  const scienceFeedback = extractTextBetweenMarkers(
    rawText,
    "5-Strength",
    "5-Area of Growth"
  );

  const scienceAreaOfGrowth = extractTextBetweenMarkers(
    rawText,
    "5-Area of Growth",
    "5-Next Steps"
  );

  const scienceNextSteps = extractTextBetweenMarkers(
    rawText,
    "5-Next Steps",
    "6-Social Studies"
  );

  const socialStudiesFeedback = extractTextBetweenMarkers(
    rawText,
    "6-Strength",
    "6-Area of Growth"
  );
  const socialStudiesAreaOfGrowth = extractTextBetweenMarkers(
    rawText,
    "6-Area of Growth",
    "6-Next Steps"
  );

  const socialStudiesNextSteps = extractTextBetweenMarkers(
    rawText,
    "6-Next Steps",
    "7-Communication"
  );

  const communicationFeedback = extractTextBetweenMarkers(
    rawText,
    "7-Strength",
    "7-Area of Growth"
  );

  const communicationAreaOfGrowth = extractTextBetweenMarkers(
    rawText,
    "7-Area of Growth",
    "7-Goal"
  );

  const communicationNextSteps = extractTextBetweenMarkers(
    rawText,
    "7-Goal",
    "8-Thinking"
  );

  const thinkingFeedback = extractTextBetweenMarkers(
    rawText,
    "8-Strength",
    "8-Area of Growth"
  );

  const thinkingAreaOfGrowth = extractTextBetweenMarkers(
    rawText,
    "8-Area of Growth",
    "8-Goal"
  );

  const thinkingNextSteps = extractTextBetweenMarkers(
    rawText,
    "8-Goal",
    "9-Personal and Social"
  );

  const personalAndSocialFeedback = extractTextBetweenMarkers(
    rawText,
    "9-Strength",
    "9-Area of Growth"
  );

  const personalAndSocialAreaOfGrowth = extractTextBetweenMarkers(
    rawText,
    "9-Strength",
    "9-Area of Growth"
  );

  const personalAndSocialNextSteps = extractTextBetweenMarkers(
    rawText,
    "9-Goal",
    "10-End"
  );

  // create an array of objects representing
  // each point of progress section
  const popSummaryContent = [
    {
      id: null,
      feedback: engageBehaveFeedback,
      areaOfGrowth: engageBehaveAreaOfGrowth,
      nextSteps: engageBehaveNextSteps,
    },
    { id: 20, feedback: artFeedback, areaOfGrowth: artAreaOfGrowth, nextSteps: artNextSteps },
    { id: 50, feedback: englishFeedback, areaOfGrowth: englishAreaOfGrowth, nextSteps: englishNextSteps },
    { id: 80, feedback: mathFeedback, areaOfGrowth: mathAreaOfGrowth, nextSteps: mathNextSteps },
    {
      id: 90,
      feedback: physicalHealthFeedback,
      areaOfGrowth: physicalHealthAreaOfGrowth,
      nextSteps: physicalHealthNextSteps,
    },
    { id: 100, feedback: scienceFeedback, areaOfGrowth: scienceAreaOfGrowth, nextSteps: scienceNextSteps },
    {
      id: 110,
      feedback: socialStudiesFeedback,
      areaOfGrowth: socialStudiesAreaOfGrowth,
      nextSteps: socialStudiesNextSteps,
    },
    {
      id: 500,
      feedback: communicationFeedback,
      areaOfGrowth: communicationAreaOfGrowth,
      nextSteps: communicationNextSteps,
    },
    { id: 510, feedback: thinkingFeedback, areaOfGrowth: thinkingAreaOfGrowth, nextSteps: thinkingNextSteps },
    {
      id: 520,
      feedback: personalAndSocialFeedback,
      areaOfGrowth: personalAndSocialAreaOfGrowth,
      nextSteps: personalAndSocialNextSteps,
    },
  ];

  // return point of progress sections
  return popSummaryContent;
}
