
// Externe script voor Swipe Pages sectie-flow
// Gebruik met vaste IDs: hero, prelander, surveyquestion, shortform, longform, bedanktscherm, sovendus

(function () {
  const sectionIds = [
    "hero",
    "prelander",
    "surveyquestion",
    "shortform",
    "longform",
    "bedanktscherm",
    "sovendus"
  ];

  const getSections = () => sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const visibleStack = [];

  function initFlow() {
    const sections = getSections();
    sections.forEach((section) => {
      section.style.display = (section.id === "hero" || section.id === "prelander") ? "block" : "none";
    });
    visibleStack.push("hero", "prelander");
  }

  function showNext(currentId) {
    const sections = getSections();
    const currentIndex = sections.findIndex(s => s.id === currentId);
    if (currentIndex !== -1 && currentIndex + 1 < sections.length) {
      const nextSection = sections[currentIndex + 1];
      sections.forEach(sec => sec.style.display = "none");
      nextSection.style.display = "block";
      visibleStack.push(nextSection.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initFlow();
    document.querySelectorAll(".go-next").forEach((btn) => {
      btn.addEventListener("click", function () {
        const currentSection = btn.closest("section");
        if (currentSection && currentSection.id) {
          showNext(currentSection.id);
        }
      });
    });
  });
})();
