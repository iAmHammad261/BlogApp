import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgChevronRight = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="chevron-right_svg__lucide chevron-right_svg__lucide-chevron-right"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);
export default SvgChevronRight;

