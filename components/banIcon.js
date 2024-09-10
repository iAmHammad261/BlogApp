import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const SvgBan = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="white"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="ban_svg__lucide ban_svg__lucide-ban"
    {...props}
  >
    <Circle cx={12} cy={12} r={11} />
    <Path d="m4.9 4.9 14.2 14.2" />
  </Svg>
);
export default SvgBan;

