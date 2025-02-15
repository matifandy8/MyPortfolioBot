import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY as string);

const FAQ = [
  { question: "Who is Matías?", answer: "Matías is a web developer with 3+ years of experience in frontend development, specializing in HTML, CSS, JavaScript, React.js, and Next.js." },
  { question: "What technologies does Matías use?", answer: "Matías specializes in frontend technologies like React.js, Next.js, Vue.js, HTML, CSS, and JavaScript." },
  { question: "Where can I see Matías' portfolio?", answer: "You can check Matías' portfolio here: https://matias-fandino.vercel.app/" },
  { question: "Is Matías available for remote work?", answer: "Yes! Matías is open to remote and hybrid job opportunities." },
];

const MIN_MESSAGE_LENGTH = 3;
const stopwords = new Set(["hola", "le", "lo", "la", "de", "en", "y", "a", "o", "u"]);

const validateMessage = (message : string) => {
  if (message.length < MIN_MESSAGE_LENGTH) {
    return { valid: false, reason: "Your message is too short. Please ask a more detailed question." };
  }
  

  const words = message.toLowerCase().split(/\s+/);
  const hasMeaningfulWords = words.some((word: string) => !stopwords.has(word) && word.length >= 2);

  if (!hasMeaningfulWords) {
    return { valid: false, reason: "Your message doesn't seem to contain a meaningful question. Please try again." };
  }

  return { valid: true };
};

const generateResponse = async (message: string) => {
  const customprompt = `You are Matías' personal chatbot, designed to help visitors explore his portfolio. Avoid providing too much personal information unless directly asked. Here's a summary of Matías' professional background:
    
    - **About Matías**:  
      Matías is a web developer with over 3 years of experience, specializing in frontend development with technologies such as **HTML, CSS, JavaScript, React.js**, and **Next.js**. He has a strong interest in **AI implementation** and building modern, scalable websites.  

    - **Experience**:  
      He has worked on creating **responsive email templates** for high-profile clients using **HTML** and **CSS**. Matías has also developed websites using frameworks like **Vue.js** and **Next.js**. He has been working at **Hogarth** since January 2022 and teaches **programming classes** on **Superprof**.

    - **Skills & Interests**:  
      Matías is proactive, organized, and always looking for ways to improve his skills. He is passionate about **sports**, particularly **basketball**, and enjoys **traveling**.

    - **Contact Info**:  
      - **Phone**: 098533700  
      - **Email**: matifandy@gmail.com  
      - **Portfolio**: [matias-fandino.vercel.app](https://matias-fandino.vercel.app/)

    - **Education**:  
      Matías completed a **Web Programming course** (HTML, CSS, JS) from March to December 2020.

    - **Job Opportunities**:  
      He is open to both **remote** and **hybrid** job opportunities.

    If users ask about **Matías' hobbies, interests**, or **favorite movies**, provide details about his passion for **sports**, **basketball**, and **travel**. If they inquire about his **skills, projects**, or **background**, give them an overview of his expertise and experience.`;

  const stream = hf.chatCompletionStream({
    model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
    messages: [
      { role: "system", content: customprompt },
      { role: "user", content: message },
    ],
    temperature: 0.3,
    max_tokens: 1024,
    top_p: 0.5,
  });

  let reply = "";
  for await (const chunk of stream) {
    if (chunk.choices && chunk.choices.length > 0) {
      const newContent = chunk.choices[0].delta.content;
      reply += newContent;
    }
  }

  return reply;
};

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const validation = validateMessage(message);
    if (!validation.valid) {
      return NextResponse.json({ reply: validation.reason });
    }

    const userCookies = await cookies();
    const questionCount = parseInt(userCookies.get("questionCount")?.value || "0");

    if (questionCount >= 5) {
      return NextResponse.json({ reply: "You have reached the question limit (5)." });
    }

    const foundFAQ = FAQ.find((faq) =>
      message.toLowerCase().includes(faq.question.toLowerCase())
    );

    if (foundFAQ) {
      return NextResponse.json({ reply: foundFAQ.answer });
    }

    userCookies.set("questionCount", (questionCount + 1).toString(), { maxAge: 3600 });

    const reply = await generateResponse(message);

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}