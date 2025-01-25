import { X, Leaf, Droplets, Sun, ThermometerSun } from 'lucide-react';

export default function ProductModal({ isOpen, onClose, product }) {
  if (!isOpen) return null;

  // Dados de curiosidades mockados - em produção, isso viria do backend
  const curiosidades = {
    Suculentas: {
      cuidados: ['Pouca água', 'Luz solar direta', 'Solo bem drenado'],
      curiosidade: 'Suculentas podem sobreviver por longos períodos sem água devido à sua capacidade de armazenar água em suas folhas carnudas.',
      dicas: 'Regue apenas quando o solo estiver completamente seco.',
      icons: [Sun, Droplets, Leaf]
    },
    Cactos: {
      cuidados: ['Água moderada', 'Luz solar intensa', 'Solo arenoso'],
      curiosidade: 'Alguns cactos podem viver por mais de 200 anos em seu habitat natural.',
      dicas: 'Evite regar durante o inverno.',
      icons: [Sun, Droplets, ThermometerSun]
    },
    Terras: {
      cuidados: ['Armazenar em local seco', 'Manter embalagem fechada', 'Usar conforme necessário'],
      curiosidade: 'Diferentes tipos de plantas precisam de diferentes composições de solo para prosperar.',
      dicas: 'Sempre verifique a drenagem antes do uso.',
      icons: [Leaf, Droplets, Sun]
    },
    Adubos: {
      cuidados: ['Armazenar em local fresco', 'Manter longe de crianças', 'Seguir dosagem recomendada'],
      curiosidade: 'Adubos orgânicos melhoram a estrutura do solo e promovem a vida microbiana.',
      dicas: 'Aplique preferencialmente em dias nublados.',
      icons: [Leaf, Droplets, Sun]
    }
  };

  const produtoInfo = curiosidades[product.category] || {
    cuidados: [],
    curiosidade: 'Informações em breve.',
    dicas: 'Consulte o vendedor para mais detalhes.',
    icons: [Leaf]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-bold text-green-600 mt-2">
              R$ {product.price.toFixed(2)}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cuidados Principais</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {produtoInfo.cuidados.map((cuidado, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    {produtoInfo.icons[index] && React.createElement(produtoInfo.icons[index], {
                      className: "w-5 h-5 text-green-600"
                    })}
                    <span>{cuidado}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Você Sabia?</h3>
              <p className="bg-green-50 p-4 rounded-lg text-gray-700">
                {produtoInfo.curiosidade}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Dicas de Cultivo</h3>
              <p className="bg-yellow-50 p-4 rounded-lg text-gray-700">
                {produtoInfo.dicas}
              </p>
            </div>

            <div className="border-t pt-6">
              <button
                onClick={onClose}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}