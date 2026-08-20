import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  GraduationCap,
  BriefcaseBusiness,
  Plus,
  Trash2,
  Save,
  Upload,
  CheckCircle,
} from "lucide-react";

const RESUME_KEY = "myResume";

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description: string;
}

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  summary: string;
  skills: string[];
  resumeFileName: string;
  resumeFileUrl: string;
  education: Education[];
  experience: Experience[];
}

const defaultResume: ResumeData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  headline: "",
  summary: "",
  skills: [],
  resumeFileName: "",
  resumeFileUrl: "",
  education: [],
  experience: [],
};

export default function MyResume() {
  const [resume, setResume] =
    useState<ResumeData>(defaultResume);

  const [skillInput, setSkillInput] = useState("");

  const [saved, setSaved] = useState(false);

  /* =====================================================
     LOAD RESUME
  ===================================================== */

  useEffect(() => {
    try {
      const storedResume =
        localStorage.getItem(RESUME_KEY);

      console.log(
        "MyResume localStorage:",
        storedResume
      );

      if (storedResume) {
        const parsedResume = JSON.parse(
          storedResume
        );

        setResume({
          ...defaultResume,
          ...parsedResume,
        });
      }
    } catch (error) {
      console.error(
        "Error loading resume:",
        error
      );
    }
  }, []);

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setResume((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  /* =====================================================
     ADD SKILL
  ===================================================== */

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (
      resume.skills.some(
        (item) =>
          item.toLowerCase() ===
          skill.toLowerCase()
      )
    ) {
      setSkillInput("");
      return;
    }

    setResume((previous) => ({
      ...previous,
      skills: [...previous.skills, skill],
    }));

    setSkillInput("");
    setSaved(false);
  };

  /* =====================================================
     REMOVE SKILL
  ===================================================== */

  const removeSkill = (skill: string) => {
    setResume((previous) => ({
      ...previous,
      skills: previous.skills.filter(
        (item) => item !== skill
      ),
    }));

    setSaved(false);
  };

  /* =====================================================
     ADD EDUCATION
  ===================================================== */

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      year: "",
      description: "",
    };

    setResume((previous) => ({
      ...previous,
      education: [
        ...previous.education,
        newEducation,
      ],
    }));

    setSaved(false);
  };

  /* =====================================================
     UPDATE EDUCATION
  ===================================================== */

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setResume((previous) => ({
      ...previous,
      education: previous.education.map(
        (education) =>
          education.id === id
            ? {
                ...education,
                [field]: value,
              }
            : education
      ),
    }));

    setSaved(false);
  };

  /* =====================================================
     DELETE EDUCATION
  ===================================================== */

  const removeEducation = (id: string) => {
    setResume((previous) => ({
      ...previous,
      education: previous.education.filter(
        (education) =>
          education.id !== id
      ),
    }));

    setSaved(false);
  };

  /* =====================================================
     ADD EXPERIENCE
  ===================================================== */

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    setResume((previous) => ({
      ...previous,
      experience: [
        ...previous.experience,
        newExperience,
      ],
    }));

    setSaved(false);
  };

  /* =====================================================
     UPDATE EXPERIENCE
  ===================================================== */

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string
  ) => {
    setResume((previous) => ({
      ...previous,
      experience: previous.experience.map(
        (experience) =>
          experience.id === id
            ? {
                ...experience,
                [field]: value,
              }
            : experience
      ),
    }));

    setSaved(false);
  };

  /* =====================================================
     DELETE EXPERIENCE
  ===================================================== */

  const removeExperience = (id: string) => {
    setResume((previous) => ({
      ...previous,
      experience:
        previous.experience.filter(
          (experience) =>
            experience.id !== id
        ),
    }));

    setSaved(false);
  };

  /* =====================================================
     FILE UPLOAD
  ===================================================== */

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setResume((previous) => ({
      ...previous,
      resumeFileName: file.name,
    }));

    setSaved(false);
  };

  /* =====================================================
     SAVE RESUME
  ===================================================== */

  const saveResume = () => {
    try {
      localStorage.setItem(
        RESUME_KEY,
        JSON.stringify(resume)
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);

      console.log(
        "Resume saved:",
        resume
      );
    } catch (error) {
      console.error(
        "Error saving resume:",
        error
      );
    }
  };

  /* =====================================================
     CLEAR RESUME
  ===================================================== */

  const clearResume = () => {
    const confirmClear =
      window.confirm(
        "Are you sure you want to clear your resume?"
      );

    if (!confirmClear) return;

    localStorage.removeItem(RESUME_KEY);

    setResume(defaultResume);
    setSaved(false);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Resume
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create and manage your professional resume.
          </p>
        </div>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={clearResume}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={saveResume}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Save size={17} />
            Save Resume
          </button>

        </div>

      </div>

      {/* =================================================
          SUCCESS MESSAGE
      ================================================= */}

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle size={18} />
          Resume saved successfully.
        </div>
      )}

      {/* =================================================
          PERSONAL INFORMATION
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">

        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <User size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add your basic contact information.
              </p>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

          {/* Name */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>

            <div className="relative">

              <User
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                name="fullName"
                value={resume.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

            </div>

          </div>

          {/* Email */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>

            <div className="relative">

              <Mail
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                name="email"
                type="email"
                value={resume.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

            </div>

          </div>

          {/* Phone */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>

            <div className="relative">

              <Phone
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                name="phone"
                value={resume.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

            </div>

          </div>

          {/* Location */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>

            <div className="relative">

              <MapPin
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                name="location"
                value={resume.location}
                onChange={handleChange}
                placeholder="Bangalore, India"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

            </div>

          </div>

          {/* Headline */}
          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Professional Headline
            </label>

            <input
              name="headline"
              value={resume.headline}
              onChange={handleChange}
              placeholder="Frontend Developer | React | TypeScript"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

          </div>

        </div>

      </div>

      {/* =================================================
          PROFESSIONAL SUMMARY
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">

        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
              <FileText size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Professional Summary
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Give employers a quick overview of your experience.
              </p>
            </div>

          </div>

        </div>

        <div className="p-6">

          <textarea
            name="summary"
            rows={6}
            value={resume.summary}
            onChange={handleChange}
            placeholder="Write a short professional summary about yourself..."
            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />

        </div>

      </div>

      {/* =================================================
          SKILLS
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">

        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">

          <h2 className="font-semibold text-gray-900 dark:text-white">
            Skills
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add skills that match the jobs you want.
          </p>

        </div>

        <div className="p-6">

          <div className="flex gap-2">

            <input
              value={skillInput}
              onChange={(e) =>
                setSkillInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="e.g. React"
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

            <button
              type="button"
              onClick={addSkill}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={17} />
              Add
            </button>

          </div>

          {resume.skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">

              {resume.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                >
                  {skill}

                  <button
                    type="button"
                    onClick={() =>
                      removeSkill(skill)
                    }
                    className="text-blue-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}

            </div>
          )}

        </div>

      </div>

      {/* =================================================
          EXPERIENCE
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">

        <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
              <BriefcaseBusiness size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Work Experience
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add your previous work experience.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            Add Experience
          </button>

        </div>

        <div className="space-y-5 p-6">

          {resume.experience.length === 0 ? (

            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-600">

              <BriefcaseBusiness
                size={30}
                className="mx-auto text-gray-400"
              />

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                No work experience added yet.
              </p>

            </div>

          ) : (

            resume.experience.map(
              (experience, index) => (
                <div
                  key={experience.id}
                  className="rounded-xl border border-gray-200 p-5 dark:border-gray-700"
                >

                  <div className="mb-5 flex items-center justify-between">

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Experience {index + 1}
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        removeExperience(
                          experience.id
                        )
                      }
                      className="inline-flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>

                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <input
                      value={experience.jobTitle}
                      onChange={(e) =>
                        updateExperience(
                          experience.id,
                          "jobTitle",
                          e.target.value
                        )
                      }
                      placeholder="Job Title"
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />

                    <input
                      value={experience.company}
                      onChange={(e) =>
                        updateExperience(
                          experience.id,
                          "company",
                          e.target.value
                        )
                      }
                      placeholder="Company Name"
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />

                    <input
                      value={experience.location}
                      onChange={(e) =>
                        updateExperience(
                          experience.id,
                          "location",
                          e.target.value
                        )
                      }
                      placeholder="Location"
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />

                    <input
                      value={experience.startDate}
                      onChange={(e) =>
                        updateExperience(
                          experience.id,
                          "startDate",
                          e.target.value
                        )
                      }
                      placeholder="Start Date"
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />

                    <input
                      value={experience.endDate}
                      onChange={(e) =>
                        updateExperience(
                          experience.id,
                          "endDate",
                          e.target.value
                        )
                      }
                      placeholder="End Date / Present"
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />

                    <textarea
                      value={experience.description}
                      onChange={(e) =>
                        updateExperience(
                          experience.id,
                          "description",
                          e.target.value
                        )
                      }
                      rows={4}
                      placeholder="Describe your responsibilities..."
                      className="resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 md:col-span-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />

                  </div>

                </div>
              )
            )

          )}

        </div>

      </div>

      {/* =================================================
          EDUCATION
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">

        <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
              <GraduationCap size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Education
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add your educational qualifications.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            Add Education
          </button>

        </div>

        <div className="space-y-5 p-6">

          {resume.education.length === 0 ? (

            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-600">

              <GraduationCap
                size={30}
                className="mx-auto text-gray-400"
              />

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                No education added yet.
              </p>

            </div>

          ) : (

            resume.education.map(
              (education, index) => (
                <div
                  key={education.id}
                  className="rounded-xl border border-gray-200 p-5 dark:border-gray-700"
                >

                  <div className="mb-5 flex items-center justify-between">

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Education {index + 1}
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        removeEducation(
                          education.id
                        )
                      }
                      className="inline-flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>

                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <input
                      value={education.degree}
                      onChange={(e) =>
                        updateEducation(
                          education.id,
                          "degree",
                          e.target.value
                        )
                      }
                      placeholder="Degree / Course"
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />

                    <input
                      value={education.institution}
                      onChange={(e) =>
                        updateEducation(
                          education.id,
                          "institution",
                          e.target.value
                        )
                      }
                      placeholder="College / University"
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />

                    <input
                      value={education.year}
                      onChange={(e) =>
                        updateEducation(
                          education.id,
                          "year",
                          e.target.value
                        )
                      }
                      placeholder="Year"
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />

                    <textarea
                      value={education.description}
                      onChange={(e) =>
                        updateEducation(
                          education.id,
                          "description",
                          e.target.value
                        )
                      }
                      rows={3}
                      placeholder="Additional information..."
                      className="resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />

                  </div>

                </div>
              )
            )

          )}

        </div>

      </div>

      {/* =================================================
          RESUME FILE
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">

        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
              <Upload size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Resume File
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload your resume for employers.
              </p>
            </div>

          </div>

        </div>

        <div className="p-6">

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50/30 dark:border-gray-600 dark:hover:border-blue-500">

            <Upload
              size={30}
              className="text-gray-400"
            />

            <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Click to upload your resume
            </p>

            <p className="mt-1 text-xs text-gray-400">
              PDF, DOC or DOCX
            </p>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />

          </label>

          {resume.resumeFileName && (
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">

              <FileText
                size={20}
                className="text-blue-600"
              />

              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {resume.resumeFileName}
                </p>

                <p className="text-xs text-green-600">
                  Resume selected
                </p>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* =================================================
          BOTTOM SAVE BUTTON
      ================================================= */}

      <div className="flex justify-end pb-6">

        <button
          type="button"
          onClick={saveResume}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Save size={18} />
          Save Resume
        </button>

      </div>

    </div>
  );
}