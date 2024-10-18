import Tilt from "react-parallax-tilt";

interface Props {
  children: React.ReactNode;
}

const TiltBox: React.FC<Props> = ({
  children,
}) => {
  return (
    <Tilt
      perspective={500}
      glareEnable
      glareMaxOpacity={0.45}
      scale={1.02}
      gyroscope
      style={{
        height: `500px`,
        width: `500px`,
        backgroundColor: "transparent",
        transformStyle: "preserve-3d",
        borderRadius: '1rem',
      }}
    >
      {children}
    </Tilt>
  );
};

export default TiltBox;
