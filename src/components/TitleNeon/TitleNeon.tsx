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
  size = "5rem",
  align = "center",
}: TitleNeonProps) => {
  const Tag = tag as keyof JSX.IntrinsicElements;

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
      {title.split("").map((char, index) => (
        <span key={index} aria-hidden="false">
          {char}
        </span>
      ))}
    </Tag>
  );
};

export default TitleNeon;
