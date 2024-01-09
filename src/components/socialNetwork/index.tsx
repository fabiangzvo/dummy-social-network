import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";

import style from "./style.module.css";

function SocialNetwork() {
  return (
    <div className={style.container}>
      <a
        href="https://www.linkedin.com/in/fabiangzvo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="linkedin"
      >
        <FaLinkedin className="cursor-pointer text-text" />
      </a>
      <a
        href="https://twitter.com/fabiangzvo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="twitter"
      >
        <FaXTwitter className="cursor-pointer text-text" />
      </a>
      <a
        href="https://github.com/fabiangzvo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="github"
      >
        <FaGithub className="cursor-pointer text-text" />
      </a>
    </div>
  );
}

export default SocialNetwork;
