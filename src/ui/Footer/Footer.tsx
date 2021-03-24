import logo from "../../style/images/conun-logo-white.png"
import tele from "../../style/images/telegramIcon.png"
import face from "../../style/images/facebookIcon.png"
import twit from "../../style/images/twitterIcon.png"
import kack from "../../style/images/kakaoIcon.png"
import git from "../../style/images/githubIcon.png"
import disc from "../../style/images/discordIcon.png"
import worled from "../../style/images/world.svg"
import style from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className="textured-bkg">
      <div className={style.world}>
        <img src={worled} alt="The whole world as a pitcher" />
      </div>
      <div className={style.general}>
        <img className={style.logo} src={logo} alt="Conun Logo" />
        <div>Powered by Conun</div>
        <div className={style.contactLinks}>
          <a href="https://t.me/conun_global" target="_blank" rel="noreferrer">
            <img src={tele} alt=""></img>
          </a>
          <a
            href="https://www.facebook.com/conunglobal/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={face} alt=""></img>
          </a>
          <a
            href="https://twitter.com/conunglobal"
            target="_blank"
            rel="noreferrer"
          >
            <img src={twit} alt=""></img>
          </a>
          <a
            href="https://open.kakao.com/o/gCsycmhb"
            target="_blank"
            rel="noreferrer"
          >
            <img src={kack} alt=""></img>
          </a>
          <a
            href="https://github.com/CONUN-Global/CONUN"
            target="_blank"
            rel="noreferrer"
          >
            <img src={git} alt=""></img>
          </a>
          <a
            href="https://discord.gg/VvXvQfa3Za"
            target="_blank"
            rel="noreferrer"
          >
            <img src={disc} alt=""></img>
          </a>
        </div>
        <div>Conun Blockchain Explorer V.2.0.0</div>
      </div>

      <div className={style.internalLinks}>
        <div className={style.title}>Company</div>
        <div>
          <a
            href="https://conun.io/#overview"
            target="_blank"
            rel="noreferrer"
            className={style.link}
          >
            About Us
          </a>
        </div>
        <div>
          <a
            href="https://conun.io/contactus"
            target="_blank"
            rel="noreferrer"
            className={style.link}
          >
            Contact Us
          </a>
        </div>
        <div>
          <a
            href="https://conun.io/policy/termsandcondition"
            target="_blank"
            rel="noreferrer"
            className={style.link}
          >
            Terms of Service
          </a>
        </div>
        <div></div>
      </div>
      <div className={style.internalLinks}>
        <div className={style.title}>Community</div>
        {/* <div data-tip={"Not yet implemented"}>Developer Documentation</div> */}
        <div>
          <a
            className={style.link}
            href="https://conun.io/"
            target="_blank"
            rel="noreferrer"
          >
            Main Site
          </a>
        </div>
        <div>
          <a
            href="https://discord.gg/VvXvQfa3Za"
            target="_blank"
            rel="noreferrer"
            className={style.link}
          >
            Discord
          </a>
        </div>
        <div></div>
      </div>
      {/* <div className={style.internalLinks}>
        <div className="footer-title">Products</div>
        <div data-tip={"Not yet implemented"}>Explorer</div>
        <div data-tip={"Not yet implemented"}>Coin</div>
        <div data-tip={"Not yet implemented"}>Drive</div>
        <div data-tip={"Not yet implemented"}>Engine</div>
      </div> */}
    </footer>
  )
}

export default Footer
