import { useEffect } from "react";
import AOS from "aos";
import SEO from "../components/Common/SEO";
import {
  Users,
  Award,
  Target,
  Eye,
  CircleCheck as CheckCircle,
  Lightbulb,
} from "lucide-react";
import AboutImage from "../assets/about.jpg";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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

  return (
    <>
      <SEO
        title="About Us"
        description="PT. Denko Wahana Sakti - Perusahaan industri terpercaya dengan pengalaman lebih dari 15 tahun dalam menyediakan solusi industri berkualitas tinggi."
        keywords="tentang denko wahana sakti, sejarah perusahaan, visi misi, nilai perusahaan"
      />

      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1
              className="text-2xl lg:text-6xl font-bold mb-6"
              data-aos="fade-up"
            >
              Tentang <span className="text-secondary-400">Kami</span>
            </h1>
            <p
              className="text-xl lg:text-2xl text-gray-200 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Lebih dari 15 tahun menghadirkan solusi industri terbaik dengan
              dedikasi tinggi untuk kepuasan pelanggan dan kualitas yang tak
              tergoyahkan.
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
                PT. Denko Wahana Sakti
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                PT. Denko Wahana Sakti adalah perusahaan yang bergerak di bidang
                penyediaan peralatan industri dan solusi teknis untuk berbagai
                sektor industri. Sejak didirikan pada tahun 2008, kami telah
                melayani ratusan klien dari berbagai industri mulai dari
                manufaktur, otomotif, hingga energi.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Dengan lokasi strategis di Kawasan Industri de Prima Terra,
                Bandung, kami siap melayani kebutuhan industri di seluruh
                Indonesia dengan dukungan tim ahli yang berpengalaman dan
                berkomitmen tinggi.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600">Klien Terpuaskan</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-secondary-600 mb-2">
                    15+
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
              <p className="text-lg text-gray-600 leading-relaxed">
                Menjadi perusahaan perdagangan terbaik di dunia dengan
                mengutamakan kualitas dan menomorsatukan pelayanan. Become a
                world leading trading company by emphasizing quality and
                services
              </p>
            </div>

            {/* Mission */}
            <div className="card p-8" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center mb-6">
                <div className="bg-secondary-100 p-4 rounded-full mr-4">
                  <Target className="text-secondary-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Misi Kami</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Memberikan solusi terbaik kepada pelanggan melalui SDM (sumber
                daya manusia) yang berkualitas, profesional, dan sejahtera.
                Providing best solutions to customers which driven by
                professional, high quality and prosperous human resources.
              </p>
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
                Sejarah Perusahaan Group Denko
              </h3>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4">
                <p>
                  PT Denko Wahana Sakti didirikan pada Bulan November Tahun
                  1992. Berawal dari sebuah kantor di daerah Ketapang, Jakarta
                  Pusat yang bergerak dalam bisnis penjualan Turbin Ventilator,
                  Castor Wheel serta beberapa produk Material Handling.
                </p>
                <p>
                  Kemudian kantor pindah ke WISMA CORMIC di Jalan Suryopranoto
                  No. 1-9, Delta Building Blok A 4-7, Jakarta Pusat.
                </p>
                <p>
                  Pada Bulan Juli Tahun 2011, Head Quarter Denko Group (kantor
                  yang kita miliki sendiri) pindah ke Komplek Duta Merlin Blok C
                  1-3, Jalan Gajah Mada, Jakarta Pusat.
                </p>
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
