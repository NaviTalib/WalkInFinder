import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, PlusCircle, Building2, MapPin, Calendar, Clock, IndianRupee, Briefcase, GraduationCap, Code, FileText, AlignLeft, Globe, ShieldAlert } from "lucide-react";

export default function PostInterview({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    company: "",
    title: "",
    location: "",
    date: "",
    time: "",
    salary: "",
    experience: "",
    eligibility: "",
    skills: "",
    documents: "",
    description: "",
    mapLink: "",
  });

  // Compulsory Google Login Check
  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-50 text-amber-600 mb-4 shadow-sm border border-amber-100">
          <ShieldAlert size={30} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Authentication Required</h2>
        <p className="mt-1 text-sm text-gray-500 max-w-sm">You must be logged in with Google to post a walk-in interview opportunity.</p>
        <Link
          to="/login"
          className="mt-6 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
        >
          Log In with Google
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/interviews",
        {
          ...form,
          date: new Date(form.date).toISOString(),
          skills: form.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          documents: form.documents
            .split(",")
            .map((document) => document.trim())
            .filter(Boolean),
        },
        {
          withCredentials: true,
        }
      );

      alert("Interview posted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to post interview. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">

      <div className="text-center sm:text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-indigo-600 uppercase">
          <PlusCircle size={14} />
          Community Contribution
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Post a Walk-In Interview
        </h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Share verified walk-in interview details to help fellow job seekers land their next role. Expired interviews will be automatically removed.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-indigo-50/50 sm:p-10"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Company Name"
            name="company"
            icon={<Building2 size={16} />}
            value={form.company}
            onChange={handleChange}
            placeholder="e.g. Google, TCS"
            required
          />

          <Input
            label="Job Role / Title"
            name="title"
            icon={<Briefcase size={16} />}
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
          />
        </div>

        <Input
          label="Location"
          name="location"
          icon={<MapPin size={16} />}
          value={form.location}
          onChange={handleChange}
          placeholder="e.g. Sector 62, Noida / Bangalore"
          required
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Interview Date"
            type="date"
            name="date"
            icon={<Calendar size={16} />}
            value={form.date}
            onChange={handleChange}
            required
          />

          <Input
            label="Interview Time"
            name="time"
            icon={<Clock size={16} />}
            value={form.time}
            onChange={handleChange}
            placeholder="e.g. 10:00 AM - 2:00 PM"
            required
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Salary / Package"
            name="salary"
            icon={<IndianRupee size={16} />}
            value={form.salary}
            onChange={handleChange}
            placeholder="e.g. 3 - 6 LPA or Not Disclosed"
          />

          <Input
            label="Experience Required"
            name="experience"
            icon={<Briefcase size={16} />}
            placeholder="e.g. Fresher / 0-2 Years"
            value={form.experience}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Eligibility Criteria"
          name="eligibility"
          icon={<GraduationCap size={16} />}
          placeholder="e.g. BCA, B.Tech, MCA, Any Graduate"
          value={form.eligibility}
          onChange={handleChange}
        />

        <Input
          label="Required Skills (Comma separated)"
          name="skills"
          icon={<Code size={16} />}
          placeholder="e.g. React, JavaScript, SQL, Node.js"
          value={form.skills}
          onChange={handleChange}
        />

        <Input
          label="Documents Required (Comma separated)"
          name="documents"
          icon={<FileText size={16} />}
          placeholder="e.g. Resume, ID Proof, Marksheets"
          value={form.documents}
          onChange={handleChange}
        />

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <AlignLeft size={16} className="text-indigo-600" />
            Detailed Description & Instructions
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            required
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 p-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Write all venue instructions, contact person, reporting time, and rounds info..."
          />
        </div>

        <Input
          label="Google Maps Direction Link"
          name="mapLink"
          icon={<Globe size={16} />}
          placeholder="Paste full Google Maps link URL"
          value={form.mapLink}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg disabled:opacity-70"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Posting Interview..." : "Post Interview Drive"}
        </button>

      </form>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon,
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
        {icon && <span className="text-indigo-600">{icon}</span>}
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
  );
}