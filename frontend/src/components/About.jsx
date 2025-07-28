import React from 'react';
import { MapPin, Target, Heart } from 'lucide-react';
import { personalInfo } from '../data/mock';
import { Card, CardContent } from './ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            ABOUT <span className="text-lime-400">ME</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know more about my background, goals, and passion for technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Info Cards */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700 hover:border-lime-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-lime-400/20 p-3 rounded-lg">
                    <MapPin className="text-lime-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Location & Contact</h3>
                    <p className="text-gray-300 mb-1">{personalInfo.location}</p>
                    <p className="text-gray-300 mb-1">{personalInfo.email}</p>
                    <p className="text-gray-300">{personalInfo.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-lime-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-lime-400/20 p-3 rounded-lg">
                    <Target className="text-lime-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Career Goals</h3>
                    <p className="text-gray-300 mb-2">Target Role: {personalInfo.careerGoals.targetRole}</p>
                    <div className="flex flex-wrap gap-2">
                      {personalInfo.careerGoals.interestAreas.map((area, index) => (
                        <span
                          key={index}
                          className="bg-lime-400/20 text-lime-400 px-3 py-1 rounded-full text-sm"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-lime-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-lime-400/20 p-3 rounded-lg">
                    <Heart className="text-lime-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Passion & Values</h3>
                    <p className="text-gray-300">
                      Building impactful tech solutions that solve real-world problems and make a difference in people's lives.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Bio */}
          <div className="lg:pl-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">My Story</h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Currently pursuing B.Tech in Computer Science & Engineering (AI & ML) at Alliance University, Bengaluru, 
                  I'm deeply passionate about the intersection of artificial intelligence and real-world problem solving.
                </p>
                <p>
                  My journey in technology has been driven by curiosity and a desire to create meaningful solutions. 
                  From developing full-stack e-commerce platforms to building collaborative project management tools, 
                  I enjoy working across the entire technology stack.
                </p>
                <p>
                  What excites me most about AI and ML is the potential to automate processes, derive insights from data, 
                  and create intelligent systems that can adapt and learn. I'm constantly exploring new technologies and 
                  frameworks to stay at the forefront of this rapidly evolving field.
                </p>
                <p className="text-lime-400 font-semibold">
                  Ready to contribute to innovative projects and make a positive impact through technology.
                </p>
                <div className="mt-6">
  
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;