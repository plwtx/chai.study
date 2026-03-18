import Navbar from "@/features/navbar";
import AnimatedRoutes from "@/features/router/AnimatedRoutes";

export default function RootLayout() {
  return (
    <div className="bg-brown-100 relative h-screen w-full">
      <Navbar />
      <AnimatedRoutes />
    </div>
  );
}
