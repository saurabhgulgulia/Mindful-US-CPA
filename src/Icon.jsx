import React from 'react';

// Icon — thin wrapper around Lucide
function Icon({ name, size = 20, color, style, className }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      ref.current.appendChild(i);
      window.lucide.createIcons({ icons: window.lucide.icons });
      // Style the rendered svg
      const svg = ref.current.querySelector("svg");
      if (svg) {
        svg.setAttribute("width", size);
        svg.setAttribute("height", size);
        svg.setAttribute("stroke-width", "1.5");
        if (color) svg.style.color = color;
      }
    }
  }, [name, size, color]);
  return <span ref={ref} className={className} style={{ display: "inline-flex", alignItems: "center", color, ...(style || {}) }} />;
}

export { Icon };
