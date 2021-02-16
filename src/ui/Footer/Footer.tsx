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
        <div>About Us</div>
        <div>Contact Us</div>
        <div>Terms of Service</div>
        <div></div>
      </div>
      <div className="footer-link-block">
        <div className="footer-title">Community</div>
        <div>Developer Documentation</div>
        <div>Main Site</div>
        <div>Discord</div>
        <div></div>
      </div>
      <div className="footer-link-block">
        <div className="footer-title">Products</div>
        <div>Explorer</div>
        <div>Coin</div>
        <div>Drive</div>
        <div>Engine</div>
      </div>
    </footer>
  )
}
