import React from 'react';
import { Award, Calendar, CheckCircle, ExternalLink } from 'lucide-react';
import { certifications } from '../data/mock';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            CERTIFICATIONS <span className="text-lime-400">&</span> ACHIEVEMENTS
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional certifications and educational achievements that validate my technical expertise
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {certifications.map((cert) => (
            <Card 
              key={cert.id} 
              className="bg-gray-900 border-gray-700 hover:border-lime-400/50 transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-lime-400/20 p-3 rounded-lg">
                      <Award className="text-lime-400" size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl mb-1">
                        {cert.title}
                      </CardTitle>
                      <p className="text-lime-400 font-semibold">{cert.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="text-green-400" size={16} />
                    <span className="text-green-400 text-sm font-semibold">
                      {cert.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="text-gray-400" size={16} />
                  <span className="text-gray-300">{cert.date}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black"
                  onClick={() => alert('Certificate verification will be available soon')}
                >
                  <ExternalLink size={16} className="mr-2" />
                  View Certificate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Achievements Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Academic Excellence & Continuous Learning
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-lime-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-lime-400" size={24} />
              </div>
              <h4 className="text-white font-semibold mb-2">B.Tech Student</h4>
              <p className="text-gray-300 text-sm">Computer Science & Engineering (AI & ML)</p>
              <p className="text-lime-400 text-sm font-semibold">Alliance University</p>
            </div>
            
            <div className="text-center">
              <div className="bg-lime-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-lime-400" size={24} />
              </div>
              <h4 className="text-white font-semibold mb-2">Continuous Learning</h4>
              <p className="text-gray-300 text-sm">Active in online courses and self-directed learning</p>
              <p className="text-lime-400 text-sm font-semibold">Coursera, Udemy & More</p>
            </div>
            
            <div className="text-center">
              <div className="bg-lime-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="text-lime-400" size={24} />
              </div>
              <h4 className="text-white font-semibold mb-2">Future Goals</h4>
              <p className="text-gray-300 text-sm">Pursuing advanced AI/ML certifications</p>
              <p className="text-lime-400 text-sm font-semibold">AWS, Google Cloud & Azure</p>
            </div>
          </div>
        </div>

        {/* Skills Validation */}
        <div className="mt-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              Validated Skills & Expertise
            </h3>
            <p className="text-gray-300 leading-relaxed">
              These certifications represent my commitment to continuous learning and professional development. 
              Each certification has strengthened my understanding of core concepts and practical applications 
              in software development, data science, and artificial intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;