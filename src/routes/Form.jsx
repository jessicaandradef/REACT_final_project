import { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Form.module.css";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const userData = {
      user_name: name,
      user_email: email,
      message: message,
    };

    emailjs
      .send(
        "service_j85t1qd",
        "template_z9a6vbp",
        userData,
        "siTfqndSuFsNDS5nY"
      )
      .then((result) => {
        console.log(result.text);
        console.log("message sent");

        setName("");
        setEmail("");
        setMessage("");
        alert("You sent your message! Thanks!");
      });
  };

  return (
    <form onSubmit={sendEmail} className={styles.form}>
      <h3>Contact me</h3>
      <label>Name</label>
      <input
        type="text"
        name="user_name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email</label>
      <input
        type="email"
        name="user_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Message</label>
      <textarea
        name="message"
        value={message}
        placeholder="Write your message here..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.btnForm}>Send</button>
    </form>
  );
};

export default Form;
