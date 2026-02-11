import { useEffect, useState } from "react";
import AOS from "aos";
import SEO from "../components/Common/SEO";
import Loading from "../components/Common/Loading";
import {
  Users,
  Award,
  Target,
  Eye,
  CircleCheck as CheckCircle,
  Lightbulb,
} from "lucide-react";
import { settingsAPI } from "../utils/api";
import AboutImage from "../assets/about.jpg";

const About = () => {
  const [settings, setSettings] = useState({
    company_name: '',
    company_about: '',
    company_history: '',
    company_vision: '',
    company_mission: '',
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
        company_name: settingsData.company_name || 'Belarise Clothing',
        company_about: settingsData.company_about || '',
        company_history: settingsData.company_history || '',
        company_vision: settingsData.company_vision || '',
        company_mission: settingsData.company_mission || '',
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format company_about text into paragraphs
  const formatCompanyAbout = (text) => {
    if (!text) return null;
    // Split by double newlines first (paragraphs), then by single newlines
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
    if (paragraphs.length === 0) return null;
    
    return paragraphs.map((paragraph, index) => {
      const isLast = index === paragraphs.length - 1;
      return (
        <p 
          key={index} 
          className={`text-lg text-gray-600 leading-relaxed ${isLast ? 'mb-8' : 'mb-6'}`}
        >
          {paragraph.trim().split('\n').map((line, lineIndex, lines) => (
            <span key={lineIndex}>
              {line.trim()}
              {lineIndex < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      );
    });
  };

  const values = [
    {
      icon: Award,
      title: "Quality Excellence",
      description:
        "Kami berkomitmen memberikan produk dan layanan berkualitas tinggi yang melampaui ekspektasi pelanggan.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description:
        "Kepuasan pelanggan adalah prioritas utama kami dalam setiap aspek bisnis yang kami jalankan.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Terus berinovasi dan mengadopsi teknologi terdepan untuk memberikan solusi terbaik.",
    },
    {
      icon: CheckCircle,
      title: "Integrity",
      description:
        "Menjalankan bisnis dengan integritas tinggi, transparansi, dan tanggung jawab penuh.",
    },
  ];

  const defaultCompanyHistory =
    "Belarise Clothing lahir dari kecintaan pada gaya feminin dan detail manis. Kami menghadirkan koleksi ready to wear bertema coquette outfit yang dirancang untuk membuat pemakainya merasa percaya diri di setiap momen.\n\n" +
    "Setiap koleksi Belarise diproduksi dengan material pilihan yang lembut dan nyaman dipakai seharian, dengan cutting yang flattering untuk berbagai bentuk tubuh.\n\n" +
    "Belarise menerima pembelian ecer maupun grosir untuk reseller dan butik, dengan komitmen menjaga kualitas, konsistensi warna, dan kerapian jahitan di setiap piece.";

  const defaultVision =
    "Menjadi brand fashion lokal yang menghadirkan koleksi coquette outfit yang manis, elegan, dan mudah dipadupadankan untuk perempuan Indonesia.\n\n" +
    "Belarise ingin menjadi pilihan utama untuk tampilan feminin yang nyaman dan percaya diri di setiap kesempatan.";

  const defaultMission =
    "- Menghadirkan pakaian ready to wear berbahan lembut dan nyaman dipakai seharian.\n" +
    "- Menyediakan cutting yang flattering dan ramah berbagai bentuk tubuh.\n" +
    "- Mendukung reseller dan butik melalui layanan grosir yang rapi dan konsisten.\n" +
    "- Menjaga kualitas detail, warna, dan jahitan di setiap koleksi Belarise.";

  return (
    <>
      <SEO
        title="Tentang Belarise Clothing"
        description="Belarise Clothing adalah brand fashion lokal yang menghadirkan koleksi coquette outfit ready to wear yang manis, feminin, dan nyaman untuk dikenakan sehari-hari."
        keywords="belarise clothing, about belarise, brand coquette outfit, pakaian wanita, fashion lokal"
      />

      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1
              className="text-2xl lg:text-6xl font-bold mb-6"
              data-aos="fade-up"
            >
              Tentang <span className="text-secondary-400">Belarise</span>
            </h1>
            <p
              className="text-xl lg:text-2xl text-gray-200 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Belarise Clothing menghadirkan koleksi pakaian ready to wear bertema coquette outfit yang manis, feminin, dan mudah dipadupadankan untuk berbagai momen spesialmu.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-6">
                {settings.company_name || 'Belarise Clothing'}
              </h2>
              {loading ? (
                <Loading />
              ) : (
                <>
                  {formatCompanyAbout(settings.company_about)}
                </>
              )}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600">Klien Terpuaskan</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-secondary-600 mb-2">
                    5+
                  </div>
                  <div className="text-gray-600">Tahun Pengalaman</div>
                </div>
              </div>
            </div>
            <div data-aos="fade-left">
              <div className="w-full h-96 md:h-[500px]">
                <img
                  src={AboutImage}
                  alt="PT. Denko Wahana Sakti Office"
                  className="w-full h-full object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="card p-8" data-aos="fade-up">
              <div className="flex items-center mb-6">
                <div className="bg-primary-100 p-4 rounded-full mr-4">
                  <Eye className="text-primary-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Visi Kami</h3>
              </div>
              <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {settings.company_vision || defaultVision}
              </div>
            </div>

            {/* Mission */}
            <div className="card p-8" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center mb-6">
                <div className="bg-secondary-100 p-4 rounded-full mr-4">
                  <Target className="text-secondary-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Misi Kami</h3>
              </div>
              <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {settings.company_mission || defaultMission}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Nilai-Nilai <span className="text-primary-600">Perusahaan</span>
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Nilai-nilai fundamental yang menjadi fondasi dalam setiap
              keputusan dan tindakan yang kami ambil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center card p-6 hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-primary-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <value.icon className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Perjalanan <span className="text-primary-600">Kami</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card p-8" data-aos="fade-up">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Cerita Belarise Clothing
              </h3>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4">
                {formatCompanyAbout(settings.company_history || defaultCompanyHistory)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Tim <span className="text-primary-600">Profesional</span>
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Didukung oleh tim ahli yang berpengalaman dan berkomitmen untuk
              memberikan yang terbaik bagi setiap klien.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center" data-aos="fade-up">
              <div className="bg-primary-100 p-8 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <Users className="text-primary-600" size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Manajemen Eksekutif
              </h3>
              <p className="text-gray-600">
                Tim manajemen berpengalaman dengan visi strategis untuk
                mengembangkan perusahaan.
              </p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="bg-secondary-100 p-8 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <Award className="text-secondary-600" size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tim Teknis
              </h3>
              <p className="text-gray-600">
                Engineer dan teknisi bersertifikat dengan keahlian tinggi di
                bidangnya masing-masing.
              </p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="bg-blue-100 p-8 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="text-blue-600" size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Customer Service
              </h3>
              <p className="text-gray-600">
                Tim yang responsif dan profesional dalam melayani kebutuhan dan
                pertanyaan klien.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default About;
