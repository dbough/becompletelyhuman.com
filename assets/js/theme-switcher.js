/* Draft-only accent picker. Safe to delete with the switcher include. */
(function () {
  var root = document.documentElement;
  var box = document.querySelector(".switcher");
  if (!box) return;

  var KEY = "ch-accent";
  var toggle = box.querySelector(".switcher__toggle");
  var panel = box.querySelector(".switcher__panel");
  var radios = box.querySelectorAll('input[name="accent"]');
  var reset = box.querySelector(".switcher__reset");
  var fallback = box.getAttribute("data-default");

  function save(value) {
    try {
      if (value) localStorage.setItem(KEY, value);
      else localStorage.removeItem(KEY);
    } catch (e) { /* storage blocked: the choice lasts until reload */ }
  }

  function apply(value) {
    root.setAttribute("data-accent", value);
    radios.forEach(function (r) { r.checked = r.value === value; });
  }

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
  }

  apply(root.getAttribute("data-accent") || fallback);

  radios.forEach(function (r) {
    r.addEventListener("change", function () {
      apply(r.value);
      save(r.value);
    });
  });

  reset.addEventListener("click", function () {
    apply(fallback);
    save(null);
  });

  toggle.addEventListener("click", function () {
    setOpen(panel.hidden);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", function (e) {
    if (!panel.hidden && !box.contains(e.target)) setOpen(false);
  });
})();
