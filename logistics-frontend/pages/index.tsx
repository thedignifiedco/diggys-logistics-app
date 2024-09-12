import NavBar from '../components/NavBar';
import HeroBanner from '../components/HeroBanner';
import ConsingmentForm from '../components/ConsignmentForm';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <NavBar />
        <div className="container content">
            <div className="row justify-content-center">
                <div className="main col-md-8">
                    <HeroBanner />
                    <ConsingmentForm />
                </div>
            </div>
        </div>
      <Footer />
    </div>
  );
};

export default Home;
