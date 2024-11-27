import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TestCard from "./TestCard"; // Import the TestCard component

interface TestSeries {
  name: string;
  syllabus: string;
  questions: number;
  marks: number;
  duration: string;
  language: string;
}

const TestSeriesPage = () => {
  const [activeSubject, setActiveSubject] = useState<string>("All Subjects");
  const [testSeries, setTestSeries] = useState<TestSeries[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const lastTestSeriesElementRef = useRef<HTMLDivElement | null>(null); // Use RefObject<HTMLDivElement>

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchTestSeries = async () => {
      setLoading(true);
      try {
        // const response = await axios.get(
        //   `http://localhost:3000/api/test-series?subject=${activeSubject}&page=${page}`
        // );

        const response = await axios.get(
          `https://agrivisionbackend.onrender.com/api/test-series?subject=${activeSubject}&page=${page}`
        );
        console.log(response);

        // Check if the response contains the expected testSeries data
        if (response.data && response.data.length === 0) {
          setHasMore(false);
        } else {
          const allTestSeries = response.data.flatMap((item: any) => item.testSeries); // Flatten the testSeries arrays
          setTestSeries((prev) => [...prev, ...allTestSeries]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestSeries();
  }, [activeSubject, page]);

  // Set up IntersectionObserver for infinite scroll
  useEffect(() => {
    if (lastTestSeriesElementRef.current) {
      const observerInstance = new IntersectionObserver(handleIntersection);
      observerInstance.observe(lastTestSeriesElementRef.current);

      return () => observerInstance.disconnect(); // Cleanup on component unmount
    }
  }, [testSeries]); // Re-run the observer when new test series are added

  return (
    <div className="test-series-page px-4 py-8">
      {/* Buttons for Subject Filters */}
      <div className="flex justify-center space-x-4 mb-6">
        {["All Subjects", "Food Technology", "Thermodynamics", "Engineering Math", "General Aptitude"].map(
          (subject) => (
            <button
              key={subject}
              onClick={() => {
                setActiveSubject(subject);
                setTestSeries([]);
                setPage(1);
                setHasMore(true);
              }}
              className={`px-6 py-2 rounded-lg text-sm font-semibold ${activeSubject === subject ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            >
              {subject}
            </button>
          )
        )}
      </div>

      {/* Test Series List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mx-auto max-w-4xl">
        {testSeries.map((test, index) => (
          <TestCard
            key={index}
            test={test}
            lastTestSeriesElementRef={testSeries.length === index + 1 ? lastTestSeriesElementRef : undefined}
          />
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="loader border-t-4 border-purple-600 border-solid rounded-full w-12 h-12 border-b-transparent animate-spin"></div>
        </div>
      )}

      {/* No More Data Message */}
      {!hasMore && (
        <div className="text-center text-gray-500 mt-6">
          <p>No more test series available.</p>
        </div>
      )}
    </div>
  );
};

export default TestSeriesPage;
