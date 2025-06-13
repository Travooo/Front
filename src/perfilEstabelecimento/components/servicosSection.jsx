import React, { useState, useEffect } from 'react';

export default function ServicosSection() {
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');
    const organizacaoId = parseInt(localStorage.getItem('organizacaoId'));

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                if (!organizacaoId) {
                    throw new Error('ID da organização não encontrado');
                }

                const url = `http://localhost:3000/rest/v1/servicos/organizacao/${organizacaoId}`;

                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao buscar serviços');
                }

                const data = await response.json();
                setServicos(data);
            } catch (err) {
                console.error('Erro ao carregar serviços:', err);
                setError(err.message || 'Erro ao carregar serviços');
            } finally {
                setLoading(false);
            }
        };

        fetchServicos();
    }, [organizacaoId, token]);

    if (loading) return <div className="text-center py-8">Carregando serviços...</div>;
    if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
    if (servicos.length === 0) return <div className="text-center py-8 text-gray-600">Nenhum serviço cadastrado ainda.</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Nossos Serviços</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicos.map((servico) => (
                    <div key={servico.id} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{servico.nome}</h3>
                        <p className="text-gray-600">{servico.descricao}</p>
                        {servico.preco && (
                            <p className="mt-2 text-lg font-bold text-green-600">
                                R$ {servico.preco.toFixed(2)}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
