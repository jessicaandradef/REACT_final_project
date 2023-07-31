import fotoperfil from "../assets/fotoperfil.jpg";
import styles from "./Card.module.css";

const Card = () => {
  return (
    <div className={styles.cardProfile}>
      <div>
        <img className={styles.imgProfile} src={fotoperfil} alt="Profile" />
      </div>
      <div className={styles.profileBody}>
        {" "}
        <h3 className={styles.profileName}>Jéssica Andrade</h3>
        <p className={styles.profilePosition}>Fullstack web development</p>
        <p>
          I started my professional journey as a nurse, but I have always been
          curious about technology. In my constant search to be my best I
          started to rethinking about my journey and try something new to my
          transition career. I started to research and take courses about coding
          where each day I was pushed to become a better version of myself. With
          no prior coding instruction or experience, I delved into the world of
          coding wondering what it would look like in future. Learning the
          basics of a programming language was such a nice discover and after a
          few months of learning C language, HTML, CSS, and JavaScript online, I
          found myself enthusiastic about it and desired to understand more and
          more about it. Now I have continue to research and practice to expand
          my programming abilities. I'm currently deepening my knowledge in
          React and starting with backend. Personally, I can proudly say I'm a
          fast-learner, organized, detail-oriented and responsible 👩🏽‍💻👩🏽‍💻👩🏽‍💻
        </p>
        <br></br>
        <p>
          If you would like to have a coffee chat, feel free to please contact
          me.
        </p>
      </div>
    </div>
  );
};

export default Card;
