import { useEffect, useState } from "react";
import API from "../api"; // Import centralized API client
import SearchBar from "../components/SearchBar";
import InterviewCard from "../components/InterviewCard";
import { Briefcase, Loader2, SearchX } from "lucide-react";

export default function Home() {
  const [interviews, setInterviews] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await API.get("/api/interviews");
      setInterviews(response.data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInterviews = interviews.filter((interview) => {
    const searchText = search.toLowerCase();
    const locationText = location.toLowerCase();

    const matchesSearch =
      interview.title.toLowerCase().includes(searchText) ||
      interview.company.toLowerCase().includes(searchText);

    const matchesLocation =
      interview.location.toLowerCase().includes(locationText);

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 px-4 py-16 text-center text-white sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase backdrop-blur-md">
            <Briefcase size={14} className="text-indigo-200" />
            Your Career Catalyst
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Find Your Next
            <span className="mt-1 block text-indigo-200">
              Walk-In Interview
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-indigo-100 sm:text-lg">
            Discover verified walk-in opportunities shared by top community members and job seekers around you.
          </p>

          {/* Integrated Search Bar Component */}
          <div className="mt-8 text-left">
            <SearchBar
              search={search}
              setSearch={setSearch}
              location={location}
              setLocation={setLocation}
            />
          </div>
        </div>
      </section>

      {/* Main Content Listings Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Latest Walk-In Interviews
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Browse active interview drives posted by the community.
            </p>
          </div>
          
          <div className="mt-3 sm:mt-0 text-sm font-medium text-indigo-600">
            Showing {filteredInterviews.length} results
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            <p className="mt-3 text-sm font-medium text-gray-500">Loading open interviews...</p>
          </div>
        ) : filteredInterviews.length === 0 ? (
          <div className="flex min-h-[35vh] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mb-4">
              <SearchX size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              No interviews found
            </h3>
            <p className="mt-1 text-sm text-gray-500 max-w-sm">
              We couldn't find any listings matching your search keyword or location. Try clearing your filters.
            </p>
            <button
              onClick={() => { setSearch(""); setLocation(""); }}
              className="mt-5 rounded-xl bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredInterviews.map((interview) => (
              <InterviewCard
                key={interview._id}
                interview={interview}
              />
            ))}
          </div>
        )}

      </section>

    </div>
  );
}