var timeout;

// Locomotive
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// First animation
function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: "expo.inOut",
  })
    .to(".boundingelem", {
      y: 0,
      ease: "expo.inOut",
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: "expo.inOut",
    });
}

// Cursor squash (CHANGE IN SHAPE DURING MOVEMENT)
function circleChaptaKaro() {
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    gsap.to("#minicircle", {
      x: dets.clientX,
      y: dets.clientY,
      scaleX: xscale,
      scaleY: yscale,
      duration: 0.2,
      ease: "power2.out",
    });

    timeout = setTimeout(() => {
      gsap.to("#minicircle", {
        scaleX: 1,
        scaleY: 1,
        duration: 0.2,
      });
    }, 100);
  });
}

// HOVER (SMOOTH + STRONG TILT)
document.querySelectorAll(".project-card").forEach((card) => {
  const img = card.querySelector("img");

  let rotate = 0;
  let mouseX = 0;
  let mouseY = 0;

  card.addEventListener("mouseenter", () => {
    gsap.to(img, {
      opacity: 1,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(img, {
      opacity: 0,
      scale: 0.92,
      rotate: 0,
      duration: 0.25,
    });
  });

  // To prevent the image to hover over the button
  const buttons = card.querySelectorAll("a, button");

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(img, {
        opacity: 0,
        duration: 0.15,
      });
    });

    btn.addEventListener("mouseleave", () => {
      if (card.matches(":hover"))
        gsap.to(img, {
          opacity: 1,
          duration: 0.15,
        });
    });
  });

  card.addEventListener("mousemove", (e) => {
    const bounds = card.getBoundingClientRect();

    mouseX = e.clientX - bounds.left - 130;
    mouseY = e.clientY - bounds.top - 160;

    // STRONGER tilt calculation
    let diffrot = e.clientX - rotate;
    rotate = e.clientX;

    gsap.to(img, {
      left: mouseX,
      top: mouseY,
      rotate: gsap.utils.clamp(-25, 25, diffrot * 0.6), // stronger 
      duration: 0.22,
      ease: "power2.out",
    });
  });
});

//Init
circleChaptaKaro();
firstPageAnim();

if (typeof ScrollTrigger !== "undefined") {
  scroll.on("scroll", ScrollTrigger.update);
}