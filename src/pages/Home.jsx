import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import SEO from "../components/Common/SEO";
import {
  ArrowRight,
  CircleCheck as CheckCircle,
  Users,
  Award,
  Zap,
} from "lucide-react";
import { bannersAPI, productsAPI } from "../utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import AboutImage from "../assets/about.jpg";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    let isMounted = true;

    const fetchData = async () => {
      try {
        const [bannersRes, productsRes] = await Promise.all([
          bannersAPI.getAll(),
          productsAPI.getAll(1, 6),
        ]);

        if (isMounted) {
          setBanners(bannersRes.data.data || []);
          setFeaturedProducts(productsRes.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    { icon: Users, label: "Happy Clients", value: "500+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Zap, label: "Projects Completed", value: "1000+" },
    { icon: CheckCircle, label: "Success Rate", value: "99%" },
  ];

  return (
    <>
      <SEO
        title="Home"
        description="PT. Denko Wahana Sakti - Solusi industri terpercaya untuk kebutuhan perusahaan Anda dengan kualitas dan pelayanan terbaik."
      />

      {/* Hero Banner Section */}
      <section className="relative h-44 lg:h-[680px] bg-primary-600 overflow-hidden">
        {loading ? (
          <div className="w-full h-full bg-primary-600 flex items-center justify-center">
            <div className="text-white text-xl">Memuat banner...</div>
          </div>
        ) : banners && banners.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            className="h-full w-full"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className="relative w-full h-full">
                  <img
                    src={
                      banner.image ||
                      "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg"
                    }
                    alt={banner.title || "Banner"}
                    className="w-full h-full object-contain"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div> */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                      <div className="max-w-4xl">
                        {!!banner.title && (
                          <h1
                            className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white"
                            data-aos="fade-up"
                          >
                            {banner.title || "Solusi Industri"}{" "}
                            <span className="text-secondary-400">
                              {banner.subtitle || "Terpercaya"}
                            </span>
                          </h1>
                        )}
                        {banner.description && (
                          <p
                            className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed"
                            data-aos="fade-up"
                            data-aos-delay="200"
                          >
                            {banner.description}
                          </p>
                        )}
                        {banner.link && (
                          <div
                            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                            data-aos="fade-up"
                            data-aos-delay="400"
                          >
                            <Link
                              to={banner.link}
                              className="btn-secondary inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg"
                            >
                              <span>{banner.buttonText || "Lihat Produk"}</span>
                              <ArrowRight size={20} />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="relative bg-primary-600 text-white overflow-hidden h-full">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative container mx-auto px-4 h-full flex items-center">
              <div className="max-w-4xl">
                <h1
                  className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                  data-aos="fade-up"
                >
                  Solusi Industri{" "}
                  <span className="text-secondary-400">Terpercaya</span>
                </h1>
                <p
                  className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  PT. Denko Wahana Sakti menyediakan peralatan dan solusi
                  industri berkualitas tinggi untuk mendukung kebutuhan bisnis
                  Anda.
                </p>
                <div
                  className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <Link
                    to="/products"
                    className="btn-secondary inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg"
                  >
                    <span>Lihat Produk</span>
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-outline bg-transparent border-white text-white hover:bg-white hover:text-primary-900 inline-flex items-center justify-center px-8 py-4 text-lg"
                  >
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <stat.icon size={32} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Our{" "}
                <span className="text-primary-600">Company</span>
              </h2>
              <div className="space-y-4 mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Gedung Denko</strong> - Welcome to PT Denko Wahana Sakti. PT Denko Wahana Sakti didirikan pada Bulan November Tahun 1992. Berawal dari sebuah kantor di daerah Ketapang, Jakarta Pusat yang bergerak dalam bisnis penjualan Turbin Ventilator, Castor Wheel serta beberapa produk Material Handling.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  PT Denko Wahana Sakti sebagai Holding Company dari DENKO GROUP melakukan ekspansi dengan menambah bidang bisnis penjualan yang baru dan membuka cabang yang di Kota Surabaya pada Tahun 1994, kemudian di Kota Bandung pada Tahun 1997 dengan nama PT Denko Wahana Prima.
                </p>
              </div>
              <Link
                to="/about"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Read More</span>
                <ArrowRight size={18} />
              </Link>
            </div>
            <div data-aos="fade-left">
              <div className="w-full h-96 md:h-[600px]">
                <img
                  src={AboutImage}
                  alt="About"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divisions Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Our <span className="text-primary-600">Divisions</span>
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Kami melayani berbagai kebutuhan industri melalui divisi-divisi terpercaya kami.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Divisi Belden */}
            <div
              className="card hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <Zap size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Divisi Belden
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  PT Denko Wahana Sakti merupakan Distributor berbagai jenis kabel dengan brand &quot;Belden&quot; yang merupakan brand terkemuka di pasar kabel saat ini.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Kami menjual Kabel UTP Belden, rs485, rj45 dan rs232 Belden, Coaxial rg8 dan rg11, fiber optic belden, Patch Cord, Patch Panel, modular cat6 dan Face Plate dengan kantor di Jakarta, Surabaya dan Semarang.
                </p>
              </div>
            </div>

            {/* Divisi Material Handling */}
            <div
              className="card hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full mb-4">
                  <Award size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Divisi Material Handling
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami juga menjual berbagai produk material handling seperti Hand Pallet Truck, Manual stacker, full electric stacker, electric pallet truck, aluminium work platform, drum porter, hand truck prestar, drum handler, drum tipper, drum gripper, trolly 3 susun, hand truck, pallet truck with scale, mini forklift, vertical lift, Hand truck, scissor lift, hand stacker full electric, hand stacker manual, hand drum lift, hand drum lift semi electric, lift table, trolly, tangga elektrik, turbine ventilator, semi electric stacker, hand pallet, tangga electric, turbin ventilator, trolly, hand stacker semi electric, forklift, pallet mesh, dan hand pallet.
                </p>
              </div>
            </div>

            {/* Divisi Dalton Tools */}
            <div
              className="card hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Users size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Divisi Dalton Tools
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Kami adalah distributor hand tool, Ladder, jack equipment, dust bin, mesin las igbt, genset tiger, kunci pas, welding machine, tang, mesin las inverter, kunci ring, mesin las, dongkrak botol, water pump, generator, genset, tong sampah, dongkrak buaya dan tangga.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Produk <span className="text-primary-600">Unggulan</span>
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Temukan berbagai produk berkualitas tinggi yang telah dipercaya
              oleh ratusan perusahaan di seluruh Indonesia.
            </p>
          </div>

          {!loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="card hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        product.image ||
                        "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg"
                      }
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {product.description
                        ?.replace(/<[^>]*>/g, "")
                        .slice(0, 120)}
                      ...
                    </p>
                    <Link
                      to={`/products/${product.slug}`}
                      className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center space-x-2 group"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12" data-aos="fade-up">
            <Link
              to="/products"
              className="btn-primary inline-flex items-center space-x-2 px-8 py-4 text-lg"
            >
              <span>Lihat Semua Produk</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6" data-aos="fade-up">
            Siap untuk Memulai Proyek Anda?
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto text-primary-100"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Hubungi tim ahli kami sekarang untuk konsultasi gratis dan dapatkan
            solusi terbaik untuk kebutuhan industri Anda.
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Link
              to="/contact"
              className="btn-secondary bg-secondary-600 hover:bg-secondary-700 inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <span>Hubungi Kami</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/products"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 inline-flex items-center justify-center px-8 py-4 text-lg"
            >
              Jelajahi Produk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
