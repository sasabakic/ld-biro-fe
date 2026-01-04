// Root layout - passes through to [locale]/layout.tsx
// All routes go through the [locale] segment via middleware

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
