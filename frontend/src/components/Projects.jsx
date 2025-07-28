import React from 'react';
import { Github, ExternalLink, CheckCircle, Clock, Code } from 'lucide-react';
import { projects } from '../data/mock';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Projects = () => {
  const getStatusIcon = (status) => {
    return status === 'Completed' ? 
      <CheckCircle className="text-green-400" size={16} /> : 
      <Clock className="text-yellow-400" size={16} />;
  };

  const getStatusColor = (status) => {
    return status === 'Completed' ? 'text-green-400' : 'text-yellow-400';
  };

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            MY <span className="text-lime-400">PROJECTS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my latest work and contributions to various technical projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`bg-gray-800 border-gray-700 hover:border-lime-400/50 transition-all duration-300 overflow-hidden ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } lg:flex`}
            >
              {/* Project Image/Visual */}
              <div className="lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <div className="w-24 h-24 bg-lime-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="text-lime-400" size={32} />
                  </div>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {getStatusIcon(project.status)}
                    <span className={`font-semibold ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">Project #{project.id}</p>
                </div>
              </div>

              {/* Project Content */}
              <div className="lg:w-1/2 p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </CardTitle>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="p-0">
                  {/* Technologies Used */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex}
                          variant="secondary"
                          className="bg-lime-400/20 text-lime-400 hover:bg-lime-400/30"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <CheckCircle className="text-lime-400 mt-1 flex-shrink-0" size={16} />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      asChild
                      className="bg-lime-400 text-black hover:bg-lime-300 font-semibold"
                    >
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <Github size={16} className="mr-2" />
                        View Source
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black"
                      onClick={() => alert('Live demo will be available once deployed')}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interested in Collaborating?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to contribute to innovative solutions.
            </p>
            <Button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-lime-400 text-black hover:bg-lime-300 font-semibold px-8 py-3"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;