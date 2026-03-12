"use client";

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function InterviewPage() {
  // sample data - replace with fetch/props as needed
  const data = {
    matchScore: 0.9,
    technicalQuestions: [
      {
        question: "Explain the concept of the Virtual DOM in React and why it's beneficial.",
        intention: "To assess understanding of fundamental React performance mechanisms.",
        answer: "The Virtual DOM is a lightweight copy of the actual DOM maintained by React. When state changes, React first updates the Virtual DOM, then efficiently calculates the minimal changes needed to the real DOM using a 'diffing' algorithm. This process, called reconciliation, minimizes direct DOM manipulations, which are expensive, leading to better performance and a smoother user experience."
      },
      {
        question: "How do you handle asynchronous operations in Node.js, and what are common patterns you've used?",
        intention: "To gauge familiarity with Node.js's non-blocking nature and common asynchronous programming techniques.",
        answer: "In Node.js, asynchronous operations are crucial. I commonly use Promises and async/await syntax. Promises provide a cleaner way to handle asynchronous results than traditional callbacks, especially for multiple operations. Async/await builds on Promises, allowing asynchronous code to be written in a synchronous-like style, making it more readable and maintainable. Callbacks were historically used but can lead to 'callback hell' for complex flows."
      },
      {
        question: "Describe the purpose of middleware in Express.js and provide an example of when you would use it.",
        intention: "To understand the candidate's grasp of Express.js architecture and common backend patterns.",
        answer: "Middleware functions in Express.js are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. They can execute code, make changes to the request and response objects, end the request-response cycle, or call the next middleware. An example is an authentication middleware that checks for a valid JWT token in the request header before allowing access to a protected route, preventing unauthorized users from reaching sensitive API endpoints."
      },
      {
        question: "When would you choose MongoDB over MySQL for a project, and vice versa?",
        intention: "To assess understanding of different database paradigms and decision-making for data storage.",
        answer: "I would choose MongoDB (a NoSQL document database) when dealing with unstructured or semi-structured data, rapidly evolving data schemas, or needing high scalability for large amounts of data without strict relational requirements, like in content management systems or IoT data. I would choose MySQL (a relational database) when data has a clear, fixed structure, integrity and ACID compliance are critical, and complex relationships between entities are paramount, such as in financial applications or e-commerce platforms."
      }
    ],
    behavioralQuestions: [
      {
        question: "Tell me about a time you had to collaborate with others on a project. What was your role, and how did you ensure effective teamwork?",
        intention: "To understand the candidate's collaboration skills, team contribution, and communication abilities.",
        answer: "During my 'AI Resume Analyzer' project, I collaborated with a peer on different modules. My role primarily involved developing the frontend with React and integrating the backend APIs, while my peer focused on the NLP backend logic. To ensure effective teamwork, we held daily stand-ups to discuss progress, roadblocks, and next steps. We used Git for version control, ensuring our codebases were always synchronized, and conducted regular code reviews to maintain quality and share knowledge. Clear communication and mutual support were key to delivering the project successfully."
      },
      {
        question: "Describe a challenging technical problem you faced during a project and how you resolved it.",
        intention: "To evaluate problem-solving skills, resilience, and methodical approach to technical difficulties.",
        answer: "In the 'Task Manager Web App,' I encountered a performance bottleneck where API responses for large datasets were slow. Initially, I thought it was a database indexing issue. After profiling the API, I realized the data being sent was excessive, including many fields not needed by the frontend. My approach was to implement pagination and selective field projection in the API queries. This reduced the data payload significantly. I also added caching for frequently accessed data. The resolution drastically improved response times and overall application snappiness, teaching me the importance of optimizing API design beyond just database queries."
      },
      {
        question: "What motivates you as a developer, and how do you stay updated with new technologies?",
        intention: "To understand the candidate's passion for development, commitment to continuous learning, and alignment with a growth-oriented team.",
        answer: "What truly motivates me as a developer is the satisfaction of transforming complex problems into elegant, functional solutions that enhance user experience. I enjoy the process of building and seeing my code bring an idea to life. To stay updated with new technologies, I regularly follow reputable tech blogs and news sources, participate in online coding communities, and take online courses on platforms like Coursera or Udemy. I also actively engage in side projects to experiment with new libraries or frameworks, which helps solidify my understanding and keeps my skills sharp. Continuous learning is something I deeply value in this field."
      }
    ],
    skillGaps: [
      { skill: "Testing Frameworks (e.g., Jest, React Testing Library, Supertest)", severity: "medium" },
      { skill: "Cloud Deployment Experience (e.g., AWS, Azure, Google Cloud)", severity: "low" },
      { skill: "CI/CD Pipeline Basics (e.g., GitHub Actions, Jenkins)", severity: "low" }
    ],
    preparationPlan: [
      { day: "Day 1: Technical Fundamentals Refresh", focus: "Reinforce core full-stack concepts.", tasks: [
          "Review React hooks, state management (Redux), and component lifecycle.",
          "Practice common Node.js/Express patterns: middleware, routing, error handling.",
          "Revisit REST API principles: HTTP methods, status codes, idempotence.",
          "Solve 1-2 small coding challenges related to frontend logic or backend API creation."
        ]
      },
      { day: "Day 2: Database & System Design & Behavioral Practice", focus: "Strengthen database knowledge, architectural thinking, and soft skills.", tasks: [
          "Review MongoDB and MySQL basic CRUD operations, indexing, and data modeling concepts.",
          "Understand JWT authentication flow and secure cookie practices in depth.",
          "Practice answering behavioral questions using the STAR method, focusing on collaboration, problem-solving, and conflict resolution.",
          "Research common junior-level system design questions (e.g., design a URL shortener or a simple chat app)."
        ]
      },
      { day: "Day 3: Mock Interview & Logistics", focus: "Simulate the interview experience and ensure readiness.", tasks: [
          "Conduct a mock interview (technical and behavioral) with a peer or mentor.",
          "Prepare 3-5 insightful questions to ask the interviewer about the role, team, or company culture.",
          "Review your resume and projects for clarity and conciseness.",
          "Ensure your interview environment (internet, camera, microphone) is set up and functional."
        ]
      }
    ]
  };

  const [selected, setSelected] = useState('technical');

  const renderAccordion = (items) => {
    return (
      <div className="space-y-4">
        {items.map((item, idx) => (
          <details key={idx} className="group bg-zinc-800 rounded-lg border border-zinc-700">
            <summary className="flex justify-between items-center px-4 py-3 cursor-pointer select-none">
              <span className="font-medium text-zinc-100"><span className='bg-red-800/20 p-0.5 rounded-sm border border-red-700 text-red-800'>Q{idx + 1}:</span> {item.question}</span>
              <span className="transition-transform duration-200 group-open:rotate-180">
                ▼
              </span>
            </summary>
            <div className="px-4 pb-4 text-zinc-200">
                <Label className={"bg-blue-700/20 text-blue-500 border border-blue-500 inline-block p-0.5 rounded-sm text-xs"}>INTENTION</Label> 
              <p className="text-sm text-zinc-400 italic mb-2">{item.intention}</p>

              <Label className={"bg-green-700/20 text-green-500 border border-green-500 inline-block p-0.5 rounded-sm text-xs"}>ANSWER</Label> 
              <p className="">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (selected === 'technical') {
      return (
        <div className="p-4 overflow-y-auto h-full">
          {renderAccordion(data.technicalQuestions)}
        </div>
      );
    }
    if (selected === 'behavioral') {
      return (
        <div className="p-4 overflow-y-auto h-full">
          {renderAccordion(data.behavioralQuestions)}
        </div>
      );
    }
    if (selected === 'roadmap') {
      return (
        <div className="p-4 overflow-y-auto h-full">
          <div className="relative pl-12">
            {data.preparationPlan.map((day, i) => (
              <div key={i} className="mb-8 relative">
                <span className="absolute -left-10 top-1 w-4 h-4 bg-green-500 rounded-full transform -translate-x-1/2" />
                <h3 className="font-semibold text-lg text-zinc-100">{day.day}</h3>
                <p className="text-zinc-300 italic mb-2">{day.focus}</p>
                <ul className="list-disc ml-6 space-y-1 text-zinc-200">
                  {day.tasks.map((task, ti) => (
                    <li key={ti}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-green-500" />
          </div>
        </div>
      );
    }
  };

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <div className="flex gap-4 bg-zinc-200/40 dark:bg-zinc-900/60 p-4 rounded-2xl h-[80vh] w-[90vw]">
        {/* left nav */}
        <aside className="flex flex-col space-y-4 w-1/6 text-zinc-100">
          <button
            onClick={() => setSelected('technical')}
            className={`text-left px-3 py-2 rounded-lg ${selected === 'technical' ? 'bg-zinc-700' : 'hover:bg-zinc-700/60'}`}
          >Technical Questions</button>
          <button
            onClick={() => setSelected('behavioral')}
            className={`text-left px-3 py-2 rounded-lg ${selected === 'behavioral' ? 'bg-zinc-700' : 'hover:bg-zinc-700/60'}`}
          >Behavioral Questions</button>
          <button
            onClick={() => setSelected('roadmap')}
            className={`text-left px-3 py-2 rounded-lg ${selected === 'roadmap' ? 'bg-zinc-700' : 'hover:bg-zinc-700/60'}`}
          >Road Map</button>
        </aside>

        {/* main content */}
        <section className="flex-1 bg-zinc-800 rounded-lg overflow-hidden">
          {renderContent()}
        </section>

        {/* right panel */}
        <aside className="flex flex-col justify-start space-y-6 w-1/5 text-zinc-100">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-8 border-green-500"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-zinc-100">
                {Math.round(data.matchScore * 100)}%
              </div>
            </div>
            <p className="mt-2 text-sm text-zinc-400">Strong match for this role</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Skill gaps</h3>
            <div className="flex flex-col gap-2">
              {data.skillGaps.map((s, i) => {
                let colors = 'border-yellow-600 text-yellow-600 bg-yellow-100/20';
                if (s.severity === 'medium') colors = 'border-orange-600 text-orange-600 bg-orange-400/20';
                if (s.severity === 'low') colors = 'border-green-600 text-green-600 bg-green-400/20';
                return (
                  <span key={i} className={`${colors} border px-3 py-1 rounded-full text-xs`}>{s.skill}</span>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}