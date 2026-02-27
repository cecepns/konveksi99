import { useState } from 'react';
import { Search, ListChecks, Clock, User, Phone, MapPin, FileText } from 'lucide-react';
import SEO from '../components/Common/SEO';
import { ordersAPI } from '../utils/api';

const OrderStatus = () => {
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await ordersAPI.getProgressPublic(identifier.trim());
      setResult(response.data?.data || null);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Order tidak ditemukan. Pastikan ID / Kode Order yang Anda masukkan sudah benar.');
      } else {
        setError('Terjadi kesalahan saat mengambil data. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (value) => {
    if (!value) return '-';
    try {
      return new Date(value).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return value;
    }
  };

  return (
    <>
      <SEO
        title="Cek Status Pesanan - Konveksi 99"
        description="Cek status pesanan konveksi Anda di Konveksi 99 dengan memasukkan ID / Kode Order yang diberikan oleh admin."
        keywords="status pesanan konveksi, cek order konveksi, tracking pesanan jahit, konveksi 99"
      />

      {/* Hero */}
      <section className="bg-primary-700 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4" data-aos="fade-up">
              Cek <span className="text-secondary-300">Status Pesanan</span>
            </h1>
            <p
              className="text-lg lg:text-xl text-primary-100"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Masukkan ID / Kode Order yang Anda terima dari admin Konveksi 99 untuk melihat
              progres pengerjaan pesanan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Form & Result */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8" data-aos="fade-up">
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                ID / Kode Order
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="input-field pl-10"
                    placeholder="Contoh: K99-20250217-001 atau 123"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary min-w-[140px] flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Mencari...</span>
                    </>
                  ) : (
                    <>
                      <Search size={18} />
                      <span>Cek Status</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500">
                ID / Kode Order biasanya tertera pada nota atau dikirim melalui WhatsApp oleh admin.
              </p>
            </form>

            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-8 space-y-6">
                {/* Order summary */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Kode Order
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {result.order.order_code || `#${result.order.id}`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Status</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {result.order.status || 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-primary-600" />
                        <span>{result.order.customer_name}</span>
                      </div>
                      {result.order.customer_phone && (
                        <div className="flex items-center space-x-2">
                          <Phone size={16} className="text-primary-600" />
                          <span>{result.order.customer_phone}</span>
                        </div>
                      )}
                      {result.order.customer_address && (
                        <div className="flex items-start space-x-2">
                          <MapPin size={16} className="text-primary-600 mt-0.5" />
                          <span className="whitespace-pre-line">
                            {result.order.customer_address}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-primary-600" />
                        <span>Dibuat: {formatDateTime(result.order.created_at)}</span>
                      </div>
                      {result.order.notes && (
                        <div className="flex items-start space-x-2">
                          <FileText size={16} className="text-primary-600 mt-0.5" />
                          <span className="whitespace-pre-line">
                            {result.order.notes}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress timeline */}
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <ListChecks size={18} className="text-primary-600" />
                    <span>Riwayat Progress</span>
                  </h2>

                  {result.progress && result.progress.length > 0 ? (
                    <div className="space-y-4">
                      {result.progress.map((item) => (
                        <div key={item.id} className="flex space-x-4 items-start">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-primary-600" />
                            <div className="flex-1 w-px bg-gray-200 mt-1" />
                          </div>
                          <div className="flex-1 pb-2">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-semibold text-gray-900">
                                {item.status || 'Update Progress'}
                              </p>
                              <span className="text-xs text-gray-500">
                                {formatDateTime(item.created_at)}
                              </span>
                            </div>
                            {item.description && (
                              <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Belum ada riwayat progress yang tercatat untuk pesanan ini. Silakan
                      hubungi admin jika Anda membutuhkan konfirmasi lebih lanjut.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderStatus;

