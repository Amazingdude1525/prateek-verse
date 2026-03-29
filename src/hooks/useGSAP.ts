import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('[data-gsap]');
    const tweens: gsap.core.Tween[] = [];

    elements.forEach((el) => {
      const type = el.getAttribute('data-gsap');
      const baseConfig: gsap.TweenVars = {
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        duration: 1,
        ease: 'power3.out',
      };

      let tween: gsap.core.Tween | undefined;

      switch (type) {
        case 'fade-up':
          tween = gsap.from(el, { ...baseConfig, y: 60, opacity: 0 });
          break;
        case 'fade-left':
          tween = gsap.from(el, { ...baseConfig, x: -80, opacity: 0 });
          break;
        case 'fade-right':
          tween = gsap.from(el, { ...baseConfig, x: 80, opacity: 0 });
          break;
        case 'scale-in':
          tween = gsap.from(el, { ...baseConfig, scale: 0.8, opacity: 0 });
          break;
        case 'fade-in':
          tween = gsap.from(el, { ...baseConfig, opacity: 0 });
          break;
      }

      if (tween) tweens.push(tween);
    });

    ScrollTrigger.refresh();

    return () => {
      tweens.forEach(t => t.kill());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [ref]);
};
