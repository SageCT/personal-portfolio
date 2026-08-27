const script = `(function(){try{var t=localStorage.getItem("sage_theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})()`;

/**
 * Applies the stored theme before paint so the page never flashes the wrong one.
 * Kept inline (rather than in a client component) because it has to run first.
 */
export function ThemeScript() {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: static, author-controlled snippet
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
