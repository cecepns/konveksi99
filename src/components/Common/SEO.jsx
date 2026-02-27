import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ 
  title = "Konveksi 99 - Jasa Konveksi Lombok Timur", 
  description = "Konveksi 99 adalah jasa konveksi, sablon, dan bordir terpercaya yang berlokasi di Jln Desa Penedagandor, Desa Penedagandor, Kec. Labuhan Haji, Lombok Timur, NTB. Melayani pembuatan seragam, kaos, dan kebutuhan konveksi lainnya.",
  keywords = "konveksi 99, jasa konveksi lombok timur, sablon kaos, bordir, seragam, konveksi labuhan haji",
  image = "/og-image.jpg",
  url = window.location.href
}) => {
  const siteTitle = "Konveksi 99";
  const fullTitle = title === siteTitle ? title : `${title} - ${siteTitle}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Indonesian" />
      <meta name="author" content="Konveksi 99" />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

export default SEO;