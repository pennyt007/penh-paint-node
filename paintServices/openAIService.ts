const config = require("config");
import OpenAI from "openai";

const apiKey = config.get("apiKeyChatgpt");

// setup OpenAIApi
const openai = new OpenAI({ apiKey: apiKey });

const systemPrompt = `Descriptive Feedback Assistant or DFA is a bot designed
 to help teachers create descriptive comments from proficiency rated curriculum
 items and return as JSON object with strength, 
 area of growth and next steps for the student.
  
 Rules: 
 -	Generate comment in 3 parts strengths, areas of growth and next steps. 
 -	Each part contains one or two sentences using well written simple language for parents.
 -  The first sentence of each part will begin with <Student> 
 -  Use the student's name it can be found in the user prompt
 -  Use they/their for pronouns not she/her and not him/his
 -	Return a JSON object with Strength, Area of Growth, and Next Steps values in its body:
 
 {“strength”: “”, “areaOfGrowth”:””,”nextSteps”:“”}

 DFA: {
  "strength": "{Student} Provide a parent-friendly summary of the student's strength in the area of learning, highlighting their successes using common language.",
  "areaOfGrowth": " {Student} Craft a simple and encouraging message for parents, emphasizing areas where the child needs improvement.",
  "nextSteps": " {Student} Guide parents on how they can support their child's learning journey at home, suggest activities that align with their current skills and areas for growth."
}

 - make the comments straigth forward simple parent-friendly 	
 - Only return the JSON object and no text.`;

// const prompt = `Student Name is Mary. Proficient-Estimate reasonably;
//   Proficient-Develop mental math strategies and abilities to make sense of quantities;
//   Proficient-Develop, demonstrate, and apply mathematical understanding through play,
//   inquiry, and problem solving; Proficient-Visualize to explore mathematical concepts;
//   Proficient-Use mathematical vocabulary and language to contribute to mathematical discussions;
//   Proficient-Represent mathematical ideas in concrete, pictorial, and symbolic forms;
//   Developing-Connect mathematical concepts to each other and to other areas and personal interests;
//   Proficient-Incorporate First Peoples worldviews and perspectives to make connections to mathematical concepts;
//   Proficient-Number concepts to 1000;
//   Proficient-Addition and subtraction to 1000;
//   Developing-Pattern rules using words and numbers based on concrete experiences;`;

export default async function generateText(prompt: any) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.75,
    });

    // Introduce a delay of 10000 milliseconds (10 seconds)
    setTimeout(() => {
      console.log("Delay complete. Continue with the next action.");
      // Call the next function or perform the next action here
    }, 0);

    const outputText = response.choices[0].message.content;

    return outputText;
  } catch (error) {
    console.error(error);
  }
}


//DFA: {
  //  “strength”:”[Student Name] can successfully complete subtraction and addition worksheets.
  //  They are showing understanding in multiplication and division concepts with visual clues.”
  //  “areaOfGrowth”:”[Student Name] needs to work on explaining how they derived a solution to a math problem.”
  //  “nextSteps”:”[Student Name] will get to practice sharing their solutions to number problems in addition to learning 3D shapes.”
  //  }