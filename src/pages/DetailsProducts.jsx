import './Products.css'; // Importando arquivo CSS para componente Products
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetailsProducts = () => {
    const { id } = useParams(); // Pega o id do produto
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // UseEffect para buscar os detalhes do produto
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const result = await fetch(`https://fakestoreapi.com/products/${id}`);
                const productData = await result.json();
                setProduct(productData); // Atualiza o estado com os dados do produto
            } catch (error) {
                console.error('Erro ao buscar detalhes do produto:', error);
            } finally {
                setLoading(false); // Quando os dados terminarem de carregar, setar o estado de loading como false
            }
        };

        fetchProductDetails(); // Chama a função para buscar os detalhes do produto
    }, [id]); // Reexecuta o efeito quando o id muda

    // Função para adicionar o produto ao carrinho
    const handleAddToCart = () => {
        // Você pode acessar o localStorage ou o contexto para adicionar ao carrinho
        const savedCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const carrinhoAtualizado = [...savedCarrinho, product];
        localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
        console.log('Produto adicionado ao carrinho:', product);
    };

    if (loading) {
        return <div>Carregando...</div>; // Mostra "Carregando..." enquanto os dados não são carregados
    }

    if (!product) {
        return <div>Produto não encontrado.</div>; // Caso não encontre o produto
    }

    return (
        <div className='details-container'>
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title}/>
            <p>Preço: ${product.price}</p>
            <p>Descrição: {product.description}</p>
            <p>Avaliação: {product.rating ? product.rating.rate : 'Sem avaliação'}</p>
            <p>Quantidade de Avaliações: {product.rating ? product.rating.count : 0}</p>
            <button className='button-add' onClick={handleAddToCart}>Adicionar ao Carrinho</button>
        </div>
    );
};

export default DetailsProducts;
