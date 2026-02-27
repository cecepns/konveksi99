import { useState, useEffect, useCallback } from 'react';
import AOS from 'aos';
import {
  Plus,
  Edit,
  Search,
  X,
  Save,
  ListChecks,
  Clock,
  User,
  Phone,
  MapPin,
  FileText,
} from 'lucide-react';
import { ordersAPI } from '../../utils/api';
import Pagination from '../../components/Common/Pagination';

const defaultOrderForm = {
  order_code: '',
  customer_name: '',
  customer_phone: '',
  customer_address: '',
  notes: '',
  status: 'pending',
};

const defaultProgressForm = {
  status: '',
  description: '',
};

const statusLabels = {
  pending: 'Pending',
  proses: 'Dalam Proses',
  selesai: 'Selesai',
  batal: 'Dibatalkan',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderForm, setOrderForm] = useState(defaultOrderForm);
  const [savingOrder, setSavingOrder] = useState(false);

  const [showProgressModal, setShowProgressModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [progressList, setProgressList] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [progressForm, setProgressForm] = useState(defaultProgressForm);
  const [savingProgress, setSavingProgress] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ordersAPI.getAllAdmin(currentPage, 10, searchTerm);
      const { data, pagination } = response.data;

      setOrders(data || []);
      setTotalPages(pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openOrderModal = (order = null) => {
    if (order) {
      setEditingOrder(order);
      setOrderForm({
        order_code: order.order_code || '',
        customer_name: order.customer_name || '',
        customer_phone: order.customer_phone || '',
        customer_address: order.customer_address || '',
        notes: order.notes || '',
        status: order.status || 'pending',
      });
    } else {
      setEditingOrder(null);
      setOrderForm(defaultOrderForm);
    }
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
    setEditingOrder(null);
    setOrderForm(defaultOrderForm);
  };

  const handleOrderFormChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setSavingOrder(true);

    try {
      const payload = {
        order_code: orderForm.order_code || undefined,
        customer_name: orderForm.customer_name,
        customer_phone: orderForm.customer_phone || undefined,
        customer_address: orderForm.customer_address || undefined,
        notes: orderForm.notes || undefined,
        status: orderForm.status || undefined,
      };

      if (editingOrder) {
        await ordersAPI.updateAdmin(editingOrder.id, payload);
      } else {
        await ordersAPI.createAdmin(payload);
      }

      await fetchOrders();
      closeOrderModal();
      alert(editingOrder ? 'Order berhasil diperbarui.' : 'Order baru berhasil dibuat.');
    } catch (error) {
      console.error('Error saving order:', error);
      alert(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan order.');
    } finally {
      setSavingOrder(false);
    }
  };

  const openProgressModal = async (order) => {
    setSelectedOrder(order);
    setShowProgressModal(true);
    setLoadingProgress(true);
    setProgressForm(defaultProgressForm);

    try {
      const response = await ordersAPI.getByIdAdmin(order.id);
      const payload = response.data?.data || {};
      setProgressList(payload.progress || []);
      // Sinkronkan data order terbaru jika ada
      if (payload.order) {
        setSelectedOrder(payload.order);
      }
    } catch (error) {
      console.error('Error fetching order progress:', error);
      setProgressList([]);
    } finally {
      setLoadingProgress(false);
    }
  };

  const closeProgressModal = () => {
    setShowProgressModal(false);
    setSelectedOrder(null);
    setProgressList([]);
    setProgressForm(defaultProgressForm);
  };

  const handleProgressFormChange = (e) => {
    const { name, value } = e.target;
    setProgressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProgressSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    if (!progressForm.status && !progressForm.description) {
      alert('Isi minimal status atau deskripsi progress.');
      return;
    }

    setSavingProgress(true);
    try {
      const response = await ordersAPI.addProgressAdmin(selectedOrder.id, {
        status: progressForm.status || undefined,
        description: progressForm.description || undefined,
      });

      const newProgress = response.data?.data;
      if (newProgress) {
        setProgressList((prev) => [...prev, newProgress]);
      }

      // Kosongkan form setelah berhasil
      setProgressForm(defaultProgressForm);

      // Refresh daftar order supaya kolom status ikut terupdate
      await fetchOrders();
    } catch (error) {
      console.error('Error adding progress:', error);
      alert(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan progress.');
    } finally {
      setSavingProgress(false);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center" data-aos="fade-up">
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
        <button
          onClick={() => openOrderModal()}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Buat Order</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari berdasarkan kode order, nama pelanggan, atau nomor telepon..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button type="submit" className="btn-primary">
            Cari
          </button>
        </form>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="fade-up">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        ) : orders.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pelanggan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dibuat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">
                            {order.order_code || `#${order.id}`}
                          </span>
                          {order.notes && (
                            <span className="text-xs text-gray-500 line-clamp-2">
                              {order.notes}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{order.customer_name}</div>
                        <div className="text-xs text-gray-500">
                          {order.customer_phone || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                          ${
                            order.status === 'selesai'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.status === 'batal'
                              ? 'bg-red-100 text-red-800'
                              : order.status === 'proses'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {statusLabels[order.status] || order.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDateTime(order.created_at)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => openProgressModal(order)}
                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100"
                          >
                            <ListChecks size={14} className="mr-1" />
                            Progress
                          </button>
                          <button
                            onClick={() => openOrderModal(order)}
                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            <Edit size={14} className="mr-1" />
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-2">Belum ada data order.</p>
            <p className="text-sm text-gray-400">
              Klik tombol &quot;Buat Order&quot; untuk membuat pesanan baru pertama Anda.
            </p>
          </div>
        )}
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingOrder ? 'Edit Order' : 'Buat Order Baru'}
              </h2>
              <button
                onClick={closeOrderModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kode Order (opsional)
                  </label>
                  <input
                    type="text"
                    name="order_code"
                    value={orderForm.order_code}
                    onChange={handleOrderFormChange}
                    className="input-field"
                    placeholder="Jika dikosongkan akan dibuat otomatis (mis. K99-20250217-001)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={orderForm.status}
                    onChange={handleOrderFormChange}
                    className="input-field"
                  >
                    <option value="pending">Pending</option>
                    <option value="proses">Dalam Proses</option>
                    <option value="selesai">Selesai</option>
                    <option value="batal">Dibatalkan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Pelanggan *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    value={orderForm.customer_name}
                    onChange={handleOrderFormChange}
                    className="input-field"
                    placeholder="Nama pelanggan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    name="customer_phone"
                    value={orderForm.customer_phone}
                    onChange={handleOrderFormChange}
                    className="input-field"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat
                </label>
                <textarea
                  name="customer_address"
                  rows={3}
                  value={orderForm.customer_address}
                  onChange={handleOrderFormChange}
                  className="input-field resize-none"
                  placeholder="Alamat pengiriman / alamat pelanggan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detail Pesanan / Catatan
                </label>
                <textarea
                  name="notes"
                  rows={4}
                  value={orderForm.notes}
                  onChange={handleOrderFormChange}
                  className="input-field resize-none"
                  placeholder="Contoh: Seragam sekolah 30 pcs, bahan katun, ukuran S-XL, sablon 1 warna."
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeOrderModal}
                  className="btn-outline"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingOrder}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  {savingOrder ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>{editingOrder ? 'Simpan Perubahan' : 'Buat Order'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Progress Modal */}
      {showProgressModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                  <ListChecks size={20} className="text-primary-600" />
                  <span>Progress Pesanan</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Kode: {selectedOrder.order_code || `#${selectedOrder.id}`} ·{' '}
                  {selectedOrder.customer_name}
                </p>
              </div>
              <button
                onClick={closeProgressModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order summary */}
              <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-primary-600" />
                    <span className="font-medium">{selectedOrder.customer_name}</span>
                  </div>
                  {selectedOrder.customer_phone && (
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-primary-600" />
                      <span>{selectedOrder.customer_phone}</span>
                    </div>
                  )}
                  {selectedOrder.customer_address && (
                    <div className="flex items-start space-x-2">
                      <MapPin size={16} className="text-primary-600 mt-0.5" />
                      <span className="whitespace-pre-line">
                        {selectedOrder.customer_address}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-primary-600" />
                    <span>Dibuat: {formatDateTime(selectedOrder.created_at)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Status saat ini</span>
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                        ${
                          selectedOrder.status === 'selesai'
                            ? 'bg-emerald-100 text-emerald-800'
                            : selectedOrder.status === 'batal'
                            ? 'bg-red-100 text-red-800'
                            : selectedOrder.status === 'proses'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {statusLabels[selectedOrder.status] ||
                          selectedOrder.status ||
                          'Pending'}
                      </span>
                    </div>
                  </div>
                  {selectedOrder.notes && (
                    <div className="flex items-start space-x-2">
                      <FileText size={16} className="text-primary-600 mt-0.5" />
                      <span className="whitespace-pre-line text-gray-700">
                        {selectedOrder.notes}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress list */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Riwayat Progress
                </h3>
                {loadingProgress ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                  </div>
                ) : progressList.length > 0 ? (
                  <div className="space-y-4">
                    {progressList.map((item) => (
                      <div
                        key={item.id}
                        className="flex space-x-4 items-start"
                      >
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
                    Belum ada riwayat progress untuk pesanan ini.
                  </p>
                )}
              </div>

              {/* Add progress form */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Tambah Progress Baru
                </h3>
                <form
                  onSubmit={handleProgressSubmit}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Judul / Status Progress
                      </label>
                      <input
                        type="text"
                        name="status"
                        value={progressForm.status}
                        onChange={handleProgressFormChange}
                        className="input-field"
                        placeholder='Contoh: "Desain disetujui", "Sedang proses jahit", dll.'
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={progressForm.description}
                      onChange={handleProgressFormChange}
                      className="input-field resize-none"
                      placeholder="Tambahkan catatan detail mengenai progres pesanan."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={savingProgress}
                      className="btn-primary inline-flex items-center space-x-2"
                    >
                      {savingProgress ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Menyimpan...</span>
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          <span>Simpan Progress</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

