import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import perlaPole from "@/assets/perla-pole.jpg";
import cityBackground from "@/assets/city-background.jpg";
import nightBackground from "@/assets/night-background.jpg";

type PaddleColor = "Black" | "Gray";
type LightPosition = "Left" | "Right" | "Both";
type Background = "City" | "Night" | "Transparent";

const Customize = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();
  
  const [selectedPaddleColor, setSelectedPaddleColor] = useState<PaddleColor>("Black");
  const [selectedLightPosition, setSelectedLightPosition] = useState<LightPosition>("Both");
  const [selectedBackground, setSelectedBackground] = useState<Background>("Transparent");

  const getBackgroundStyle = () => {
    switch (selectedBackground) {
      case "City":
        return {
          backgroundImage: `url(${cityBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      case "Night":
        return {
          backgroundImage: `url(${nightBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      case "Transparent":
        return {
          background: "linear-gradient(135deg, hsl(217, 91%, 60%), hsl(220, 91%, 70%))",
        };
      default:
        return {};
    }
  };

  const generatePDF = () => {
    const customerChoices = {
      model: `Perla ${modelId}`,
      paddleColor: selectedPaddleColor,
      lightPosition: selectedLightPosition,
      background: selectedBackground,
    };
    
    // For now, we'll show an alert with the choices
    // In a real implementation, this would generate and download a PDF
    alert(`PDF Generation:\n\nModel: ${customerChoices.model}\nPaddle Color: ${customerChoices.paddleColor}\nLight Position: ${customerChoices.lightPosition}\nBackground: ${customerChoices.background}\n\nIn a real implementation, this would generate and download a PDF with your customized product.`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="p-6 border-b border-border">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Models
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            Customize Perla {modelId}
          </h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Model Preview */}
          <div className="space-y-4">
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Model Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="aspect-video rounded-lg overflow-hidden relative flex items-center justify-center"
                  style={getBackgroundStyle()}
                >
                  <div className="relative">
                    <img
                      src={perlaPole}
                      alt={`Perla ${modelId}`}
                      className="w-48 h-80 object-contain"
                      style={{
                        filter: selectedPaddleColor === "Gray" 
                          ? "brightness(1.2) contrast(0.8)" 
                          : "brightness(0.6) contrast(1.2)",
                      }}
                    />
                    
                    {/* Light effects for pole */}
                    {(selectedLightPosition === "Left" || selectedLightPosition === "Both") && (
                      <div className="absolute left-8 top-16 w-20 h-20 bg-yellow-300 rounded-full opacity-50 blur-2xl animate-pulse" />
                    )}
                    {(selectedLightPosition === "Right" || selectedLightPosition === "Both") && (
                      <div className="absolute right-8 top-16 w-20 h-20 bg-yellow-300 rounded-full opacity-50 blur-2xl animate-pulse" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customization Controls */}
          <div className="space-y-6">
            {/* Paddle Color */}
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Pole Color</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(["Black", "Gray"] as PaddleColor[]).map((color) => (
                  <Button
                    key={color}
                    variant={selectedPaddleColor === color ? "default" : "outline"}
                    onClick={() => setSelectedPaddleColor(color)}
                    className="w-full justify-start"
                  >
                    <div
                      className={`w-6 h-6 rounded mr-3 border-2 border-border ${
                        color === "Black" ? "bg-gray-900" : "bg-gray-400"
                      }`}
                    />
                    {color} Pole
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Light Position */}
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Light Position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(["Left", "Right", "Both"] as LightPosition[]).map((position) => (
                  <Button
                    key={position}
                    variant={selectedLightPosition === position ? "default" : "outline"}
                    onClick={() => setSelectedLightPosition(position)}
                    className="w-full"
                  >
                    {position}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Background */}
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Background</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(["City", "Night", "Transparent"] as Background[]).map((bg) => (
                  <Button
                    key={bg}
                    variant={selectedBackground === bg ? "default" : "outline"}
                    onClick={() => setSelectedBackground(bg)}
                    className="w-full"
                  >
                    {bg}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Show Product Button */}
            <Card className="bg-card border border-border">
              <CardContent className="pt-6">
                <Button
                  variant="hero"
                  onClick={generatePDF}
                  className="w-full"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Show Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;