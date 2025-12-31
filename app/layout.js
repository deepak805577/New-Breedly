
import "./globals.css";
import ClientShell from "./ClientShell";

export const metadata = {
  title: "BreedLy – Find the Perfect Dog Breed for Your Lifestyle",
  description:
    "BreedLy helps you discover the best dog breed for your lifestyle with expert guides on health, food, training, and responsible adoption.",
  keywords: [
    "dog breed selector",
    "dog breeds India",
    "dog care guide",
    "best dog for family",
    "puppy health and food"
  ],
  openGraph: {
    title: "BreedLy – Know About Paws",
    description:
      "Discover dog breeds, care guides, and find your perfect canine companion.",
     icons: { icon: "/Dog face.png" }
  }
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ClientShell wraps all client-side interactive components */}
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}