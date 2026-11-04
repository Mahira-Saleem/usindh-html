// Icons
if (window.lucide) lucide.createIcons();

// Dark mode (remembered)
const root = document.documentElement;
if (localStorage.getItem("theme") === "dark") root.classList.add("dark");
document.getElementById("theme").onclick = () => {
  root.classList.toggle("dark");
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
};

// Mobile menu
document.getElementById("burger").onclick = () => document.getElementById("menu").classList.toggle("open");

// GSAP animations
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".h-anim", { y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out" });
  gsap.to(".hero .bg", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.utils.toArray(".reveal").forEach((el) =>
    gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } })
  );
  document.querySelectorAll(".count").forEach((el) => {
    const to = +el.dataset.to, plain = el.dataset.plain === "1", o = { v: plain ? 1900 : 0 };
    gsap.to(o, { v: to, duration: 2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: () => (el.textContent = plain ? Math.round(o.v) : Math.round(o.v).toLocaleString()) });
  });
}

// Faculty search
const fs = document.getElementById("facsearch");
if (fs) fs.oninput = () => {
  const q = fs.value.toLowerCase(); let n = 0;
  document.querySelectorAll(".fac").forEach((c) => { const m = c.textContent.toLowerCase().includes(q); c.style.display = m ? "" : "none"; n += m; });
  document.getElementById("nofac").hidden = n > 0;
};

// Fee estimator (sample figures)
const prog = document.getElementById("prog");
if (prog) {
  const calc = () => {
    const y = +document.getElementById("yrs").value;
    const total = (+prog.value + (document.getElementById("hostel").checked ? 30000 : 0)) * y;
    document.getElementById("fee").textContent = "PKR " + total.toLocaleString();
  };
  ["prog", "yrs", "hostel"].forEach((id) => document.getElementById(id).addEventListener("change", calc));
  calc();
}

// Results lookup (demo)
const rf = document.getElementById("resform");
if (rf) rf.onsubmit = (e) => { e.preventDefault(); document.getElementById("resout").textContent = "Demo: seat " + document.getElementById("seat").value + " — results will appear here once connected to the university system."; };

// Contact form (demo — connect to Formspree or similar)
const cf = document.getElementById("contactform");
if (cf) cf.onsubmit = (e) => { e.preventDefault(); document.getElementById("cout").textContent = "Thank you! (Demo — message not sent yet.)"; cf.reset(); };
