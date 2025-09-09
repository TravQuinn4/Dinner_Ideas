/* app.js — Dinner Planner
   Vanilla JS. No deps. Persists to localStorage.
*/

(() => {
  "use strict";

  // =========================
  // Data (sample cookbook)
  // qty is per-person unless otherwise stated
  // =========================
  let DISHES = [];

  async function loadDishes() {
    try {
      const res = await fetch("dishes.json");
      if (!res.ok) throw new Error("Failed to load dishes.json");
      DISHES = await res.json();
    } catch (err) {
      console.error("Error loading dishes:", err);
      DISHES = []; // fallback to empty if load fails
    }
  }




  // =========================
  // DOM
  // =========================
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const elDays = $("#days");
  const elPeople = $("#people");
  const elRandomise = $("#randomize");
  const elClearLikes = $("#clearLikes");
  const elShareList = $("#shareList");
  const elPlan = $("#plan");
  const elShoppingList = $("#shoppingList");
  const elRebuild = $("#rebuild");

  // =========================
  // State & persistence
  // =========================
  const KEYS = {
    PLAN: "dp_plan",
    LIKES: "dp_likes",
    DAYS: "dp_days",
    PEOPLE: "dp_people",
    CHECKED: "dp_checked",
    DISHES_HASH: "dp_dishes_hash" // NEW
  };

  function hashDishes(list) {
    // simple stable hash based on IDs
    return list.map(d => d.id).sort().join("|");
  }

  function ensurePlanMatchesDishes() {
    const newHash = hashDishes(DISHES);
    const oldHash = localStorage.getItem(KEYS.DISHES_HASH);
    if (oldHash && oldHash !== newHash) {
      // dishes changed — clear saved plan so we generate a fresh one
      localStorage.removeItem(KEYS.PLAN);
      state.plan = [];
    }
    localStorage.setItem(KEYS.DISHES_HASH, newHash);
  }


  const state = {
    days: 7,
    people: 1,
    plan: [], // [{day:1, dishId:"..."}]
    likes: new Set(),
    checked: new Set()
  };

  function loadState() {
    const days = parseInt(localStorage.getItem(KEYS.DAYS) || "7", 10);
    const people = parseInt(localStorage.getItem(KEYS.PEOPLE) || "1", 10);
    const plan = safeParse(localStorage.getItem(KEYS.PLAN), []);
    const likes = new Set(safeParse(localStorage.getItem(KEYS.LIKES), []));
    const checked = new Set(safeParse(localStorage.getItem(KEYS.CHECKED), []));
    state.days = clamp(days, 1, 31);
    state.people = clamp(people, 1, 12);
    state.plan = Array.isArray(plan) ? plan.filter(p => DISHES.some(d => d.id === p.dishId)) : [];
    state.likes = likes;
    state.checked = checked;
  }

  function saveState() {
    localStorage.setItem(KEYS.DAYS, String(state.days));
    localStorage.setItem(KEYS.PEOPLE, String(state.people));
    localStorage.setItem(KEYS.PLAN, JSON.stringify(state.plan));
    localStorage.setItem(KEYS.LIKES, JSON.stringify(Array.from(state.likes)));
    localStorage.setItem(KEYS.CHECKED, JSON.stringify(Array.from(state.checked)));
  }

  function safeParse(json, fallback) {
    try { return JSON.parse(json ?? ""); } catch { return fallback; }
  }

  // =========================
  // Helpers
  // =========================
  const clamp = (n, a, b) => Math.min(Math.max(n, a), b);
  const byId = id => DISHES.find(d => d.id === id);
  const formatQty = n => {
    // Avoid ugly floats
    const rounded = Math.round(n * 100) / 100;
    return (Number.isInteger(rounded) ? rounded : rounded.toFixed(2));
  };

  function randomisePlan(days, preferLikes = true) {
    const used = new Set();
    const result = [];
    const liked = DISHES.filter(d => state.likes.has(d.id));
    const pool = [...DISHES];
    shuffle(pool); // avoid bias from source order

    for (let i = 0; i < days; i++) {
      let pick = null;

      let candidates = pool.filter(d => !used.has(d.id));
      if (candidates.length === 0) {
        used.clear();
        candidates = pool.slice();
      }

      if (preferLikes && liked.length) {
        // Weighted: liked = 2x
        const weights = candidates.map(d => state.likes.has(d.id) ? 2 : 1);
        pick = weightedPick(candidates, weights);
      } else {
        // Uniform random from remaining candidates
        pick = candidates[Math.floor(Math.random() * candidates.length)];
      }

      used.add(pick.id);
      result.push({ day: i + 1, dishId: pick.id });
    }
    return result;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }


  function weightedPick(items, weights) {
    const total = weights.reduce((a, b) => a + b, 0);
    if (total <= 0) return null;
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  }

  function swapDishAt(index) {
    const used = new Set(state.plan.map(p => p.dishId));
    // Allow replacing with liked first (not already used), then any not used, then anyone
    const likedOptions = DISHES.filter(d => state.likes.has(d.id) && !used.has(d.id));
    const freshOptions = DISHES.filter(d => !used.has(d.id));
    let candidate = likedOptions[Math.floor(Math.random() * likedOptions.length)]
      || freshOptions[Math.floor(Math.random() * freshOptions.length)]
      || DISHES[Math.floor(Math.random() * DISHES.length)];
    state.plan[index].dishId = candidate.id;
    saveState();
    renderPlan();
    buildShoppingList();
  }

  // =========================
  // Rendering
  // =========================
  function renderDaysSelect() {
    elDays.innerHTML = "";
    const defaultOptions = [3, 5, 7, 10, 14, 21, 28];
    const set = new Set(defaultOptions.concat([state.days]));
    Array.from(set).sort((a, b) => a - b).forEach(n => {
      const o = document.createElement("option");
      o.value = String(n);
      o.textContent = `${n}`;
      if (n === state.days) o.selected = true;
      elDays.appendChild(o);
    });
  }

  function renderPlan() {
    // Ensure plan length matches days
    if (state.plan.length !== state.days) {
      // expand or shrink
      if (state.plan.length < state.days) {
        const extra = randomisePlan(state.days - state.plan.length, true);
        // shift their day indices to follow
        extra.forEach((p, i) => { p.day = state.plan.length + i + 1; });
        state.plan = state.plan.concat(extra);
      } else {
        state.plan = state.plan.slice(0, state.days);
      }
      // Fix day numbers
      state.plan.forEach((p, i) => p.day = i + 1);
      saveState();
    }

    elPlan.innerHTML = "";
    state.plan.forEach((p, idx) => {
      const dish = byId(p.dishId) || DISHES[0];

      const card = document.createElement("section");
      card.className = "card";
      const titleRow = document.createElement("div");
      titleRow.className = "title-row";
      const h3 = document.createElement("h3");
      h3.textContent = `Day ${p.day}`;
      const swapBtn = document.createElement("button");
      swapBtn.className = "ghost";
      swapBtn.textContent = "↔ Swap";
      swapBtn.addEventListener("click", () => swapDishAt(idx));
      titleRow.append(h3, swapBtn);

      const row = document.createElement("div");
      row.className = "dish";

      const left = document.createElement("div");
      left.innerHTML = `<div>${dish.name}</div><div class="meta">${(dish.tags || []).join(" · ")}</div>`;

      const star = document.createElement("button");
      star.className = "ghost";
      star.title = "Toggle favourite";
      const isLiked = state.likes.has(dish.id);
      star.innerHTML = isLiked ? "⭐" : "☆";
      if (isLiked) star.classList.add("fave");
      star.addEventListener("click", () => {
        toggleLike(dish.id);
        // update all stars across the plan
        renderPlan();
      });

      const actions = document.createElement("div");
      actions.className = "actions";
      actions.appendChild(star);

      row.append(left, actions);

      card.append(titleRow, row);
      elPlan.appendChild(card);
    });
  }

  function toggleLike(dishId) {
    if (state.likes.has(dishId)) state.likes.delete(dishId);
    else state.likes.add(dishId);
    saveState();
  }

  // =========================
  // Shopping list building
  // =========================
  function buildShoppingList() {
    const map = new Map(); // key: item|unit -> qty
    const keyOf = (item, unit) => `${item}__${unit}`;
    const add = (item, qty, unit) => {
      const key = keyOf(item, unit);
      map.set(key, (map.get(key) || 0) + qty);
    };

    state.plan.forEach(p => {
      const dish = byId(p.dishId);
      if (!dish) return;
      dish.ingredients.forEach(ing => {
        const qty = (ing.qty || 0) * state.people;
        add(ing.item, qty, ing.unit || "");
      });
    });

    // Render as list
    elShoppingList.innerHTML = "";
    const items = Array.from(map.entries()).map(([key, qty]) => {
      const [item, unit] = key.split("__");
      return { key, item, unit, qty };
    });

    // Sort alphabetically by item
    items.sort((a, b) => a.item.localeCompare(b.item));

    items.forEach(({ key, item, unit, qty }) => {
      const li = document.createElement("li");
      const line = `${item} — ${formatQty(qty)} ${unit}`.trim();
      li.textContent = line;
      if (state.checked.has(key)) li.classList.add("done");
      li.addEventListener("click", () => {
        li.classList.toggle("done");
        if (li.classList.contains("done")) state.checked.add(key);
        else state.checked.delete(key);
        saveState();
      });
      elShoppingList.appendChild(li);
    });
  }

  // Build share text
  function buildShareText() {
    const lines = [];
    lines.push(`🛒 Shopping List (${state.days} day${state.days > 1 ? "s" : ""}, ${state.people} person${state.people > 1 ? "s" : ""})`);
    // collect from DOM (already aggregated)
    $$("#shoppingList li").forEach(li => lines.push(`• ${li.textContent}`));
    lines.push("");
    lines.push("🍽️ Plan:");
    state.plan.forEach(p => {
      const dish = byId(p.dishId);
      lines.push(`Day ${p.day}: ${dish?.name || "—"}`);
    });
    return lines.join("\n");
  }

  async function shareOrCopy() {
    const text = buildShareText();
    try {
      if (navigator.share && isMobile()) {
        await navigator.share({ title: "Shopping List", text });
        toast("Shared!");
        return;
      }
    } catch { /* fall through to copy */ }
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch {
      // fallback: prompt
      window.prompt("Copy your list:", text);
    }
  }

  function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");
  }

  // Minimal toast
  let toastTimer = null;
  function toast(msg) {
    let t = $("#dp-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "dp-toast";
      Object.assign(t.style, {
        position: "fixed",
        left: "50%",
        bottom: "24px",
        transform: "translateX(-50%)",
        padding: "10px 14px",
        borderRadius: "12px",
        background: "rgba(0,0,0,0.75)",
        color: "#fff",
        fontSize: "14px",
        zIndex: "9999",
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        pointerEvents: "none"
      });
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.style.opacity = "0"; }, 1600);
  }

  // =========================
  // Event wiring
  // =========================
  function wireEvents() {
    // Days change
    elDays.addEventListener("change", () => {
      state.days = clamp(parseInt(elDays.value, 10) || 7, 1, 31);
      // expand/contract plan smartly
      if (state.plan.length < state.days) {
        const extra = randomisePlan(state.days - state.plan.length, true);
        extra.forEach((p, i) => { p.day = state.plan.length + i + 1; });
        state.plan = state.plan.concat(extra);
      } else if (state.plan.length > state.days) {
        state.plan = state.plan.slice(0, state.days);
      }
      // Fix day numbers
      state.plan.forEach((p, i) => p.day = i + 1);
      saveState();
      renderPlan();
      buildShoppingList();
    });

    // People change
    elPeople.addEventListener("input", () => {
      const val = clamp(parseInt(elPeople.value || "1", 10) || 1, 1, 12);
      if (val !== state.people) {
        state.people = val;
        saveState();
        buildShoppingList();
      }
    });

    // Randomise
    elRandomise.addEventListener("click", () => {
      state.plan = randomisePlan(state.days, true);
      saveState();
      renderPlan();
      buildShoppingList();
      toast("Plan randomised");
    });

    // Clear likes
    elClearLikes.addEventListener("click", () => {
      state.likes.clear();
      saveState();
      renderPlan();
      toast("Favourites cleared");
    });

    // Share / Copy
    elShareList.addEventListener("click", shareOrCopy);

    // Rebuild list
    elRebuild.addEventListener("click", () => {
      state.checked.clear();
      saveState();
      buildShoppingList();
      toast("Shopping list rebuilt");
    });
  }

  // =========================
  // Boot
  // =========================
  function firstTimePlanIfNeeded() {
    if (!state.plan || state.plan.length === 0) {
      state.plan = randomisePlan(state.days, true);
    } else {
      // Ensure day numbers are correct after load
      state.plan.forEach((p, i) => p.day = i + 1);
    }
  }

  async function init() {
    await loadDishes();  // fetch JSON before using DISHES
    loadState();
    ensurePlanMatchesDishes();

    // Populate default days options & people
    renderDaysSelect();
    elPeople.value = String(state.people);

    // Ensure we have a plan
    firstTimePlanIfNeeded();

    // Initial render
    renderPlan();
    buildShoppingList();

    // Events
    wireEvents();
  }

  // Kick off once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
