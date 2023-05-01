import { Fragment } from "react";
import "./TitleNeon.css";

interface TitleNeonProps {
  title: string;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  color?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
  size?: string;
  align?: "left" | "center" | "right";
}

const TitleNeon = ({
  title,
  tag,
  color = "#f6b",
  textTransform = "capitalize",
  size = "3.2rem",
  align = "center",
}: TitleNeonProps) => {
  const Tag = tag as keyof JSX.IntrinsicElements;

  const words = title.split(" ");

  return (
    <Tag
      aria-label={title}
      className="titleNeon"
      role="heading"
      style={{
        textTransform: textTransform,
        textAlign: align,
        color: color,
        fontFamily: `Yellowtail, cursive`,
        fontWeight: 400,
        fontSize: size,
        userSelect: "none",
      }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          {word.split("").map((letter, j) => (
            <span aria-hidden="true" key={`${i}  ${j}`}>
              {letter}
            </span>
          ))}{" "}
        </Fragment>
      ))}
    </Tag>
  );
};

export default TitleNeon;
