import LoaderKit from "react-native-loader-kit";

interface LoaderProps {
  size?: number;
}

export function Loader({ size = 48 }: LoaderProps) {
  return (
    <LoaderKit
      style={{ width: size, height: size }}
      name="BallClipRotateMultiple"
      color="#293370"
    />
  );
}
