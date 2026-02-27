import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../Common/WhatsAppButton';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children || <Outlet />}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

Layout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.node,
};

export default Layout;