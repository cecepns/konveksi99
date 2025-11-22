import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import SEO from '../components/Common/SEO';
import Loading from '../components/Common/Loading';
import Pagination from '../components/Common/Pagination';
import { Search, ListFilter as Filter, X } from 'lucide-react';
import { productsAPI, categoriesAPI } from '../utils/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const fetchSubcategories = useCallback(async (categoryId) => {
    try {
      const response = await categoriesAPI.getSubcategories(categoryId);
      setSubcategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubcategories([]);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getAll(
        currentPage, 
        10, 
        searchTerm, 
        selectedCategory, 
        selectedSubcategory
      );
      const { data, pagination } = response.data;
      
      setProducts(data || []);
      setTotalPages(pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory, selectedSubcategory]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory);
    } else {
      setSubcategories([]);
      setSelectedSubcategory('');
    }
  }, [selectedCategory, fetchSubcategories]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSearchTerm('');
    setSearchInput('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO 
        title="Products"
        description="Jelajahi berbagai produk industri berkualitas tinggi dari PT. Denko Wahana Sakti. Solusi terpercaya untuk kebutuhan industri Anda."
        keywords="produk industri, peralatan industri, manufaktur, solusi industri"
      />

      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 
              className="text-2xl lg:text-6xl font-bold mb-6"
              data-aos="fade-up"
            >
              Produk <span className="text-secondary-400">Kami</span>
            </h1>
            <p 
              className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              Temukan berbagai solusi industri berkualitas tinggi yang telah dipercaya 
              oleh ratusan perusahaan di seluruh Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="space-y-4">
            {/* Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex items-center space-x-2 text-gray-700">
                <Filter size={20} />
                <span className="font-medium">Filter:</span>
              </div>
              
              <div className="flex flex-wrap gap-4 flex-1">
                <div className="flex-1 min-w-[200px]">
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="input-field w-full"
                  >
                    <option value="">Semua Kategori</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <select
                    value={selectedSubcategory}
                    onChange={handleSubcategoryChange}
                    className="input-field w-full"
                    disabled={!selectedCategory}
                  >
                    <option value="">Semua Subkategori</option>
                    {subcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </div>

                {(selectedCategory || selectedSubcategory || searchTerm) && (
                  <button
                    onClick={clearFilters}
                    className="btn-outline flex items-center space-x-2 whitespace-nowrap"
                  >
                    <X size={18} />
                    <span>Hapus Filter</span>
                  </button>
                )}
              </div>
            </div>

            {/* Search Section */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-lg text-gray-600">
                {!loading && (
                  <span>
                    Menampilkan {products.length} produk 
                    {searchTerm && ` untuk "${searchTerm}"`}
                    {selectedCategory && categories.find(c => c.id == selectedCategory) && 
                      ` dalam kategori "${categories.find(c => c.id == selectedCategory).name}"`}
                    {selectedSubcategory && subcategories.find(s => s.id == selectedSubcategory) && 
                      ` - "${subcategories.find(s => s.id == selectedSubcategory).name}"`}
                  </span>
                )}
              </div>
              
              <form onSubmit={handleSearch} className="flex space-x-2 w-full md:w-auto">
                <div className="relative flex-grow md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="input-field pl-10 pr-4"
                  />
                </div>
                <button type="submit" className="btn-primary px-6">
                  Cari
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <Loading size="large" />
          ) : products.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product, index) => (
                  <div 
                    key={product.id}
                    className="card hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image || 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg'} 
                        alt={product.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                        <Link 
                          to={`/products/${product.slug}`}
                          className="btn-primary w-full text-center text-sm"
                        >
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {product.description?.replace(/<[^>]*>/g, '').slice(0, 100)}...
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                          {new Date(product.created_at).toLocaleDateString('id-ID')}
                        </span>
                        <Link 
                          to={`/products/${product.slug}`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          Selengkapnya →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Search className="text-gray-400" size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'Produk tidak ditemukan' : 'Belum ada produk'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? `Tidak ada produk yang sesuai dengan pencarian "${searchTerm}"`
                  : 'Produk akan segera ditambahkan'
                }
              </p>
              {searchTerm && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSearchInput('');
                    setCurrentPage(1);
                  }}
                  className="btn-primary"
                >
                  Lihat Semua Produk
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;