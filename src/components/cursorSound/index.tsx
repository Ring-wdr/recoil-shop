import { MouseEvent } from "react";

export const CursorSound = (Component: (...args: any) => JSX.Element) =>
  function HocCursor(props: any) {
    const makeSound = (e: MouseEvent) => {
      if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
        console.error("cannot use tts api");
        return;
      }
      const text = new SpeechSynthesisUtterance(
        e.currentTarget.textContent || ""
      );
      const voices = window.speechSynthesis
        .getVoices()
        .filter(({ lang }) => lang.slice(0, 2) === "en");
      if (voices.length === 0) return;
      const rand = Math.floor(Math.random() * (voices.length - 1));
      if (rand !== -1) {
        text.voice = voices[rand];
        text.lang = voices[rand].lang;
        window.speechSynthesis.speak(text);
      }
    };
    return (
      <Component {...props} onMouseEnter={makeSound}>
        {props.children}
      </Component>
    );
  };
