import { toast } from "./components/ui/toast";
import { Button } from "./components/ui/button";

function App() {
  function handleClick() {
    toast({
      title: "Error Occurred",
      description: "This is a toast notification from Sonner.",
      // variant: "success",
    });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Button variant={"outline"} onClick={handleClick}>
        Click me
      </Button>
    </div>
  );
}

export default App;
