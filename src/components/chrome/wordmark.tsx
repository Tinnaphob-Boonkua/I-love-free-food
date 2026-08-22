import Link from "next/link";

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="group inline-flex flex-col gap-1">
      <span className="display text-3xl leading-none text-halide md:text-4xl">MomentUS</span>
      <span className="text-[0.7rem] font-light tracking-[0.22em] text-silver uppercase">
        Moment of Us
      </span>
    </Link>
  );
}
