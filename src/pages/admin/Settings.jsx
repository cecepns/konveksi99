import { useState, useEffect } from 'react';
import AOS from 'aos';
import { Save, Building, MapPin, Phone, Mail, Globe, Info, Clock } from 'lucide-react';
import { settingsAPI } from '../../utils/api';

const Settings = () => {
  const [settings, setSettings] = useState({
    company_name: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    company_about: '',
    company_working_hours: '',
    google_maps_embed: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await settingsAPI.get();
      setSettings(response.data.data || {});
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await settingsAPI.update(settings);
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div data-aos="fade-up">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Settings</h1>
        <p className="text-gray-600">Manage your company information and website settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up">
          <div className="flex items-center mb-6">
            <Building className="text-primary-600 mr-3" size={24} />
            <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company_name"
                required
                value={settings.company_name || ''}
                onChange={handleInputChange}
                className="input-field"
                placeholder="PT. Denko Wahana Sakti"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  name="company_email"
                  required
                  value={settings.company_email || ''}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="selvi@denko.co.id"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="tel"
                  name="company_phone"
                  required
                  value={settings.company_phone || ''}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="0881022598949"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                <textarea
                  name="company_address"
                  required
                  rows={3}
                  value={settings.company_address || ''}
                  onChange={handleInputChange}
                  className="input-field pl-10 resize-none"
                  placeholder="Kawasan Industri de Prima Terra, Jl. Raya Sapan Blok E2/11, Tegalluar Kec. Bojongsoang Kab. Bandung"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Gunakan baris baru untuk memisahkan setiap baris alamat.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Working Hours
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 text-gray-400" size={16} />
                <textarea
                  name="company_working_hours"
                  rows={3}
                  value={settings.company_working_hours || ''}
                  onChange={handleInputChange}
                  className="input-field pl-10 resize-none"
                  placeholder="Senin - Jumat: 08:00 - 17:00&#10;Sabtu: 08:00 - 12:00&#10;Minggu: Tutup"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Gunakan baris baru untuk memisahkan setiap baris jam kerja.
              </p>
            </div>
          </div>
        </div>

        {/* About Company */}
        <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up">
          <div className="flex items-center mb-6">
            <Info className="text-primary-600 mr-3" size={24} />
            <h2 className="text-lg font-semibold text-gray-900">About Company</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Description *
            </label>
            <textarea
              name="company_about"
              required
              rows={6}
              value={settings.company_about || ''}
              onChange={handleInputChange}
              className="input-field resize-none"
              placeholder="Write about your company, history, mission, and values..."
            />
            <p className="text-sm text-gray-500 mt-2">
              This will be displayed on the About page and other sections of your website.
            </p>
          </div>
        </div>

        {/* Maps Integration */}
        <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up">
          <div className="flex items-center mb-6">
            <Globe className="text-primary-600 mr-3" size={24} />
            <h2 className="text-lg font-semibold text-gray-900">Maps Integration</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Maps Embed URL
            </label>
            <input
              type="url"
              name="google_maps_embed"
              value={settings.google_maps_embed || ''}
              onChange={handleInputChange}
              className="input-field"
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <p className="text-sm text-gray-500 mt-2">
              Get the embed URL from Google Maps by clicking "Share" → "Embed a map" → Copy the src URL from the iframe code.
            </p>
          </div>

          {settings.google_maps_embed && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
                <iframe
                  src={settings.google_maps_embed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end" data-aos="fade-up">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary inline-flex items-center space-x-2 px-8 py-3"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;