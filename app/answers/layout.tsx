export default function AnswersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f3f5f9]">
      {children}
    </div>
  );
} 