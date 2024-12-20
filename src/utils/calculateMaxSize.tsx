export const calculateMaxSize = (
  width: number,
  height: number,
  angleX: number = 20,
  angleY: number = 20
) => {
  const offsetX = (width / 2) * Math.tan((angleX * Math.PI) / 180);
  const offsetY = (height / 2) * Math.tan((angleY * Math.PI) / 180);

  return {
    width: Math.ceil(width + 2 * offsetX),
    height: Math.ceil(height + 2 * offsetY),
  };
};
