import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const SvgClock9 = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" // Added viewBox for proper scaling
    width={24} // Adjust width as needed
    height={24} // Adjust height as needed
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="clock-9_svg__lucide clock-9_svg__lucide-clock-9"
    {...props}
  >
    <Circle cx={12} cy={12} r={10} />
    <Path d="M12 6v6H7.5" />
  </Svg>
);

export default SvgClock9;
