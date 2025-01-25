import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Importando as imagens locais
import image1 from '../assets/img/carrosel/Adubos.webp';
import image2 from '../assets/img/carrosel/Cacto1.webp';
import image3 from '../assets/img/carrosel/Cacto2.webp';
import image4 from '../assets/img/carrosel/Flor.webp';
import image5 from '../assets/img/carrosel/Suculenta1.webp';
import image6 from '../assets/img/carrosel/ZamiocucaPreta.webp';

const bannerImages = [image1, image2, image3, image4, image5, image6];

const Carousel = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            style={{ width: '100%', height: '400px' }}
        >
            {bannerImages.map((image, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={image}
                        alt={`Banner ${index + 1}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                        }}
                        className="hover:transform hover:scale-105 hover:shadow-lg"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;
