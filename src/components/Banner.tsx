import bannerImg from '../assets/images/banner1.webp';
import './Banner.css';

export function Banner() {
  return (
    <div className="banner">
      <img src={bannerImg} alt="" className="banner__image" />
    </div>
  );
}
