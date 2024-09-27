import Tilt from "react-parallax-tilt";

interface Props {
  perspective?: number;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
  scale?: number;
  gyroscope?: boolean;
  height: number;
  width: number;
  backgroundColor: string;
  children: React.ReactNode;
}

const TiltBox: React.FC<Props> = ({
  perspective = 500,
  glareEnable = true,
  glareMaxOpacity = 0.45,
  scale = 1.02,
  gyroscope = true,
  height,
  width,
  backgroundColor,
  children,
}) => {
  return (
    <Tilt
      perspective={perspective}
      glareEnable={glareEnable}
      glareMaxOpacity={glareMaxOpacity}
      scale={scale}
      gyroscope={gyroscope}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        backgroundColor: backgroundColor,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </Tilt>
  );
};

export default TiltBox;
