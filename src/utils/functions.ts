export const $ = (el: string) => document.querySelector(el);
export const $$ = (el: string) => document.querySelectorAll(el);

export function baseUrl(path: string) {
  return new URL(path.replace(/^\/+/, ''), import.meta.env.SITE).toString();
}

export function generateData({ start, end }: { start: number; end: number }) {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const n = i + start;
    let href = `https://github.com/20essentials/project-${n}`;
    let urlImage = baseUrl(`assets/${start}-${end}/project-${n}.avif`);

    if (n <= 999) {
      href = `https://github.com/20essentials/project-000-${n
        .toString()
        .padStart(3, '0')}`;
      urlImage = baseUrl(`/assets/${start}-${end}/n${n}.avif`);
    }

    return {
      href,
      style: `--bg-img: url(${urlImage})`,
      item: n
    };
  });
}

export function generateStaticPaths({
  initStart = 1,
  endProject = 400,
  blockSize = 100
}) {
  const paths = [];

  for (let start = initStart; start <= endProject; start += blockSize) {
    const end = Math.min(start + blockSize - 1, endProject);
    paths.push({ params: { start, end } });
  }

  return paths;
}
