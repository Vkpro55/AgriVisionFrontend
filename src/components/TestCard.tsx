import React, { useState} from "react";

interface TestSeries {
    name: string;
    syllabus: string;
    questions: number;
    marks: number;
    duration: string;
    language: string;
    status?: string; // Add status field
    score?: number; // Add score field
    rank?: number; // Add rank field
}

interface TestCardProps {
    test: TestSeries;
    lastTestSeriesElementRef?: React.RefObject<HTMLDivElement>;
}

const TestCard: React.FC<TestCardProps> = ({ test, lastTestSeriesElementRef }) => {
     const [showSyllabus, setShowSyllabus] = useState(false);
    return (
        <div
            ref={lastTestSeriesElementRef}
            className="bg-white rounded-lg shadow-md p-4 mb-4 " //Simplified styling
        >
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h3 className="text-lg font-medium text-purple-700">{test.name}</h3>
                </div>
                <div className="flex space-x-2">
                    <button className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm">
                        {test.status || "Start Now"}
                    </button>
                    {test.status === "Live" && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm">Live</span>
                    )}
                </div>

            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div>
                    <span className="text-gray-500">&#128221;</span> {test.questions} Questions
                </div>
                <div>
                    <span className="text-gray-500">&#128221;</span> {test.marks} Marks
                </div>
                <div>
                    <span className="text-gray-500">&#128337;</span> {test.duration} Minutes
                </div>
                <div>
                    <span className="text-gray-500">&#127760;</span> {test.language}
                </div>
                {test.score && <div>Score: {test.score}</div>}
                {test.rank && <div>Rank: {test.rank}</div>}

            </div>

             <div className="border-t border-gray-400 my-2"></div>

               <button
                className="mt-2 text-blue-500 font-medium text-sm"
                onClick={() => setShowSyllabus(!showSyllabus)}
            >
                View Syllabus
            </button>
            {showSyllabus && (
                <div className="mt-1 text-gray-600 text-sm">
                    <p>{test.syllabus}</p>
                </div>
            )}
        </div>
    );
};

export default TestCard;
