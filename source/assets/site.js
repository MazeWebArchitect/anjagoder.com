"use strict";
const siteRoot = new URL("../", document.currentScript.src),
  config = window.siteConfig || {};
function status(e, t) {
  e.querySelector(".form-status").textContent = t;
}
let botpoisonLoading;
function loadBotpoison() {
  return (botpoisonLoading ||= new Promise((e, t) => {
    const o = document.createElement("script");
    ((o.src = "https://unpkg.com/@botpoison/browser"),
      (o.onload = () => e(window.Botpoison)),
      (o.onerror = () => {
        ((botpoisonLoading = null),
          o.remove(),
          t(new Error("Unable to load spam protection.")));
      }),
      document.head.append(o));
  }));
}
const contact = document.querySelector("#contact-form");
(contact?.addEventListener("submit", async (e) => {
  if ((e.preventDefault(), !contact.reportValidity())) return;
  if (!config.formsparkFormId || !config.botpoisonPublicKey)
    return void status(
      contact,
      "The contact form is not available yet. Please email info@anjagoder.com.",
    );
  const t = contact.querySelector("button");
  if (!t.disabled) {
    ((t.disabled = !0), status(contact, "Sending your message…"));
    try {
      const e = await loadBotpoison(),
        { solution: t } = await new e({
          publicKey: config.botpoisonPublicKey,
        }).challenge();
      if (
        !(
          await fetch(
            "https://submit-form.com/" +
              encodeURIComponent(config.formsparkFormId),
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                ...Object.fromEntries(new FormData(contact)),
                _botpoison: t,
              }),
              signal: AbortSignal.timeout(3e4),
            },
          )
        ).ok
      )
        throw new Error("Submission failed");
      (contact.reset(),
        status(contact, "Thank you. Your message has been sent."));
    } catch {
      status(
        contact,
        "Your message could not be sent. Please try again or email info@anjagoder.com.",
      );
    } finally {
      t.disabled = !1;
    }
  }
}),
  document.querySelectorAll("[data-newsletter]").forEach((e) => {
    if (config.mailchimpAction)
      try {
        const t = new URL(config.mailchimpAction);
        "https:" === t.protocol &&
          /\.list-manage\.com$/.test(t.hostname) &&
          ((e.action = t.href),
          (e.target = "_blank"),
          (e.rel = "noopener noreferrer"));
      } catch {}
    e.addEventListener("submit", (t) => {
      "#" === e.getAttribute("action") &&
        (t.preventDefault(),
        status(
          e,
          "Newsletter signup is not available yet. Please check back soon.",
        ));
    });
  }),
  document.querySelectorAll('a[href="javascript:void(0)"]').forEach((e) => {
    (e.setAttribute("role", "button"),
      e.textContent.trim() ||
        e.setAttribute(
          "aria-label",
          /prev|left/.test(e.className)
            ? "Previous image"
            : /next|right/.test(e.className)
              ? "Next image"
              : "Gallery control",
        ),
      e.addEventListener("keydown", (t) => {
        " " === t.key && (t.preventDefault(), e.click());
      }));
  }),
  document.querySelectorAll(".anja_goder_search_form").forEach((e) => {
    (e.querySelector("[onclick]")?.removeAttribute("onclick"),
      e
        .querySelector(".anja_goder_icon_search")
        ?.addEventListener("click", () => e.requestSubmit()));
  }));
const results = document.querySelector("#search-results");
if (results) {
  const e = new URLSearchParams(location.search).get("s")?.trim() || "";
  ((document.querySelector("#search-query").value = e),
    e &&
      fetch(new URL("assets/search.json", siteRoot))
        .then((e) => {
          if (!e.ok) throw new Error();
          return e.json();
        })
        .then((t) => {
          const o = t.filter((t) =>
            (t.title + " " + t.text)
              .toLocaleLowerCase()
              .includes(e.toLocaleLowerCase()),
          );
          results.textContent = o.length ? "" : "No matching pages found.";
          for (const e of o) {
            const t = document.createElement("p"),
              o = document.createElement("a");
            ((o.href = new URL(e.url, siteRoot).href),
              (o.textContent = e.title),
              t.append(o),
              results.append(t));
          }
        })
        .catch(() => {
          results.textContent = "Search is unavailable. Please try again.";
        }));
}
const oldMobileToggle = document.querySelector(
    ".anja_goder_menu_toggler_mobile",
  ),
  mobilePanel = document.querySelector(".anja_goder_mobile_menu_wrapper");
if (oldMobileToggle && mobilePanel) {
  const t = document.createElement("button");
  ((t.type = "button"),
    (t.className = oldMobileToggle.className),
    (t.innerHTML =
      '<span class="mobile-menu-icon" aria-hidden="true"><span></span><span></span><span></span></span><span class="mobile-menu-label">Menu</span>'),
    oldMobileToggle.replaceWith(t),
    (mobilePanel.id = "mobile-navigation"));
  const o = mobilePanel.querySelector(".anja_goder_social_icons_mobile");
  (o && mobilePanel.append(o), t.setAttribute("aria-controls", mobilePanel.id));
  const n = mobilePanel.querySelector("nav");
  n?.setAttribute("aria-label", "Main navigation");
  const a = t.closest("header");
  function r(e, o = !1) {
    ((mobilePanel.hidden = !e),
      mobilePanel.classList.toggle("is-open", e),
      a.classList.toggle("anja_goder_menu_opened", e),
      t.setAttribute("aria-expanded", String(e)),
      (t.querySelector(".mobile-menu-label").textContent = e
        ? "Close"
        : "Menu"),
      t.setAttribute(
        "aria-label",
        e ? "Close navigation menu" : "Open navigation menu",
      ),
      o && t.focus());
  }
  (r(!1),
    t.addEventListener("click", () => r(mobilePanel.hidden)),
    t.addEventListener("keydown", (e) => {
      "ArrowDown" === e.key &&
        (e.preventDefault(), r(!0), n?.querySelector("a")?.focus());
    }),
    a.addEventListener("keydown", (e) => {
      "Escape" !== e.key ||
        mobilePanel.hidden ||
        (e.preventDefault(), r(!1, !0));
    }),
    mobilePanel
      .querySelectorAll("a")
      .forEach((e) => e.addEventListener("click", () => r(!1))),
    matchMedia("(max-width: 1200px)").addEventListener("change", () => r(!1)));
}
