import { Link } from "react-router-dom";
import { MapPin, Calendar, Clock, Briefcase, ArrowRight, User } from "lucide-react";

export default function InterviewCard({ interview }) {
  const poster = interview.postedBy;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-100">
      
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-600 uppercase">
            {interview.company}
          </span>
          {interview.experience && (
            <span className="flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 border border-gray-100">
              <Briefcase size={13} className="text-gray-400" />
              {interview.experience}
            </span>
          )}
        </div>

        <h2 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {interview.title}
        </h2>
      </div>

      {/* Details Grid */}
      <div className="mt-5 grid grid-cols-1 gap-2.5 text-sm text-gray-600">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
            <MapPin size={16} />
          </div>
          <span className="truncate">{interview.location}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
              <Calendar size={16} />
            </div>
            <span>{new Date(interview.date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
              <Clock size={16} />
            </div>
            <span>{interview.time}</span>
          </div>
        </div>
      </div>

      {/* Posted By Details Section */}
      {poster && (
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-gray-50/70 p-3 border border-gray-100">
          {poster.profileImage ? (
            <img
              src={poster.profileImage}
              alt={poster.name}
              className="h-8 w-8 shrink-0 rounded-full object-cover border"
            />
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <User size={15} />
            </div>
          )}
          <div className="min-w-0 flex-1 text-xs">
            <p className="font-semibold text-gray-800 truncate">
              {poster.name || "Community Member"}
            </p>
            <p className="text-gray-400 truncate">{poster.email}</p>
          </div>
        </div>
      )}

      {/* Bottom Footer Section */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <span className="text-xs text-gray-400 block font-medium">Package</span>
          <span className="font-bold text-gray-900 text-sm">
            {interview.salary || "Not disclosed"}
          </span>
        </div>

        <Link
          to={`/interview/${interview._id}`}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
        >
          View Details
          <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}