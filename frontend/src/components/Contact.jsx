import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/mock';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { portfolioAPI } from '../services/api';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await portfolioAPI.submitContactForm(formData);
      
      toast({
        title: "Message Sent!",
        description: response.message,
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case 'github':
        return <Github size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'mail':
        return <Mail size={20} />;
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            GET IN <span className="text-lime-400">TOUCH</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to collaborate or discuss opportunities? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-lime-400/20 p-3 rounded-lg">
                    <Mail className="text-lime-400" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-white hover:text-lime-400 transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-lime-400/20 p-3 rounded-lg">
                    <Phone className="text-lime-400" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <a 
                      href={`tel:${personalInfo.phone}`}
                      className="text-white hover:text-lime-400 transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-lime-400/20 p-3 rounded-lg">
                    <MapPin className="text-lime-400" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">{personalInfo.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-lime-400/20 p-3 rounded-lg text-lime-400 hover:bg-lime-400 hover:text-black transition-all duration-300 hover:scale-110"
                      title={social.name}
                    >
                      {getSocialIcon(social.icon)}
                    </a>
                  ))}
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  Follow me on social media for updates on my latest projects and tech insights.
                </p>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="bg-gradient-to-br from-lime-400/20 to-green-400/20 border-lime-400/50">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-2">Current Availability</h3>
                <p className="text-gray-300 text-sm">
                  Open to internship opportunities, freelance projects, and collaboration on innovative AI/ML solutions.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-700 border-gray-600 text-white focus:border-lime-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-700 border-gray-600 text-white focus:border-lime-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Subject</label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white focus:border-lime-400"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-gray-700 border-gray-600 text-white focus:border-lime-400 resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-lime-400 text-black hover:bg-lime-300 font-semibold py-3"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;