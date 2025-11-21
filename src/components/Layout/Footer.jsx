import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { settingsAPI } from '../../utils/api';

const Footer = () => {
  const [settings, setSettings] = useState({
    company_name: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    company_working_hours: '',
    company_about: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      const settingsData = response.data.data || {};
      setSettings({
        company_name: settingsData.company_name || 'PT. Denko Wahana Sakti',
        company_address: settingsData.company_address || '',
        company_phone: settingsData.company_phone || '',
        company_email: settingsData.company_email || '',
        company_working_hours: settingsData.company_working_hours || '',
        company_about: settingsData.company_about || 'Solusi industri terpercaya untuk kebutuhan perusahaan Anda dengan kualitas dan pelayanan terbaik.'
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatWorkingHours = (hours) => {
    if (!hours) return null;
    return hours.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  if (loading) {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-gray-400">Loading...</div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div>
                <h3 className="text-lg font-bold">{settings.company_name}</h3>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              {settings.company_about}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-primary-400 transition-colors">Products</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              {settings.company_address && (
                <div className="flex items-start space-x-3">
                  <MapPin size={18} className="text-primary-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400 text-sm whitespace-pre-line">
                    {settings.company_address}
                  </span>
                </div>
              )}
              {settings.company_phone && (
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-primary-400" />
                  <span className="text-gray-400">{settings.company_phone}</span>
                </div>
              )}
              {settings.company_email && (
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-primary-400" />
                  <span className="text-gray-400">{settings.company_email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Business Hours */}
          {settings.company_working_hours && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <Clock size={18} className="text-primary-400 mt-1" />
                  <div className="text-gray-400 text-sm whitespace-pre-line">
                    {formatWorkingHours(settings.company_working_hours)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {settings.company_name}. All rights reserved.
            </p>
            {/* <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;