// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import CSSRulePlugin from "gsap/CSSRulePlugin";
// import ContainerImage from "./assests/image.avif";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger , CSSRulePlugin);

// const App = () => {
//   const containerRef = useRef(null);
//   const imageRef = useRef(null);
//   const tl = gsap.timeline();

//   useEffect(() => {
//     const container = containerRef.current;
//     const imageRevealRule = CSSRulePlugin.getRule(".img-container::after");
//       container.style.visibility = "visible";
//     // tl.to(containerRef.current, { css: { visibility: "visible" }, duration: 0 })
//       tl.to(imageRevealRule, { width: "0%", ease: "power2.inOut", duration: 1.4 })
//       .from(imageRef.current, {
//         scale: 1.6,
//         ease: "power2.inOut",
//         duration: 1.4,
//         delay: -1.4,
//       });
//   }, [tl]);

//   return (
//     <>
//       <section className="main">
//         <div ref={containerRef} className="container">
//           <div className="img-container">
//             <img src={ContainerImage} alt="ContainerImage" ref={imageRef} />
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default App;


import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ContainerImage from "./assests/image.avif";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    // Make the container visible
    container.style.visibility = "visible";

    // GSAP animation for the image reveal, defined inside useEffect to avoid re-creation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container, // or section/main, adjust to where the animation should happen
        start: "top center",
        once: true, // ensures the animation only runs once
      },
    });

    tl.to(overlay, { width: "0%", ease: "power2.inOut", duration: 1.4 }).from(
      imageRef.current,
      {
        scale: 1.6,
        ease: "power2.inOut",
        duration: 1,
        delay: -1.4,
      }
    );

    // Cleanup function to kill the timeline when the component unmounts
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <section className="main">
        <div ref={containerRef} className="container">
          <div className="img-container">
            <div ref={overlayRef} className="img-overlay"></div>
            <img src={ContainerImage} alt="ContainerImage" ref={imageRef} />
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
