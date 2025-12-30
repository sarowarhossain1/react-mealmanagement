import { useState } from "react";
import { motion } from "framer-motion";
import Nayem from "../../assets/Nayem.jpg";
import LOGIN from "../../assets/login.png";
import SHUNNOIT from "../../assets/SHUNNOIT.png";

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const skills = [
    { name: "HTML", level: 90 },
    { name: "CSS / Tailwind", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "React", level: 75 },
    { name: "UI/UX Design", level: 70 },
  ];

  const contacts = [
    { icon: "fas fa-envelope", title: "Email", value: "mdnayem357878@gmail.com" },
    { icon: "fas fa-phone", title: "Phone", value: "01612648699" },
    { icon: "fas fa-map-marker-alt", title: "Location", value: "Rajshahi" },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative">

        {/* Dark Mode Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 bg-indigo-100 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
        >
          {/* {darkMode ? "☀ Light" : "🌙 Dark"} */}
          <img src={SHUNNOIT} alt="" className="w-8 h-8"/>
        </button>

        {/* Cover */}
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
          <img src={LOGIN} alt="" className="h-full w-full object-cover opacity-20" />
          
        </div>

        {/* Profile Card */}
        <div className="max-w-6xl mx-auto px-4 -mt-20">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border-2 border-[#9719FB]">

            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col md:flex-row md:items-center">
                <img
                  src={Nayem}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                  alt="profile"
                />

                <div className="mt-4 md:mt-0 md:ml-6">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Md. Sarowar Hossain Nayem
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Frontend Developer • UI Designer
                  </p>
                </div>
              </div>

              {/* Follow Button */}
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`mt-4 md:mt-0 px-6 py-2 rounded-lg shadow transition
                  ${
                    isFollowing
                      ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
              >
                {isFollowing ? "Following ✓" : "Follow"}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 text-center mt-8 pt-6">
              <div>
                <p className="text-xl font-bold text-gray-800 dark:text-white">4.2k</p>
                <p className="text-[#9719FB] font-bold">Followers</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800 dark:text-white">980</p>
                <p className="text-[#9719FB] font-bold">Following</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800 dark:text-white">152</p>
                <p className="text-[#9719FB] font-bold">Posts</p>
              </div>
            </div>

            {/* About */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-[#9719FB]">About</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
                I am Md. Sarowar Hossain Nayem from Rajshahi.  
                React Development is my passion and I love building modern UI.
              </p>
            </div>
          </div>

          {/* Skills & Contact */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">

            {/* Skills */}
            <div className="bg-white dark:bg-gray-800 p-6 shadow-lg border-2 border-[#9719FB] rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Skills
              </h2>

              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-800 dark:text-white font-semibold">
                      {skill.name}
                    </span>
                    <span className="text-gray-500">{skill.level}%</span>
                  </div>

                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact */}
            <div className="bg-white dark:bg-gray-800 p-6 shadow-lg border-2 border-[#9719FB] rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Contact Information
              </h2>

              {contacts.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-4 mb-4"
                >
                  <i className={`${item.icon} text-indigo-600 text-2xl`}></i>
                  <div>
                    <p className="text-gray-800 dark:text-white font-semibold">
                      {item.title}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
