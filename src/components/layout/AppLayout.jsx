import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "24px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {children}
      </main>
    </div>
  );
}
