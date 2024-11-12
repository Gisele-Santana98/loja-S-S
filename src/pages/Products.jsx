import './Products.css'; // Importando arquivo CSS para componente Products
import React, { useState, useEffect } from 'react'; // Importando React e hooks ou funções useState e useEffect
import { useNavigate } from 'react-router-dom'; // Importando hook useNavigate para navegação
import { Link } from 'react-router-dom'; // Importando componente Link para navegação entre páginas

// Define os estados doS componenteS
const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]); // Estado para armazenar lista de produtos
    const [filterProducts, setFilterProducts] = useState([]); // Estado para produtos filtrados
    const [setShowDescription] = useState({}); // Estado para controlar a visibilidade da descrição de cada produto

    // Estado para carrinho de compras, recuperando do localStorage se existir
    const [carrinho, setCarrinho] = useState(() => {
        const savedCarrinho = localStorage.getItem('carrinho'); // Tenta recuperar o carrinho salvo
        return savedCarrinho ? JSON.parse(savedCarrinho) : []; // Retorna o carrinho salvo ou um array vazio
    });

    // Atualiza o localStorage quando o carrinho muda
    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }, [carrinho]);

    const navigate = useNavigate(); // Hook para navegação entre páginas

    // useEffect para buscar produtos quando o componente é montado
    useEffect(() => {
        const fetchProducts = async () => {
            const result = await fetch('https://fakestoreapi.com/products'); // Renderiza produtos da API
            const ListProducts = await result.json(); // Converte a resposta para JSON
            setProducts(ListProducts); // Atualiza o estado com a lista de produtos
            setFilterProducts(ListProducts); // Exibe todos os produtos
            setLoading(false); // Quando os dados terminarem de carregar, setar o estado de loading como false
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Carregando...</div>; // Mostra "Carregando..." enquanto os dados não são carregados
    }

    // Alterando categoria de produtos exibidos
    const handleCategoryChange = (category) => {
        if (category) {
            // Filtra os produtos pela categoria
            setFilterProducts(products.filter(product => product.category === category));
        } else {
            // Se a categoria for vazia, exibe todos os produtos
            setFilterProducts(products);
        }
    };

    // Adiciona um produto ao carrinho
    const handleAddToCart = (product) => {
        setCarrinho(prevCarrinho => {
            const existeProduct = prevCarrinho.find(item => item.id === product.id); // Verifica se o produto já está no carrinho
            if (existeProduct) { // Se o produto já estiver no carrinho, aumenta a quantidade
                return prevCarrinho.map(item =>
                    item.id === product.id ?
                        { ...item, quantidade: item.quantidade + 1 } : item);
            } else { // Caso contrário, adiciona o produto com quantidade 1
                return [...prevCarrinho, { ...product, quantidade: 1 }];
            }
        });
    };

    // Remove um produto do carrinho
    const handleRemoveFromCart = (productId) => {
        setCarrinho(prevCarrinho => {
            const existeProduct = prevCarrinho.find(item => item.id === productId); // Verifica se o produto existe no carrinho
            if (existeProduct.quantidade > 1) { // Se a quantidade for maior que 1, diminui a quantidade
                return prevCarrinho.map(item =>
                    item.id === productId ?
                        { ...item, quantidade: item.quantidade - 1 } : item);
            } else { // Caso contrário, remove o produto do carrinho
                return prevCarrinho.filter(item => item.id !== productId);
            }
        });
    };

    // Navega para a página de checkout
    const handleCheckout = () => {
        navigate('/checkout', { state: { carrinho } });
    };

    // Calcula o total do carrinho
    const calculoTotal = () => {
        return carrinho.reduce((total, item) => total +
            item.price * item.quantidade, 0).toFixed(2);
    }; // Calcula o total com duas casas decimais

    // Renderiza o componente
    return (
        <div className='corpo' >
            <>
                {/* Botões para filtrar produtos por categoria */}
                <h1>Loja S&S</h1>
                <h2>Produtos</h2>
                <button className='button-filter' onClick={() => handleCategoryChange('men\'s clothing')}>Artigos Masculinas</button>
                <button className='button-filter' onClick={() => handleCategoryChange('women\'s clothing')}>Artigos Femininas</button>
                <button className='button-filter' onClick={() => handleCategoryChange('jewelery')}>Joias</button>
                <button className='button-filter' onClick={() => handleCategoryChange('electronics')}>Eletrônicos</button>
                <button className='button-filter' onClick={() => handleCategoryChange('')}>Todos</button>

                {/* Verifica se há produtos filtrados */}
                <div className="product-container" >{filterProducts.length === 0 ? (<div>Nenhum produto disponível.</div>) : (filterProducts.map((product) => {
                    const itemCarrinho = carrinho.find(item => item.id === product.id);
                    return (
                        <div className='key' key={product.id}>
                            <h4>{product.title}</h4> <br />
                            <Link to={`/product/${product.id}`}>
                                <img className='img-details' src={product.image} alt={product.title} /></Link>
                            <p>Preço: ${product.price}</p>
                            <button className='button-add' onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>{itemCarrinho && (
                                <div>
                                    <p>Quantidade: {itemCarrinho.quantidade}</p>
                                    <button className='button-remove' onClick={() => handleRemoveFromCart(product.id)}>Remover 1</button>
                                </div>
                            )}
                        </div>
                    );
                })
                )}
                </div>
                <div style={{ marginTop: '20px' }}>
                    <h3>Total do Carrinho: ${calculoTotal()}</h3>
                    <button className='button-checar' onClick={handleCheckout} style={{ marginTop: '20px' }}>Checar produtos</button>
                </div>
            </>
        </div>
    );
};

export default Products;