import ReactTooltip from "react-tooltip"
import "./Footer.css"

export const Footer = () => {
  return (
    <footer className="textured-bkg">
      <div className="footer-misc-block">
        <div>Powered by Conun</div>
        <div>Conun is very good and you should too.</div>
      </div>
      <div className="footer-link-block">
        <div className="footer-title">Company</div>
        <div data-tip={"Not yet implemented"}>About Us</div>
        <div data-tip={"Not yet implemented"}>Contact Us</div>
        <div data-tip={"Not yet implemented"}>Terms of Service</div>
        <div></div>
      </div>
      <div className="footer-link-block">
        <div className="footer-title">Community</div>
        <div data-tip={"Not yet implemented"}>Developer Documentation</div>
        <div data-tip={"Not yet implemented"}>Main Site</div>
        <div data-tip={"Not yet implemented"}>Discord</div>
        <div></div>
      </div>
      <div className="footer-link-block">
        <div className="footer-title">Products</div>
        <div data-tip={"Not yet implemented"}>Explorer</div>
        <div data-tip={"Not yet implemented"}>Coin</div>
        <div data-tip={"Not yet implemented"}>Drive</div>
        <div data-tip={"Not yet implemented"}>Engine</div>
      </div>
      <ReactTooltip />
    </footer>
  )
}
