import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Carrinho = () => {
    const navigate = useNavigate();
    const [carrinho, setCarrinho] = useState(() => {
        const savedCarrinho = localStorage.getItem('carrinho');
        return savedCarrinho ? JSON.parse(savedCarrinho) : [];
    });

    // Atualiza o localStorage sempre que o carrinho mudar
    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }, [carrinho]);

    // Função para remover um produto do carrinho
    const handleRemoveFromCart = (productId) => {
        setCarrinho(prevCarrinho => prevCarrinho.filter(item => item.id !== productId));
    };

    // Função para calcular o total do carrinho
    const calculoTotal = () => {
        return carrinho.reduce((total, item) => total + item.price * item.quantidade, 0).toFixed(2);
    };

    const handleCheckout = () => {
        navigate('/checkout', { state: { carrinho, total: calculoTotal() } });
    };

    return (
        <div>
            <h1>Carrinho de Compras</h1>
            {carrinho.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <>
                    <div>
                        {carrinho.map((product) => (
                            <div key={product.id} style={{ display: 'flex', marginBottom: '15px' }}>
                                <img src={product.image} alt={product.title} width="100px" />
                                <div style={{ marginLeft: '10px' }}>
                                    <h3>{product.title}</h3>
                                    <p>Preço: ${product.price}</p>
                                    <p>Quantidade: {product.quantidade}</p>
                                    <button onClick={() => handleRemoveFromCart(product.id)}>Remover</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3>Total: ${calculoTotal()}</h3>
                    <button onClick={handleCheckout}>Finalizar Compra</button>
                </>
            )}
        </div>
    );
};

export default Carrinho;
