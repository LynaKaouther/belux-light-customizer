import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import perlaBase from "@/assets/perla-base.jpg";

const Home = () => {
  const navigate = useNavigate();

  const perlaModels = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Perla ${i + 1}`,
    image: perlaBase,
  }));

  const handleModelSelect = (modelId: number) => {
    navigate(`/customize/${modelId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="py-12 text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4 tracking-wide">
          BELUX
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Premium Lighting Solutions - Customize Your Perfect Light
        </p>
      </header>

      {/* Models Grid */}
      <main className="container mx-auto px-4 pb-12">
        <h2 className="text-3xl font-semibold text-center mb-12 text-foreground">
          Choose Your Model
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {perlaModels.map((model) => (
            <Card
              key={model.id}
              className="bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:scale-105 cursor-pointer group"
              onClick={() => handleModelSelect(model.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-3">
                  {model.name}
                </h3>
                <Button variant="glow" className="w-full">
                  Customize
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;