import Link from "next/link";
import Logo from "./logo";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-3xl text-gray-800 shadow text-center py-5">
        <a href="/">Politica de privacidad</a>

      </div>
    </footer>
  );
}
