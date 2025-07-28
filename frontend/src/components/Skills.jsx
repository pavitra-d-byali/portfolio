import React from 'react';
import { Code, Database, Cloud, Wrench, Palette } from 'lucide-react';
import { technicalSkills } from '../data/mock';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="text-lime-400" size={24} />,
      skills: technicalSkills.languages,
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: "Frontend Development",
      icon: <Palette className="text-lime-400" size={24} />,
      skills: technicalSkills.frontend,
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      title: "Backend & APIs",
      icon: <Database className="text-lime-400" size={24} />,
      skills: technicalSkills.backend,
      color: "from-green-500/20 to-green-600/20"
    },
    {
      title: "Frameworks & Libraries",
      icon: <Wrench className="text-lime-400" size={24} />,
      skills: technicalSkills.frameworks,
      color: "from-orange-500/20 to-orange-600/20"
    },
    {
      title: "Databases",
      icon: <Database className="text-lime-400" size={24} />,
      skills: technicalSkills.databases,
      color: "from-red-500/20 to-red-600/20"
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="text-lime-400" size={24} />,
      skills: technicalSkills.cloudDevOps,
      color: "from-cyan-500/20 to-cyan-600/20"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            TECHNICAL <span className="text-lime-400">SKILLS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the tools I work with
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="bg-gray-900 border-gray-700 hover:border-lime-400/50 transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-lime-400/20 p-2 rounded-lg">
                    {category.icon}
                  </div>
                  <CardTitle className="text-white text-lg">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700 hover:border-lime-400/50 hover:text-lime-400 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-700 hover:border-lime-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <div className="bg-lime-400/20 p-2 rounded-lg">
                  <Wrench className="text-lime-400" size={20} />
                </div>
                <span>Development Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="bg-lime-400/20 text-lime-400 px-3 py-1 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 hover:border-lime-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-3">
                <div className="bg-lime-400/20 p-2 rounded-lg">
                  <Code className="text-lime-400" size={20} />
                </div>
                <span>Other Specializations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.others.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-lime-400/20 text-lime-400 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;