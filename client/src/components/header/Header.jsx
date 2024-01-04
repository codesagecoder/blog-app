import hero from '../../assets/curtis-hystad-uc0AtPDQOEo-unsplash.jpg';
import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">The Daily</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src={hero}
        alt=""
      />
    </div>
  );
}
