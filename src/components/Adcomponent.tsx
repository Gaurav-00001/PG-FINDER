import { useEffect } from "react";

const Adcomponent = () => {
  useEffect(() => {
    // --- Script 1: The Ad Container Logic ---
    const script1 = document.createElement("script");
    script1.src = "https://pl28959986.profitablecpmratenetwork.com/00698c1465caa24a7ef80f27a0a5ac4d/invoke.js";
    script1.async = true;
    script1.setAttribute("data-cfasync", "false");
    document.body.appendChild(script1);

    // --- Script 2 ---
    const script2 = document.createElement("script");
    script2.src = "https://pl28960067.profitablecpmratenetwork.com/54/b7/37/54b7377ff30939559603eaf9151e68e8.js";
    script2.async = true;
    document.body.appendChild(script2);

    // --- Script 3 ---
    const script3 = document.createElement("script");
    script3.src = "https://pl28971777.profitablecpmratenetwork.com/eb/15/27/eb15276ebfcbf220f3c9260239c2a4ce.js";
    script3.async = true;
    document.body.appendChild(script3);

    // --- Cleanup Function (CRITICAL) ---
    return () => {
      if (document.body.contains(script1)) document.body.removeChild(script1);
      if (document.body.contains(script2)) document.body.removeChild(script2);
      if (document.body.contains(script3)) document.body.removeChild(script3); // Added this line
    };
  }, []);

  return (
    <div className="flex flex-col items-center my-10 w-full px-4">
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
        Advertisement
      </span>
      
      <div 
        id="container-00698c1465caa24a7ef80f27a0a5ac4d" 
        className="min-h-[100px] w-full max-w-[728px] bg-muted/20 rounded-lg flex items-center justify-center border border-dashed border-border"
      >
        {/* Ad will be injected here */}
      </div>
    </div>
  );
};

export default Adcomponent;