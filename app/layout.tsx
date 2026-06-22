import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "var(--bg)", color: "var(--ink)" }}>
  {children}
</body>
    </html>
  );
}