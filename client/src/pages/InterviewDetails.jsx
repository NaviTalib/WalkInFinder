import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  ArrowLeft,
  Loader2,
  AlertCircle,
  IndianRupee,
  GraduationCap,
  FileText,
  CheckCircle2,
  ExternalLink,
  User
} from "lucide-react";

export default function InterviewDetails() {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterview();
  }, [id]);

  const fetchInterview = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/interviews/${id}`
      );
      setInterview(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <p className="mt-3 text-sm font-medium text-gray-500">Loading interview details...</p>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
          <AlertCircle size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Interview not found</h2>
        <p className="mt-1 text-sm text-gray-500">The listing you are looking for might have been removed or doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const poster = interview.postedBy;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">

      {/* Back Button */}
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600"
      >
        <ArrowLeft size={16} />
        Back to interviews
      </Link>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-indigo-50/50 sm:p-10">

        {/* Company Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-indigo-600 uppercase">
              {interview.company}
            </span>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {interview.title}
            </h1>
          </div>

          {/* Posted By Details Badge */}
          {poster && (
            <div className="flex items-center gap-3 rounded-2xl bg-gray-50/80 p-3.5 border border-gray-100 self-start sm:self-auto">
              {poster.profileImage ? (
                <img
                  src={poster.profileImage}
                  alt={poster.name}
                  className="h-10 w-10 shrink-0 rounded-full object-cover border"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <User size={18} />
                </div>
              )}
              <div className="min-w-0 text-xs">
                <span className="text-gray-400 block font-medium">Posted by</span>
                <p className="font-semibold text-gray-900 truncate">
                  {poster.name || "Community Member"}
                </p>
                <p className="text-gray-400 truncate">{poster.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Main Details Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Info
            icon={<MapPin size={18} />}
            title="Location"
            value={interview.location}
          />

          <Info
            icon={<Calendar size={18} />}
            title="Interview Date"
            value={new Date(interview.date).toLocaleDateString()}
          />

          <Info
            icon={<Clock size={18} />}
            title="Interview Time"
            value={interview.time}
          />

          <Info
            icon={<Briefcase size={18} />}
            title="Experience Required"
            value={interview.experience || "Not specified"}
          />
        </div>

        <hr className="my-8 border-gray-100" />

        {/* Description Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-900">About the Role</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 whitespace-pre-line">
            {interview.description}
          </p>
        </div>

        {/* Salary & Eligibility Section */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
              <IndianRupee size={18} />
              Salary / Package
            </div>
            <p className="mt-2 text-sm font-medium text-gray-800">
              {interview.salary || "Not specified"}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
              <GraduationCap size={18} />
              Eligibility Criteria
            </div>
            <p className="mt-2 text-sm font-medium text-gray-800">
              {interview.eligibility || "Not specified"}
            </p>
          </div>
        </div>

        {/* Required Skills Section */}
        {interview.skills && interview.skills.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Required Skills
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {interview.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-3.5 py-1.5 text-xs font-semibold text-indigo-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Documents Required Section */}
        {interview.documents && interview.documents.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Documents to Carry
            </h2>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {interview.documents.map((document, index) => (
                <li key={index} className="flex items-center gap-2.5 text-sm font-medium text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>{document}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Map Directions Link Button */}
        {interview.mapLink && (
          <div className="mt-10">
            <a
              href={interview.mapLink}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-center text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
            >
              <MapPin size={18} />
              Get Venue Directions on Google Maps
              <ExternalLink size={16} className="opacity-70" />
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex items-start gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>
      <div>
        <span className="text-xs font-medium text-gray-400 block">{title}</span>
        <p className="mt-0.5 text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}