import './Products.css'; // Importando arquivo CSS para componente Products
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { carrinho } = location.state || { carrinho: [] };

    // Mantém o estado do carrinho no checkout
    const [carrinhoAtualizado, setCarrinhoAtualizado] = useState(carrinho);

    // Função para remover um produto do carrinho
    const handleRemoveFromCart = (productId) => {
        setCarrinhoAtualizado((prevCarrinho) => prevCarrinho.filter(item => item.id !== productId));
    };

    // Função para calcular o total do carrinho
    const calculoTotal = () => {
        return carrinhoAtualizado.reduce((total, item) => total + item.price * item.quantidade, 0).toFixed(2);
    };

    // Atualiza o carrinho no localStorage sempre que o carrinho mudar
    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
    }, [carrinhoAtualizado]);

    // Função para finalizar a compra
    const handleFinalizarCompra = () => {
        alert('Compra finalizada com sucesso!');
        // Aqui você pode redirecionar para outra página, ou resetar o carrinho.
        setCarrinhoAtualizado([]);
        localStorage.removeItem('carrinho');
        navigate('/products');
    };

    return (
        <div>
            <h2 className='h2-checar'>Checagem de Produtos</h2>{carrinhoAtualizado.length === 0 ? (
                <p>Seu carrinho está vazio.</p>) : (
                <>
                    <div> {carrinhoAtualizado.map((product) => (
                        <div key={product.id}>
                            <img className='img-details' src={product.image} alt={product.title} />
                            <div style={{ marginLeft: '10px' }}>
                                <h3>{product.title}</h3>
                                <p>Preço: ${product.price}</p>
                                <p>Quantidade: {product.quantidade}</p>
                                <p>Subtotal: ${(product.price * product.quantidade).toFixed(2)}</p>
                                <button className='button-remove' onClick={() => handleRemoveFromCart(product.id)}>Remover</button> <br /> <br />
                            </div>
                        </div>
                    ))}
                    </div>
                    <h3>Total: ${calculoTotal()}</h3>
                    <button onClick={handleFinalizarCompra}>Finalizar Compra</button>
                </>
            )}
        </div>
    );
};

export default Checkout;
