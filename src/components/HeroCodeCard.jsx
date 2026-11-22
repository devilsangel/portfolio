import { useState, useEffect, useMemo } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const SNIPPETS = [
  {
    file: "profile.component.ts",
    code: `@Component({
  selector: 'app-profile',
  template: \`<h1>{{ name() }}</h1>\`,
})
export class ProfileComponent {
  name = signal('Kevin');
  role = computed(() => 'Frontend Engineer');
}`,
  },
  {
    file: "projects.selectors.ts",
    code: `// memoized, typed, composable
export const selectShipped = createSelector(
  selectProjects,
  (projects) => projects.filter(
    (p) => p.status === 'shipped'
  )
);`,
  },
  {
    file: "search.service.ts",
    code: `results$ = this.query$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((q) => this.api.search(q)),
  shareReplay(1)
);`,
  },
];

const COLORS = {
  keyword: "#BF4A2F",
  string: "#3DB87A",
  comment: "#A89B8F",
  decorator: "#8A5A9E",
  fn: "#2C5F8A",
  plain: "#2C2621",
};

const TOKEN_RE =
  /(\/\/.*)|('[^']*'|`[^`]*`)|(@\w+)|\b(export|class|const|return|this|new|import|from)\b|(\w+)(?=\()/g;

function tokenize(code) {
  const out = [];
  let last = 0;
  for (const m of code.matchAll(TOKEN_RE)) {
    if (m.index > last) out.push({ text: code.slice(last, m.index), kind: "plain" });
    const kind = m[1] ? "comment" : m[2] ? "string" : m[3] ? "decorator" : m[4] ? "keyword" : "fn";
    out.push({ text: m[0], kind });
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push({ text: code.slice(last), kind: "plain" });
  return out;
}

// Render the first `count` characters of a token list
function renderTokens(tokens, count) {
  const nodes = [];
  let remaining = count;
  for (let i = 0; i < tokens.length && remaining > 0; i++) {
    const { text, kind } = tokens[i];
    const slice = text.slice(0, remaining);
    remaining -= slice.length;
    nodes.push(
      <span key={i} style={{ color: COLORS[kind], fontStyle: kind === "comment" ? "italic" : undefined }}>
        {slice}
      </span>
    );
  }
  return nodes;
}

const TYPE_MS = 35,
  HOLD_MS = 2600,
  FADE_MS = 400;

export default function HeroCodeCard({ start = true }) {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [fading, setFading] = useState(false);

  const snippet = SNIPPETS[index];
  const tokens = useMemo(() => tokenize(snippet.code), [snippet]);
  const total = snippet.code.length;

  useEffect(() => {
    if (reducedMotion || !start) return;
    let id;
    if (chars < total) {
      id = setTimeout(() => setChars((c) => c + 1), TYPE_MS);
    } else if (!fading) {
      id = setTimeout(() => setFading(true), HOLD_MS);
    } else {
      id = setTimeout(() => {
        setIndex((i) => (i + 1) % SNIPPETS.length);
        setChars(0);
        setFading(false);
      }, FADE_MS);
    }
    return () => clearTimeout(id);
  }, [chars, total, fading, reducedMotion, start]);

  const shown = reducedMotion ? total : chars;

  return (
    <div
      className="w-full rounded-lg border overflow-hidden"
      style={{
        borderColor: "#E4DDD5",
        background: "rgba(250,247,242,0.85)",
        backdropFilter: "blur(12px)",
      }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "#E4DDD5" }}>
        {["#E4DDD5", "#D6CFC6", "#C9C0B5"].map((c) => (
          <span key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
        ))}
        <span className="ml-2 font-mono" style={{ color: "#A89B8F", fontSize: "10px" }}>
          {snippet.file}
        </span>
      </div>
      <pre
        className="font-mono px-4 py-4 whitespace-pre overflow-hidden"
        style={{
          fontSize: "11.5px",
          lineHeight: "1.65",
          height: "calc(8 * 11.5px * 1.65 + 2rem)",
          opacity: fading ? 0 : 1,
          transition: `opacity ${FADE_MS}ms ease`,
        }}
      >
        {renderTokens(tokens, shown)}
        <span
          className="caret-blink inline-block align-middle"
          style={{ width: "6px", height: "13px", background: "#BF4A2F", marginLeft: "1px" }}
        />
      </pre>
    </div>
  );
}
