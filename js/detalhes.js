// Recuperar o id do detalhe do localStorage
var id = parseInt(localStorage.getItem('detalhe'));

// Pegar os produtos do localStorage
var produtos = JSON.parse(localStorage.getItem('produtos'));

var item = produtos.find(produtos => produtos.id === id);

if (item) {
    // Produto encontrado
    console.log('Produto encontrado:', item);

    // Atualizar elementos na página com os detalhes do produto
    $("#imagem-detalhe").attr('src', item.imagem);
    $("#nome-detalhe").html(item.nome);
    $("#rating-detalhe").html(item.rating);
    $("#like-detalhe").html(item.likes);
    $("#reviews-detalhe").html(item.reviews + ' reviews');
    $("#descricao-detalhe").html(item.descricao);

    // Atualizar o preço no elemento da toolbar
    $("#preco-produto").html(`R$${item.preco_promocional.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);

    // Atualizar a tabela de detalhes
    var tabelaDetalhes = $("#tabdetalhes");

    item.detalhes.forEach(detalhe => {
        var linha = `
         <tr>
           <td>${detalhe.caracteristica}</td>
           <td>${detalhe.detalhes}</td>
         </tr>
      `;
        tabelaDetalhes.append(linha);
    });
} else {
    // Produto não encontrado
    console.log('Produto não encontrado.');
}

// Recuperar o carrinho do localStorage ou inicializar vazio
var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para adicionar ao carrinho
function adicionarAocarrinho(item, quantidade) {
    var itemNoCarrinho = carrinho.find(c => c.item.id === item.id);

    if (itemNoCarrinho) {
        // Produto já está no carrinho, aumentar a quantidade
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional;
    } else {
        // Adicionar novo produto ao carrinho
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade * item.preco_promocional,
        });
    }

    // Atualizar o localStorage do carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Evento para adicionar ao carrinho
$(".botao-add").on('click', function () {
    // Adicionar ao carrinho
    adicionarAocarrinho(item, 1);

    // Mostrar uma notificação de sucesso
    var toastCenter = app.toast.create({
        text: `${item.nome} adicionado ao carrinho`,
        position: 'center',
        closeTimeout: 2000,
    });

    toastCenter.open();
});
