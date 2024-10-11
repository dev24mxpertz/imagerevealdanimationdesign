import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import ContainerImage from "./assests/image.avif";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger , CSSRulePlugin);

const App = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const tl = gsap.timeline();

  useEffect(() => {
    const container = containerRef.current;
    const imageRevealRule = CSSRulePlugin.getRule(".img-container::after");
      container.style.visibility = "visible";
    // tl.to(containerRef.current, { css: { visibility: "visible" }, duration: 0 })
      tl.to(imageRevealRule, { width: "0%", ease: "power2.inOut", duration: 1.4 })
      .from(imageRef.current, {
        scale: 1.6,
        ease: "power2.inOut",
        duration: 1.4,
        delay: -1.4,
      });
  }, [tl]);


  return (
    <>
      <section className="main">
        <div ref={containerRef} className="container">
          <div className="img-container">
            <img src={ContainerImage} alt="ContainerImage" ref={imageRef} />
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
