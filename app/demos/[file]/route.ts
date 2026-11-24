import { readFile } from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth";

const DEMOS_DIR = path.join(process.cwd(), "private", "demos");
const DEMO_FILES = new Set(["galeon.html", "galeon-v2.html"]);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const session = await auth();

  if (!session) {
    return new Response(null, {
      status: 307,
      headers: {
        Location: new URL("/os/login", request.url).toString(),
        "Cache-Control": "private, no-store",
      },
    });
  }

  const { file } = await params;

  if (!DEMO_FILES.has(file)) {
    return new Response("Demo no encontrado.", { status: 404 });
  }

  const html = await readFile(path.join(DEMOS_DIR, file), "utf8");

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
