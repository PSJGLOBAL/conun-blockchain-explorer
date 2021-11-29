import logo from "../../style/images/conunLogoFooter.svg"
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
    <footer>
      <div className={style.worldCell}>
        <img
          className={style.world}
          src={worled}
          alt="The whole world as a pitcher"
        />
      </div>
      <div className={style.mainCell}>
        <img className={style.logo} src={logo} alt="Conun Logo" />
        <div>Powered by Conun</div>
        <div className={style.contactLinks}>
          <a href="https://t.me/conun_global" target="_blank" rel="noreferrer">
            <img src={tele} alt="telegram"></img>
          </a>
          <a
            href="https://www.facebook.com/conunglobal/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={face} alt="facebook"></img>
          </a>
          <a
            href="https://twitter.com/conunglobal"
            target="_blank"
            rel="noreferrer"
          >
            <img src={twit} alt="twitter"></img>
          </a>
          <a
            href="https://open.kakao.com/o/gCsycmhb"
            target="_blank"
            rel="noreferrer"
          >
            <img src={kack} alt="kakao"></img>
          </a>
          <a
            href="https://github.com/CONUN-Global/CONUN"
            target="_blank"
            rel="noreferrer"
          >
            <img src={git} alt="github"></img>
          </a>
          <a
            href="https://discord.gg/VvXvQfa3Za"
            target="_blank"
            rel="noreferrer"
          >
            <img src={disc} alt="disco"></img>
          </a>
        </div>
        <div>Conun Blockchain Explorer V.2.0.0</div>
      </div>
      <div className={style.linkCell}>
        <div className={style.title}>Company</div>
        <a
          href="https://conun.io/#overview"
          target="_blank"
          rel="noreferrer"
          className={style.link}
        >
          About Us
        </a>
        <a
          href="https://conun.io/contactus"
          target="_blank"
          rel="noreferrer"
          className={style.link}
        >
          Contact Us
        </a>
        <a
          href="https://conun.io/policy/termsandcondition"
          target="_blank"
          rel="noreferrer"
          className={style.link}
        >
          Terms of Service
        </a>
      </div>
      <div className={style.linkCell}>
        <div className={style.title}>Community</div>
        <a
          className={style.link}
          href="https://conun.io/"
          target="_blank"
          rel="noreferrer"
        >
          Main Site
        </a>
        <a
          href="https://discord.gg/VvXvQfa3Za"
          target="_blank"
          rel="noreferrer"
          className={style.link}
        >
          Discord
        </a>
      </div>
    </footer>
  )
}

export default Footer
