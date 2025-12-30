// import React from "react";
// import { css } from "@emotion/react";
// import { RingLoader } from "react-spinners";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;
// const LoadingData = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}>
//       <RingLoader color={"#615FFF"} css={override} size={150} />
//     </div>
//   );
// };

// export default LoadingData;

import React from "react";

const LoadingData = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg- bg-opacity-50 z-50">
      <div className="relative w-34 h-34">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        {/* Middle ring */}
        <div className="absolute inset-4 rounded-full border-4 border-blue-300 border-b-transparent animate-spin animation-delay-200"></div>
        {/* Inner ring */}
        <div className="absolute inset-8 rounded-full border-4 border-blue-200 border-l-transparent animate-spin animation-delay-400"></div>
      </div>
    </div>
  );
};

export default LoadingData;
