import { useState, useEffect } from 'react';
import AOS from 'aos';
import SEO from '../components/Common/SEO';
import { MapPin, Phone, Mail, Clock, Send, CircleCheck as CheckCircle } from 'lucide-react';
import { settingsAPI } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [settings, setSettings] = useState({
    company_name: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    company_working_hours: '',
    google_maps_embed: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      const settingsData = response.data.data || {};
      setSettings({
        company_name: settingsData.company_name || '',
        company_address: settingsData.company_address || '',
        company_phone: settingsData.company_phone || '',
        company_email: settingsData.company_email || '',
        company_working_hours: settingsData.company_working_hours || 'Senin - Jumat: 08:00 - 17:00\nSabtu: 08:00 - 12:00\nMinggu: Tutup',
        google_maps_embed: settingsData.google_maps_embed || ''
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  // Parse address into lines
  const addressLines = settings.company_address 
    ? settings.company_address.split('\n').filter(line => line.trim())
    : [
        'Kawasan Industri de Prima Terra',
        'Jl. Raya Sapan Blok E2/11',
        'Tegalluar Kec. Bojongsoang',
        'Kab. Bandung, Jawa Barat'
      ];

  // Parse working hours into lines
  const workingHoursLines = settings.company_working_hours
    ? settings.company_working_hours.split('\n').filter(line => line.trim())
    : [
        'Senin - Jumat: 08:00 - 17:00',
        'Sabtu: 08:00 - 12:00',
        'Minggu: Tutup'
      ];

  // Format phone for tel link (remove non-digits and ensure it starts with country code)
  const formatPhoneForLink = (phone) => {
    if (!phone) return '6281022598949';
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.startsWith('62') ? cleaned : `62${cleaned}`;
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat',
      details: addressLines.length > 0 ? addressLines : ['Alamat belum diatur']
    },
    {
      icon: Phone,
      title: 'Telepon',
      details: [settings.company_phone || '0881022598949'],
      link: `tel:+${formatPhoneForLink(settings.company_phone)}`
    },
    {
      icon: Mail,
      title: 'Email',
      details: [settings.company_email || 'selvi@denko.co.id'],
      link: `mailto:${settings.company_email || 'selvi@denko.co.id'}`
    },
    {
      icon: Clock,
      title: 'Jam Kerja',
      details: workingHoursLines.length > 0 ? workingHoursLines : ['Jam kerja belum diatur']
    }
  ];

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Hubungi PT. Denko Wahana Sakti untuk konsultasi, informasi produk, atau kerjasama bisnis. Tim kami siap membantu kebutuhan industri Anda."
        keywords="kontak denko wahana sakti, alamat perusahaan, telepon, email, konsultasi"
      />

      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 
              className="text-2xl lg:text-6xl font-bold mb-6"
              data-aos="fade-up"
            >
              Hubungi <span className="text-secondary-400">Kami</span>
            </h1>
            <p 
              className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              Tim profesional kami siap membantu Anda menemukan solusi industri 
              yang tepat untuk kebutuhan bisnis Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="card p-6 text-center hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-primary-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <info.icon className="text-primary-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div className="text-gray-600 text-sm space-y-1">
                  {info.details.map((detail, idx) => (
                    <div key={idx}>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="hover:text-primary-600 transition-colors"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p>{detail}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div data-aos="fade-right">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Kirim <span className="text-primary-600">Pesan</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Isi form di bawah ini untuk mengirim pesan atau pertanyaan Anda. 
                Tim kami akan merespons dalam waktu 24 jam.
              </p>

              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle size={20} />
                    <span className="font-medium">Pesan berhasil dikirim!</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">
                    Terima kasih atas pesan Anda. Tim kami akan segera menghubungi Anda.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="08xxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Perusahaan
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Nama perusahaan"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="input-field resize-none"
                    placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full md:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Kirim Pesan</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map */}
            <div data-aos="fade-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Lokasi <span className="text-primary-600">Kami</span>
              </h2>
              <p className="text-gray-600 mb-6">
                {settings.company_address 
                  ? `Kunjungi kantor kami di ${settings.company_address.split('\n')[0]}. Kami siap melayani Anda dengan konsultasi langsung.`
                  : 'Kunjungi kantor kami. Kami siap melayani Anda dengan konsultasi langsung.'}
              </p>
              
              <div className="bg-gray-200 rounded-lg h-80 lg:h-96 relative overflow-hidden">
                {settings.google_maps_embed ? (
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
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p>Peta belum diatur. Silakan atur Google Maps Embed URL di halaman Settings.</p>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="text-primary-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Alamat Lengkap</p>
                    <p className="text-gray-600 text-sm whitespace-pre-line">
                      {settings.company_address || 'Alamat belum diatur'}
                    </p>
                  </div>
                </div>

                {settings.company_phone && (
                  <div className="grid grid-cols-2 gap-4">
                    <a 
                      href={`https://wa.me/${formatPhoneForLink(settings.company_phone)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-secondary text-center py-3"
                    >
                      WhatsApp
                    </a>
                    <a 
                      href={`tel:+${formatPhoneForLink(settings.company_phone)}`}
                      className="btn-outline text-center py-3"
                    >
                      Telepon
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;