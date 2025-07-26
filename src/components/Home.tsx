import pizza from '../assets/pizzashack-home.png';

const Home = () => {
    return (
        <div style={{ height: '100vh', width: '100%', backgroundImage: `url(${pizza})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
    );
}

export default Home;
