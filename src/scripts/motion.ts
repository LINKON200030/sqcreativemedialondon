/**
 * Scroll reveals, pointer-driven 3D tilt and scroll-linked depth.
 *
 * Built on framer-motion's *vanilla* DOM entry point (`framer-motion/dom`)
 * rather than the React one. There is no UI framework on this site and nothing
 * hydrates — this module reads the finished HTML and adds behaviour to it, so
 * the library stays out of the critical path in its own lazily-imported chunk.
 *
 * Base.astro imports it only when the visitor has not asked for reduced motion
 * and is not on Save-Data, so nobody who would not see the effects pays for the
 * download. Everything here is additive: the page is complete, readable and
 * fully laid out before a single frame runs.
 *
 * The matching CSS is the "motion and depth" block at the foot of pages.css.
 *
 * `animate` is deliberately the *mini* animator. It hands keyframes straight to
 * the Web Animations API, which halves the chunk (24 kB → 12 kB gzipped) and
 * runs opacity and transform on the compositor instead of the main thread. The
 * cost is that it takes real CSS properties, so transforms are written as whole
 * `transform` strings rather than as `y` / `rotateX` / `scale` separately.
 */
import { animate } from 'framer-motion/dom/mini';
import { hover, inView, motionValue, press, scroll, springValue, stagger } from 'framer-motion/dom';

const root = document.documentElement;

/** One spring for everything that follows the pointer, so the site feels of a piece. */
const SPRING = { stiffness: 230, damping: 26, mass: 0.6 };

/**
 * Containers whose children rise into view one after another, as
 * `[container, child]`. Selectors rather than markup attributes: the templates
 * stay untouched, and a new page built from the existing components animates
 * without being told to.
 */
const GROUPS: [container: string, items: string][] = [
  ['.bento', '.svc'],
  ['.highlights', 'li'],
  ['.steps', 'li'],
  ['.cases', '.case'],
  ['.area-grid', '.area-card'],
  ['.price-grid', '.price-card'],
  ['.local-facts', '.fact'],
  ['.trust-row', 'li'],
  ['.svc-detail', 'article'],
  ['.faq', 'details'],
  ['.nearby', 'li'],
];

/** Elements that rise on their own. */
const SINGLES = '.section-head, .cta-band, .enquiry, .aside-card, .section-more, .price-note';

/**
 * Cards that tilt towards the pointer, as `[selector, degrees, lift]`.
 * Degrees are deliberately small — past about eight the text starts to look
 * bent rather than the card looking solid.
 */
const TILTS: [selector: string, degrees: number, lift: number][] = [
  ['.svc', 4, -6],
  ['.price-card', 5, -8],
  ['.area-card', 6, -5],
  ['.fact', 4, -4],
  ['.aside-card', 4, -4],
  ['.cta-band', 2, -3],
  ['.case .device', 7, -6],
];

/**
 * An element this far down the viewport has not been painted yet, so giving it
 * a hidden first frame cannot flash. Anything already on screen — the hero, and
 * whatever sits under it on a tall display — is left exactly as it was served.
 */
const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.9;

/** The hidden first frame, matching the `[data-reveal]` rule in pages.css. */
const HIDDEN = 'perspective(900px) translateY(26px) rotateX(-7deg) scale(0.975)';
const SETTLED = 'perspective(900px) translateY(0) rotateX(0deg) scale(1)';

/**
 * Rise, fade and straighten up out of the page.
 *
 * `data-reveal` comes off before the animation starts rather than after it
 * finishes. A WAAPI animation does not write to the element's style, so when it
 * ends the element falls back to whatever CSS says — and if CSS still said
 * "hidden" at that moment there would be a frame of flicker. This way the
 * stylesheet's resting state is the finished state from the outset, and the
 * animation is the only thing describing the hidden frame.
 *
 * Both keyframes list the same transform functions in the same order, which is
 * what lets the browser interpolate them component by component.
 */
function reveal(el: HTMLElement, delay: number) {
  if (!below(el)) return;
  el.dataset.reveal = '';

  let played = false;
  let stop: VoidFunction | undefined;

  const play = () => {
    if (played) return;
    played = true;
    stop?.();

    el.removeAttribute('data-reveal');
    const playing = animate(
      el,
      { opacity: [0, 1], transform: [HIDDEN, SETTLED] },
      { duration: 0.7, delay, ease: [0.16, 0.84, 0.24, 1] },
    );

    /**
     * Give the element back to the stylesheet, which takes both of these.
     *
     * A finished Web Animation keeps applying its last keyframe — it fills, and
     * an animation outranks every CSS rule however specific. Left attached, the
     * reveal would pin `transform` forever and a card that had been revealed
     * could never tilt. The mini animator also writes that last keyframe to
     * inline style as it finishes, deliberately, to avoid a flash in Firefox as
     * the fill comes off; that inline value outranks the tilt rule too.
     *
     * Dropping both is invisible — what they hold is what CSS says anyway.
     *
     * The timer is not belt and braces for its own sake: a document timeline
     * stops while its tab is in the background, and an animation that is
     * frozen mid-flight never settles its promise. Releasing on a wall clock
     * means the worst case is a card that is simply already in place when the
     * visitor comes back to the tab.
     */
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      playing.cancel();
      el.style.transform = '';
      el.style.opacity = '';
    };

    playing.then(release);
    setTimeout(release, (delay + 0.7) * 1000 + 120);
  };

  stop = inView(el, play, { margin: '0px 0px -10% 0px' });
  if (played) stop();
}

function setUpReveals() {
  const step = stagger(0.07);

  for (const [container, child] of GROUPS) {
    for (const group of document.querySelectorAll<HTMLElement>(container)) {
      const items = [...group.querySelectorAll<HTMLElement>(child)].filter((el) => el.parentElement === group);
      items.forEach((el, i) => reveal(el, step(i, items.length)));
    }
  }

  for (const el of document.querySelectorAll<HTMLElement>(SINGLES)) reveal(el, 0);
}

/**
 * Tilt a card towards the pointer, with its shadow and a soft sheen moving to
 * match. The rotation is written to custom properties and composed by CSS, so a
 * single transform covers the tilt, the lift and the depth instead of several
 * rules fighting over `transform`.
 *
 * The case-study devices already sit at a fixed angle in the original design.
 * That angle is read back out of `--rx`/`--ry` and used as the resting
 * position, so they keep their look and tilt from there.
 */
function setUpTilt(el: HTMLElement, degrees: number, lift: number) {
  const css = getComputedStyle(el);
  const baseX = Number.parseFloat(css.getPropertyValue('--rx')) || 0;
  const baseY = Number.parseFloat(css.getPropertyValue('--ry')) || 0;

  /** A spring-followed value, written straight into a custom property. */
  const prop = (name: string, from: number, unit: string, mirror?: string) => {
    const value = motionValue(from);
    const write = (v: number) => {
      el.style.setProperty(name, `${v.toFixed(2)}${unit}`);
      // Unitless twin, for the shadow and sheen offsets that have to do maths.
      if (mirror) el.style.setProperty(mirror, v.toFixed(3));
    };
    write(from);
    springValue(value, SPRING).on('change', write);
    return value;
  };

  const rotX = prop('--tilt-x', baseX, 'deg', '--tilt-xn');
  const rotY = prop('--tilt-y', baseY, 'deg', '--tilt-yn');
  const rise = prop('--tilt-lift', 0, 'px');
  const sheen = prop('--tilt-sheen', 0, '');

  el.dataset.tiltLive = '';

  hover(el, () => {
    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const px = (event.clientX - box.left) / box.width - 0.5;
      const py = (event.clientY - box.top) / box.height - 0.5;
      // A quarter of the resting angle is kept, so a tilted device straightens
      // up as you approach it rather than snapping square.
      rotY.set(baseY * 0.25 + px * degrees * 2);
      rotX.set(baseX * 0.25 - py * degrees * 2);
      el.style.setProperty('--tilt-mx', `${((px + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty('--tilt-my', `${((py + 0.5) * 100).toFixed(1)}%`);
    };

    el.addEventListener('pointermove', onMove);
    rise.set(lift);
    sheen.set(1);

    return () => {
      el.removeEventListener('pointermove', onMove);
      rotX.set(baseX);
      rotY.set(baseY);
      rise.set(0);
      sheen.set(0);
    };
  });
}

function setUpTilts() {
  // A tilt that follows a pointer needs a pointer. Touch keeps the original
  // hover-free design, which is also where the frame budget is tightest.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  for (const [selector, degrees, lift] of TILTS) {
    for (const el of document.querySelectorAll<HTMLElement>(selector)) setUpTilt(el, degrees, lift);
  }
}

/**
 * Depth in the hero: as the page scrolls away, the copy and the 3D "Q" separate
 * slightly and the glow behind them opens up. One scroll subscription writes one
 * number and pages.css decides what moves.
 */
function setUpHero() {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;

  scroll((progress) => hero.style.setProperty('--hero-p', progress.toFixed(4)), {
    target: hero,
    offset: ['start start', 'end start'],
  });
}

/** The floating nav draws itself in a little once the page has moved. */
function setUpNav() {
  const shell = document.querySelector<HTMLElement>('.nav-shell');
  if (!shell) return;

  scroll((_progress, info) => {
    const y = info?.y?.current ?? window.scrollY;
    const stuck = y > 24 ? 'on' : 'off';
    if (shell.dataset.stuck !== stuck) shell.dataset.stuck = stuck;
  });
}

/**
 * Buttons take the press. The squeeze itself is one CSS transition — what
 * framer-motion contributes here is the gesture: `press` tracks the pointer
 * past the edge of the button, releases on cancel, and fires for a keyboard
 * activation too, none of which `:active` gets right.
 */
function setUpButtons() {
  press('.btn', (el) => {
    el.setAttribute('data-pressed', 'on');
    return () => el.removeAttribute('data-pressed');
  });
}

export function initMotion() {
  // Tell the inline guard in Base.astro that the chunk arrived, so it stops
  // waiting and leaves the hidden first frames in place.
  root.dataset.motionReady = 'on';

  setUpReveals();
  setUpTilts();
  setUpHero();
  setUpNav();
  setUpButtons();
}
