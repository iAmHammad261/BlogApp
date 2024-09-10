import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgSaveAll = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" 
    width={24}
    height={24}
    fill="none"
    stroke="white"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="save-all_svg__lucide save-all_svg__lucide-save-all"
    {...props}
  >
    <Path d="M10 2v3a1 1 0 0 0 1 1h5M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6" />
    <Path d="M18 22H4a2 2 0 0 1-2-2V6" />
    <Path d="M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z" />
  </Svg>
);
export default SvgSaveAll;

