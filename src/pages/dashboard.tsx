import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Button disabled>
          <Loader2 className="animate-spin h-[12rem] w-[12rem" />
        </Button>
      </div>
    );
  }

  const handleLogout = async () => {
    navigate("/login");

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-between  p-6">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <Button
        className=""
        onClick={() => {
          handleLogout();
          setLoading(true);
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
