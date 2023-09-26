import React, { ChangeEvent, useState } from "react";
import styles from "@asset/App.module.css";
import axios from "axios";

export default function ChatGPT() {
  const [prompt, setPrompt] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };
  console.log(prompt);

  const submitPrompt = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_CHAT_GPT}`,
          },
        }
      );
      console.log(data);
      setContent(data.choices[0].message.content);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={submitPrompt}>
        {/* <div className={styles.wrapper}> */}
        <textarea
          className={styles.input}
          row="3"
          onChange={onChange}
          id="prompt"
          name="prompt"
          title="prompt"
          placeholder="prompt"
        ></textarea>
        {/* </div> */}

        <button className={styles.button}>Ask GPT</button>
      </form>
      <p>{content}</p>
    </>
  );
}
