import bannerImg from '../assets/images/banner1.webp';
import './Banner.css';

export function Banner() {
  return (
    <div className="banner">
      <div className="banner__crop">
        <img src={bannerImg} alt="" className="banner__image" />
      </div>
    </div>
  );
}
