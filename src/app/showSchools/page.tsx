"use client";
import { useEffect, useState } from "react";
import { GraduationCap, Phone, Mail } from "lucide-react";
import Loader from "../../components/Loader";

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image?: string;
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/schools");
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load schools. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-lg text-center max-w-md">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 rounded-md font-medium bg-red-600 hover:bg-red-700 text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-2 text-header">
        Schools Directory
      </h1>

      {/* Count */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <GraduationCap className="w-5 h-5 text-accent-blue" />
        <p className="text-count">
          Showing {schools.length} {schools.length === 1 ? "school" : "schools"}
        </p>
      </div>

      {schools.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏫</div>
          <h2 className="text-2xl font-semibold text-card mb-2">
            No Schools Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get started by adding your first school to the system.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div
              key={school.id}
              className="rounded-xl border border-gray-200 dark:border-gray-700 
                         bg-card text-card shadow-md hover:shadow-lg 
                         transition-transform duration-300 hover:scale-[1.02] overflow-hidden"
            >
              {/* Image */}
              {school.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={school.image}
                  alt={school.name}
                  className="w-full h-44 object-cover"
                />
              ) : (
                <div className="w-full h-44 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                  <GraduationCap className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg font-semibold mb-1 text-header">
                  {school.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {school.address}, {school.city}, {school.state}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent-green" />
                    <span>{school.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent-blue" />
                    <a
                      href={`mailto:${school.email_id}`}
                      className="hover:underline font-medium"
                    >
                      {school.email_id}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
