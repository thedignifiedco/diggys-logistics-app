import NavBar from '../components/NavBar';
import HeroBanner from '../components/HeroBanner';
import OrderForm from '../components/OrderForm';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <NavBar />
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="main col-md-8">
                    <HeroBanner />
                    <OrderForm />
                </div>
            </div>
        </div>
      <Footer />
    </div>
  );
};

export default Home;
