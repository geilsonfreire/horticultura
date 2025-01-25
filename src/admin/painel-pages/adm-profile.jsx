
const AdmProfile = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-green-600 h-32"></div>
                    <div className="px-6 pb-6">
                        <div className="flex flex-col items-center -mt-16">
                            <img
                                src={mockUser.avatar_url}
                                alt={mockUser.full_name}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                            <h2 className="mt-4 text-2xl font-bold text-gray-900">
                                {mockUser.full_name}
                            </h2>
                        </div>

                        <div className="mt-8 space-y-6">
                            <div className="flex items-center text-gray-700">
                                <span>{mockUser.email}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <span>{mockUser.address}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <span>{mockUser.phone}</span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                                Editar Perfil
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Histórico de Pedidos</h3>
                    <div className="text-gray-600 text-center py-8">
                        Nenhum pedido realizado ainda.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdmProfile